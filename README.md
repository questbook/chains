# QuestBook Chains

Single source of truth for all the chains supported by the QuestBook app &amp; their respective configuration. Any DAO or protocol looking to add support QuestBook to their chain should PR here.

## Adding a new chain

1. Clone the repo
2. Deploy our [contracts](https://github.com/questbook/grants-contracts-upgradeable) to your chain.
3. Create a new yaml file in the `./chains` with the name of the chain. For eg. if your chain is the testnet for XYZ, then the file would be called `xyz-testnet.yaml`
4. Enter all the required configuration, as mentioned in the JSON schema stored at `./src/chain-data-schema.yaml`.
	- This would include details like chain name, ID, addresses of contracts deployed, block number of the contract deployment, etc.
		If you're looking for reference, look at [any of the other chains](https://github.com/questbook/chains/blob/main/chains/rinkeby.yaml) !
	- You must also add an icon for your chain and place it in `./chain-assets`
5. Submit a PR!
6. Once the PR is merged, CI will take care of the rest & your chain will be live on our [beta app](https://beta.questbook.app) within minutes