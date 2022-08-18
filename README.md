# QuestBook Chains

Single source of truth for all the chains supported by the QuestBook app &amp; their respective configuration. Any DAO or protocol looking to add support QuestBook to their chain should PR here.

## Adding a new chain

1. Clone the repo
2. Run `yarn install` in the repo
3. Create a new yaml file in the `./chains` with the name of the chain. For eg. if your chain is the testnet for XYZ, then the file would be called `xyz-testnet.yaml`
4. Next, in this yaml file, enter the following information for us to add your chain to our app. This would primarily include:
    - chainName
    - chainId
    - rpcUrls
	- This would include details like  icon, supported wallet, explorer links, supported currencies, etc.
		If you're looking for reference, look at [any of the other chains](https://github.com/questbook/chains/blob/main/chains/rinkeby.yaml) !
	- You must also add an icon for your chain and place it in `./chain-assets`
	- set the field `qbContracts` as the literal `TBD` -- if you'd like to let CI deploy the contracts on chain.
		- your yaml would look like:
			``` yaml
			rpcUrl: https://abcd...
			qbContracts: TBD
			```
		- for this to happen, please send enough tokens to cover deployment gas fees to the QB wallet:
			`0x4bED464ce9D43758e826cfa173f1cDa82964b894`
		- if you'd like to deploy yourself you can follow the steps as mentioned in our contracts repo [here](https://github.com/questbook/grants-contracts-upgradeable)
	Enter all the remaining required configuration, as mentioned in the JSON schema stored at `./src/chain-data-schema.yaml`
5. Submit a PR!
6. Once the PR is merged, CI will take care of the rest & your chain will be live on our [beta app](https://beta.questbook.app) within minutes
