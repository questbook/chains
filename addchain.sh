#!/usr/bin/env bash

while getopts "n:" arg; do
  case $arg in
    n) NETWORK=$OPTARG;;
  esac
done

echo "Generating chains in grant-contracts-upgradable repo"
ts-node src --dry-run --no-validate --repo grants-contracts-upgradeable

cp tmp/grants-contracts-upgradeable/chains.json contracts/evm/chains.json

cd contracts/evm 

echo "installing packages.."
yarn

echo "generating types.."
yarn typechain

echo "deploying contracts"
NETWORK=$NETWORK npm run deploy
cd ../.. 

echo "adding contract addresses and block numbers to your chain's yaml file"
ts-node src/utils/gen-chain-yaml --chain-name $NETWORK