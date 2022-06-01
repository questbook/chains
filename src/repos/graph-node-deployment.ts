import { join } from "path";
import { CIRepo } from "../types";
import { readYaml, writeYaml } from "../utils/yaml";

const graphNodeDeployment: CIRepo = {
	repoName: 'graph-node-deployment',
	doCI: async(repoPath, chains) => {
		const dockerComposeTemplatePath = join(repoPath, 'docker-compose.template.yaml')
		const yaml = await readYaml<any>(dockerComposeTemplatePath)

		const chainsList = Object.values(chains)
		chainsList.sort((a, b) => a.chainName.localeCompare(b.chainName))
		const chainsStr: string[] = []
		for(const chain of chainsList) {
			for(const rpc of chain.rpcUrls) {
				chainsStr.push(`${chain.chainName}:${rpc}`)
			}
		}

		yaml.services['graph-node'].environment.ethereum = chainsStr.join('\n')
		
		await writeYaml(dockerComposeTemplatePath, yaml)
	}
}

export default graphNodeDeployment