import { join } from "path"
import { ChainData } from "../types"
import { readYaml, writeYaml } from "./yaml"
import { chainsDirectory } from '../config.json'
import { readFile } from "fs/promises"

/**
 * generates the correct YAML for the specific chain
 * @param configFilePath deployed contract config path
 * @param chainName name of the chain we're deploying to
 */
const generateChainYaml = async(
    configFilePath: string,
    chainName: string
) => {
    const configStr = await readFile(configFilePath, 'utf8')
    const config = JSON.parse(configStr)

    // Read yaml file from inside chains folder
    const yamlFilePath = join(chainsDirectory, `${chainName}.yaml`)
    let yaml = await readYaml<ChainData>(yamlFilePath)
    console.log(`writing the contract addresses for "${chainName}"`)
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

    return qbContracts
}

export default generateChainYaml