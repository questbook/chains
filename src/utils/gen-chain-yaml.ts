import { writeFile, unlink } from "fs/promises"
import { join } from "path"
// import config from '../../../grants-contracts-upgradeable/config.json'
import config from '../../contracts/evm/config.json'
import { ChainData } from "../types"
import { readYaml, writeYaml } from "./yaml"
import { chainsDirectory } from '../config.json'
import getArg from "./get-arg"


const TEMP_CONFIG_PATH = '././contracts/evm'

const generateChainYaml = async (chainName: string | undefined) => {

    // Read yaml file from inside chains folder
    const yamlFilePath = join(chainsDirectory, `${chainName}.yaml`)
    let yaml = await readYaml<ChainData>(yamlFilePath)
    console.log('Writing the contract addresses')
    // Write the values of contract addresses from config to the yaml file
    const qbContracts = {
        "applications": {
            "address": config.applicationRegistryAddress.proxy,
            "startBlock": config.applicationRegistryAddress.blockNumber,
        },
        "workspace": {
            "address": config.workspaceRegistryAddress.proxy,
            "startBlock": config.workspaceRegistryAddress.blockNumber
        },
        "grantFactory": {
            "address": config.grantFactoryAddress.proxy,
            "startBlock": config.grantFactoryAddress.blockNumber
        },
        "reviews": {
            "address": config.applicationReviewRegistryAddress.proxy,
            "startBlock": config.applicationReviewRegistryAddress.blockNumber
        },
    }
    yaml = {...yaml, qbContracts}
    // Save the yaml file
    await writeYaml(yamlFilePath, yaml)
    // Delete the config file
    // unlink(join(TEMP_CONFIG_PATH, 'config.json'))
}

const chainName = getArg('chain-name')
generateChainYaml(chainName)

export default generateChainYaml