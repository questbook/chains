import { join } from "path";
import { CIRepo } from "../types";
import {readYaml, writeYaml} from "../utils/yaml";

const serviceValidator: CIRepo = {
	repoName: 'service-validator',
	doCI: async(repoPath, chains, exec) => {
		// load the OpenAPI spec
		// and update the chain IDs in the "SupportedNetwork" enum
		const openApiPath = join(repoPath, 'openapi.yaml')
		const openApiDoc = await readYaml<any>(openApiPath)
		const chainsEnum: string[] = openApiDoc.components.schemas.SupportedNetwork.enum
		chainsEnum.splice(0, chainsEnum.length) // clear array
		for(const chain in chains) {
			chainsEnum.push(chains[chain].chainId.toString())
		}
		// save the OpenAPI spec & re-generate the types
		await writeYaml(openApiPath, openApiDoc)
		await exec('yarn')
		await exec('yarn generate:types')
	}
}

export default serviceValidator