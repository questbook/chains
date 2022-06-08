import { CIRepo } from "../types"
import generateGrantsContractChains from "../utils/generate-grants-contract-chains"

const grantsContractsUpgradeable: CIRepo = {
	repoName: 'grants-contracts-upgradeable',
	doCI: generateGrantsContractChains
}

export default grantsContractsUpgradeable