import { mkdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import { CIRepo } from "../types";
import { copyDirectoryContents } from "../utils/copy-directory-contents";
import { chainAssetsDirectory } from '../config.json'

const SUPPORTED_CHAIN_ID_ENUM_FILE = './src/generated/SupportedChainId.ts'
const CHAINS_DATA_FILE = './src/generated/chainInfo.json'
const ASSETS_FOLDER = './public/chain_assets'
const ASSETS_FOLDER_REL = '/chain_assets'

const grantsFrontend: CIRepo = {
	repoName: 'grants-frontend',
	doCI: async(repoPath, chains) => {
		// update the SupportedChainId enum
		const chainList = Object.values(chains)
			.map(chain => `	${cleanChainName(chain.chainName)} = ${chain.chainId},`)
			.join('\n')
		const template = `\nenum SupportedChainId {\n${chainList}\n}\n\nexport default SupportedChainId`
		await writeFile(join(repoPath, SUPPORTED_CHAIN_ID_ENUM_FILE), template)

		// copy in all chain assets
		const fullAssetsPath = join(repoPath, ASSETS_FOLDER)
		await rm(fullAssetsPath, { recursive: true, force: true })
		await mkdir(fullAssetsPath)
		await copyDirectoryContents(chainAssetsDirectory, fullAssetsPath)
		
		// generate the chains.json file
		const data = Object.values(chains).reduce(
			(dict, chain) => {
				dict[chain.chainId] = {
					id: chain.chainId,
					name: chain.userFacingName,
					isTestNetwork: chain.isTestNetwork,
					icon: join(ASSETS_FOLDER_REL, chain.icon),
					wallets: chain.supportedWallets,
					explorer: chain.explorer,
					supportedCurrencies: chain.supportedCurrencies.reduce(
						(dict, currency) => {
							dict[currency.address] = {
								...currency,
								icon: join(ASSETS_FOLDER_REL, currency.icon)
							}
							return dict
						}, { } as { [_: string]: any }
					),
					qbContracts: Object.keys(chain.qbContracts).reduce(
						(dict, contract) => {
							dict[contract] = chain.qbContracts[contract as keyof typeof chain.qbContracts].address
							return dict
						}, { } as { [_: string]: string }
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

export default grantsFrontend