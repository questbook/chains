/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ChainData {
  /**
   * Internal name of the chain, has to be the same as the name of the chain config file
   */
  chainName: string;
  /**
   * The name of the chain, as shown to lay users
   */
  userFacingName: string;
  /**
   * ID of the chain
   */
  chainId: number;
  /**
   * Is this a test/dev network. Test networks are only available on beta.questbook.app
   */
  isTestNetwork: boolean;
  /**
   * Name of the icon in the 'chain assets' folder
   */
  icon: string;
  /**
   * List of supported wallets
   */
  supportedWallets: ["injected" | "walletConnect", ...("injected" | "walletConnect")[]];
  /**
   * Specify as many RPC urls you'd like for the chain
   */
  rpcUrls: [string, ...string[]];
  /**
   * Data about where the QB contracts are deployed on the chain
   */
  qbContracts: {
    workspace: {
      /**
       * Address of the contract deployment, eg. '0x0000000000000000000000000000000000000000'
       */
      address: string;
      /**
       * What block to start indexing the contract. Could be any block after contract deployment
       */
      startBlock: number;
    };
    applications: {
      /**
       * Address of the contract deployment, eg. '0x0000000000000000000000000000000000000000'
       */
      address: string;
      /**
       * What block to start indexing the contract. Could be any block after contract deployment
       */
      startBlock: number;
    };
    grantFactory: {
      /**
       * Address of the contract deployment, eg. '0x0000000000000000000000000000000000000000'
       */
      address: string;
      /**
       * What block to start indexing the contract. Could be any block after contract deployment
       */
      startBlock: number;
    };
    reviews: {
      /**
       * Address of the contract deployment, eg. '0x0000000000000000000000000000000000000000'
       */
      address: string;
      /**
       * What block to start indexing the contract. Could be any block after contract deployment
       */
      startBlock: number;
    };
  };
  supportedCurrencies: {
    /**
     * Name of the SVG icon of the image.
     */
    icon: string;
    /**
     * User facing name of the currency
     */
    label: string;
    /**
     * Address of the currency on the chain
     */
    address: string;
    /**
     * Number of decimals in the currency
     */
    decimals: number;
  }[];
  /**
   * Data about the explorer for the chain
   */
  explorer: {
    /**
     * mustache templated URL of the address page.
     * {{address}} will be replaced with the address
     */
    address: string;
    /**
     * mustache templated URL to view a transaction hash on the explorer.
     * {{tx}} will be replaced with the address
     */
    transactionHash: string;
  };
}
