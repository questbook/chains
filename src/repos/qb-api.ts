import { mkdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import { ChainData, CIRepo } from "../types";
import { copyDirectoryContents } from "../utils/copy-directory-contents";
import { chainAssetsDirectory } from '../config.json'

const SUPPORTED_CHAIN_ID_ENUM_FILE = './src/generated/SupportedChainId.ts'
const CHAINS_DATA_FILE = './src/generated/chainInfo.json'

const qbAPI: CIRepo = {
	repoName: 'qb-api',
	doCI: async(repoPath, chains) => {
		// update the SupportedChainId enum
		const chainList = Object.values(chains)
			.map(chain => `	${cleanChainName(chain.chainName)} = ${chain.chainId},`)
			.join('\n')
		const template = `\nenum SupportedChainId {\n${chainList}\n}\n\nexport default SupportedChainId`
		await writeFile(join(repoPath, SUPPORTED_CHAIN_ID_ENUM_FILE), template)
		
		// generate the chains.json file
		const data = Object.values(chains).reduce(
			(dict, chain) => {
				dict[chain.chainId] = {
					id: chain.chainId,
					name: chain.userFacingName,
					isTestNetwork: chain.isTestNetwork,
					explorer: chain.explorer,
					supportedCurrencies: chain.supportedCurrencies.reduce(
						(dict, currency) => {
							dict[currency.address] = {
                                label: currency.label,
                                decimal: currency.decimals,
                                address: currency.address,
                            }
							return dict
						}, { } as { [_: string]: any }
					),
					subgraphClientUrl: getSubgraphUrl(chain.chainName),
                    rpcUrls: chain.rpcUrls.map(
						// replace any templates with empty strings
						url => url.replace(/{{[a-z_-]+}}/gi, '')
					),
				}
				return dict
			}, { } as { [_: string]: any }
		)

		await writeFile(join(repoPath, CHAINS_DATA_FILE), JSON.stringify(data, null, '\t'))
	}
}

const getSubgraphUrl = (chainName: string) => `https://the-graph.questbook.app/subgraphs/name/qb-subgraph-${chainName}` 

const cleanChainName = (chainName: string) => chainName.replace(/-/g, '_').toUpperCase()

export default qbAPI