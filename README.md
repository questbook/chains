# QuestBook Chains

Single source of truth for all the chains supported by the QuestBook app &amp; their respective configuration. Any DAO or protocol looking to add support QuestBook to their chain should PR here.

## Adding a new chain

1. Clone the repo
2. Create a new yaml file in the `./chains` with the name of the chain. For eg. if your chain is the testnet for XYZ, then the file would be called `xyz-testnet.yaml`
3. Enter the following information:
    - chainName
    - chainId
    - rpcUrls
4. Run `git submodule update --init --recursive` to extract the contracts submodule
5. You should see the `contracts/evm` directory populated now
6. Add your deployment private keys and infura keys in .env file inside `contracts/evm/.env`. 
	- Refer to `contracts/evm/.env.example` for an example
	- Alternatively you can provide your private key & infura keys by passing them as an env flag
7. Run `yarn add:chain ${NETWORK}` to deploy our contracts to the new chain you're adding.
	- **Note:** The value of `${NETWORK}` should be same as the name of your chains yaml file. For example, `yarn add:chain xyz-testnet`
	- If you're passing the private key/infura key via an env flag, run the command like: `PRIVATE_KEY=your_private_key yarn add:chain xyz-testnet`
8. This will add the contract addresses to your chain's yaml file.
9. Enter all the remaining required configuration, as mentioned in the JSON schema stored at `./src/chain-data-schema.yaml`.
	- This would include details like  icon, supported wallet, explorer links, supported currencies, etc.
		If you're looking for reference, look at [any of the other chains](https://github.com/questbook/chains/blob/main/chains/rinkeby.yaml) !
	- You must also add an icon for your chain and place it in `./chain-assets`
10. Submit a PR!
11. Once the PR is merged, CI will take care of the rest & your chain will be live on our [beta app](https://beta.questbook.app) within minutes
