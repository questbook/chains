import { copyFile } from "fs/promises"
import { join } from "path"
import { CIRepo } from "../types"
import generateChainYaml from "../utils/generate-chain-yaml"
import generateGrantsContractChains from "../utils/generate-grants-contract-chains"

const grantsContractsUpgradeable: CIRepo = {
	repoName: 'grants-contracts-upgradeable',
	doCI: async(repoPath, chains, exec) => {
		await generateGrantsContractChains(repoPath, chains)

		let installedDeps = false

		// go through all chains and find to be deployed chains
		// pre-requisite for this is the anon-auth CI
		// contract for the chain can only be deployed if the anon-auth contract is deployed
		for(const chainName in chains) {
			const chain = chains[chainName]
			if(chain.qbContracts === 'TBD') {
				console.log(`deploying grants contracts to "${chainName}"`)
				if(!installedDeps) {
					await installDeps()
					installedDeps = true
				}

				await exec('yarn deploy', { NETWORK: chainName })
				await exec('yarn postdeploy', { NETWORK: chainName })

				console.log(`deployed grants contract = "${chainName}"`)

				const configFilePath = join(repoPath, 'config.json')
				const qbContracts = await generateChainYaml(configFilePath, chainName)
				chain.qbContracts = qbContracts

				console.log(`updated deployed contract addresses for "${chainName}"`)
			}
		}

		async function installDeps() {
			await exec('yarn') // install node deps
			await exec('yarn compile', { NETWORK: 'hardhat' })
			await exec('yarn typechain', { NETWORK: 'hardhat' })

			const anonAuthContractMapPath = join(repoPath, '../anon-authoriser/src/contract-address-map.json')
			const nodeModuleAnonAuthPath = join(repoPath, 'node_modules/@questbook/anon-authoriser/lib/contract-address-map.json')

			await copyFile(anonAuthContractMapPath, nodeModuleAnonAuthPath)
		}
	}
}

export default grantsContractsUpgradeable