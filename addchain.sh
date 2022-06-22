#!/usr/bin/env bash

while getopts "n:" arg; do
  case $arg in
    n) NETWORK=$OPTARG;;
  esac
done

echo "Generating chains in grant-contracts-upgradable repo"
yarn ts-node src --dry-run --no-validate --repo grants-contracts-upgradeable

cp tmp/grants-contracts-upgradeable/chains.json contracts/evm/chains.json

cd contracts/evm 

echo "installing packages.."
yarn

echo "generating types.."
NETWORK=$NETWORK yarn typechain

echo "deploying contracts"
NETWORK=$NETWORK npm run deploy
NETWORK=$NETWORK npm run postdeploy
cd ../.. 

echo "adding contract addresses and block numbers to your chain's yaml file"
yarn ts-node src/utils/gen-chain-yaml --chain-name $NETWORK