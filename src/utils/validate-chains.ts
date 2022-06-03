import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { chainsDirectory, chainAssetsDirectory } from '../config.json'
import { ChainData } from '../types'
import getChainDataValidator from './get-chain-data-validator'
import { readYaml } from './yaml'

/**
 * Fetches all chains, validates them and then returns them in a map
 */
export default async() => {
	const chainMap: { [_: string]: ChainData } = { }
	const chains = await getAllChains()
	for(const chain of chains) {
		chainMap[chain] = await assertChainData(chain)
	}

	return chainMap
}

const getAllChains = async() => {
	const chainFiles = await readdir(chainsDirectory)
	const chains: string[] = []
	for(const file of chainFiles) {
		if(file.endsWith('.yaml')) {
			chains.push(file.slice(0, -5))
		}
	}
	
	return chains
}

const assertChainData = async(chainName: string) => {
	const data = await readYaml<ChainData>(join(chainsDirectory, `${chainName}.yaml`))
	const validate = await getChainDataValidator()
	try {
		await validate(data)
		if(chainName !== data.chainName) {
			throw new Error('chain name in yaml must match file name')
		}
		// validate all icons are in the assets directory
		const icons = [
			data.icon,
			...data.supportedCurrencies.map(currency => currency.icon),
		]
		for(const icon of icons) {
			try {
				await stat(join(chainAssetsDirectory, icon))
			} catch(error) {
				throw new Error(`Icon "${icon}" not found in "${chainAssetsDirectory}"`)
			}
		}
	} catch(error) {
		throw new Error(`Error in validating "${chainName}":\n\n${error}`)
	}

	return data
}