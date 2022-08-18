import { ChainData } from './gen'

export type ChainMap = { [chainName: string]: ChainData }

export type CIRepo = {
	repoName: string
	doCI: (repoPath: string, chains: ChainMap, execInDirectory: (cmd: string, env?: { [_: string]: string }) => Promise<any>) => Promise<void>
}

export * from './gen'