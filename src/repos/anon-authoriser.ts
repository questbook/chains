import { CIRepo } from "../types"
import generateGrantsContractChains from "../utils/generate-grants-contract-chains"

const anonAuthoriser: CIRepo = {
	repoName: 'anon-authoriser',
	doCI: async(repoPath, chains, exec) => {
		await generateGrantsContractChains(repoPath, chains)
		await exec('yarn') // install deps
		await exec('yarn deploy:all') // deploy missing chains
	}
}

export default anonAuthoriser