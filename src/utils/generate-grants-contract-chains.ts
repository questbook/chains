import { writeFile } from "fs/promises"
import { join } from "path"
import { ChainData } from "../types"

const generateGrantsContractChains = async(
	repoPath: string,
	chains: { [_: string]: Pick<ChainData, 'chainName' | 'chainId' | 'rpcUrls'> }
) => {
	// sort the chains so they're always committed in the same order
	const chainsList = Object.values(chains)
	chainsList.sort((a, b) => a.chainName.localeCompare(b.chainName))
	
	// construct the chains JSON that contains only the ID & RPC url
	// this is used on the grants-contracts repo to deploy contracts
	const chainsMap: { [_: string]: { id: number, rpcUrl: string } } = { }
	for(const chain of chainsList) {
		chainsMap[chain.chainName] = {
			id: chain.chainId,
			rpcUrl: chain.rpcUrls[0]
		}
	}

	const chainsJson = JSON.stringify(chainsMap, null, 2)

	await writeFile(join(repoPath, './chains.json'), chainsJson)
}

export default generateGrantsContractChains