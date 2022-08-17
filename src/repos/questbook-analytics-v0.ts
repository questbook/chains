import { writeFile } from "fs/promises";
import { join } from "path";
import { CIRepo } from "../types";

const CHAINS_DATA_FILE = './src/psuedo-generated/chainInfo.json'

const questbookAnalyticsV0: CIRepo = {
	repoName: 'questbook-analytics-v0',
	doCI: async(repoPath, chains) => {
		// generate the chains.json file
		const data = Object.values(chains).reduce(
			(dict, chain) => {
				dict[chain.chainId] = {
					id: chain.chainId,
					name: chain.userFacingName,
					isTestNetwork: chain.isTestNetwork,
                    wallets: chain.supportedWallets,
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
                    nativeCurrency: chain.nativeCurrency ?? {
						name: 'Unsupported Currency',
						symbol: 'UNSUP',
						decimals: 18,
					}
				}
				return dict
			}, { } as { [_: string]: any }
		)

		await writeFile(join(repoPath, CHAINS_DATA_FILE), JSON.stringify(data, null, '\t'))
	}
}

const getSubgraphUrl = (chainName: string) => `https://the-graph.questbook.app/subgraphs/name/qb-subgraph-${chainName}`

export default questbookAnalyticsV0