export type ChainData = {
	chainName: string
	chainId: string
	rpcUrls: string[]
	qbContracts: any
}

export type ChainMap = { [chainName: string]: ChainData }

export type CIRepo = {
	repoName: string
	doCI: (repoPath: string, chains: ChainMap, execInDirectory: (cmd: string) => Promise<any>) => Promise<void>
}