import { CIRepo } from "../types";

const grantsFrontend: CIRepo = {
	repoName: 'grants-frontend',
	doCI: async(repoPath, chains, exec) => {
		// TODO: update the frontend to use the chain IDs from this repo
	}
}

export default grantsFrontend