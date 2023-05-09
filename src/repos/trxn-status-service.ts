import { writeFile } from "fs/promises";
import { join } from "path";
import { CIRepo } from "../types";
const CHAINS_DATA_FILE = './src/generated/chainInfo.json'

const trxnStatusService: CIRepo = {
	repoName: 'trxn-status-service',
	doCI: async(repoPath, chains) => {
		// generate the chains.json file
		const data = Object.values(chains).reduce(
			(dict, chain) => {
                const { qbContracts } = chain
				if(typeof qbContracts !== 'object') {
					throw new Error('QB contracts must be deployed before pushing to frontend')
				}
				dict[chain.chainId] = {
					id: chain.chainId,
					name: chain.userFacingName,
					isTestNetwork: chain.isTestNetwork,
					subgraphClientUrl: getSubgraphUrl(chain.chainName),
                    qbContracts: Object.keys(qbContracts).reduce(
						(dict, contract) => {
							dict[contract] = qbContracts[contract as keyof typeof qbContracts].address
							return dict
						}, { } as { [_: string]: string }
					),
				}
				return dict
			}, { } as { [_: string]: any }
		)

		await writeFile(join(repoPath, CHAINS_DATA_FILE), JSON.stringify(data, null, '\t'))
	}
}

const getSubgraphUrl = (chainName: string) => `https://the-graph.questbook.app/subgraphs/name/qb-subgraph-${chainName}`

export default trxnStatusService