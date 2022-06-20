import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { join } from "path";
import { CIRepo } from "../types";

const CONFIGS_FOLDER = './config'

const subgraph: CIRepo = {
	repoName: 'subgraph',
	doCI: async(repoPath, chains, exec) => {
		const graphQlPath = join(repoPath, 'schema.graphql')
		let graphQl = await readFile(graphQlPath, 'utf8')
		
		const chainsList = Object.values(chains)
		const supportedNetworkEnum = 
			'enum SupportedNetwork {\n' +
			chainsList
			.sort((a, b) => a.chainName.localeCompare(b.chainName))
			.map((chain, i) => 
				`  chain_${chain.chainId.toString()}, # ${chain.chainName}${i === chainsList.length-1 ? '' : '\n'}`
			)
			.join('') +
			'\n}'
		let didReplace = false
		graphQl = graphQl.replace(
			/enum SupportedNetwork {[^\}]+}/im,
			() => {
				didReplace = true
				return supportedNetworkEnum
			}
		)

		if(!didReplace) {
			throw new Error('Failed to find "SupportedNetwork" enum in schema.graphql')
		}

		const configsFolderPath = join(repoPath, CONFIGS_FOLDER)
		await rm(configsFolderPath, { recursive: true, force: true })
		await mkdir(configsFolderPath)
		// save newly updated contract data
		await Promise.all(
			chainsList.map(async(chain) => {
				const data = {
					network: chain.chainName,
					...chain.qbContracts
				}
				const path = join(configsFolderPath, `${chain.chainName}.json`)
				await writeFile(path, JSON.stringify(data, undefined, 2))
			})
		)
		
		await writeFile(graphQlPath, graphQl)
		await exec('yarn')
		// generate the chain validation code from the service validator
		await exec('yarn graph-json-validator --file ../service-validator/openapi.yaml --schemaPath components.schemas --outDirectory src/json-schema')
	}
}

export default subgraph