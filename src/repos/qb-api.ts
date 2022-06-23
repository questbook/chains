import { writeFile } from "fs/promises";
import { join } from "path";
import { CIRepo } from "../types";
const CHAINS_DATA_FILE = './src/generated/chainInfo.json'

const qbAPI: CIRepo = {
	repoName: 'qb-api',
	doCI: async(repoPath, chains) => {
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

export default qbAPI