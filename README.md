# QuestBook Chains

Single source of truth for all the chains supported by the QuestBook app &amp; their respective configuration. Any DAO or protocol looking to add support QuestBook to their chain should PR here.

## Adding a new chain

1. Clone the repo
2. Create a new yaml file in the `./chains` with the name of the chain. For eg. if your chain is the testnet for XYZ, then the file would be called `xyz-testnet.yaml`
3. Enter the following information:
    - chainName
    - chainId
    - rpcUrls
4. Run `yarn:add chain` to add your chain to our official list of networks 
5. Time to deploy the contracts. Run `git submodule update --init --recursive` to initialize the contracts submodule
6. `cd contracts/evm` to access the contracts submodule
7. Run the following to install packages and types
```
yarn
yarn typechain
```
5. Run `NETWORK={$NETWORK} npm run deploy`. Set `$NETWORK` as the name of the network that you just used to name your chains yaml file. For example if your yaml file name is `xyz-testnet.yaml` then run `NETWORK=xyz-testnet npm run deploy`
7. Move to the repo root folder `cd ../..`
8. Run `update:chain --chain-name $chain-name`, `{$chain-name}` should be same as the `$NETWORK` defined in Step 8.
9. This will add the contract addresses to your chain's yaml file.
9. Enter all the remaining required configuration, as mentioned in the JSON schema stored at `./src/chain-data-schema.yaml`.
	- This would include details like  icon, supported wallet, explorer links, supported currencies, etc.
		If you're looking for reference, look at [any of the other chains](https://github.com/questbook/chains/blob/main/chains/rinkeby.yaml) !
	- You must also add an icon for your chain and place it in `./chain-assets`
5. Submit a PR!
6. Once the PR is merged, CI will take care of the rest & your chain will be live on our [beta app](https://beta.questbook.app) within minutes
