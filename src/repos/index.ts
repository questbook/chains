import grantsContractsUpgradeable from "./grants-contracts-upgradeable";
import grantsFrontend from "./grants-frontend";
import graphNodeDeployment from "./graph-node-deployment";
import qbAPI from "./qb-api";
import subgraph from "./subgraph";
import communicationService from "./communication-service";
import biconomyServer from "./biconomy-server";
import safeGuard from "./safeguard";
import trxnStatusService from "./trxn-status-service";
import serviceValidator from "./service-validator";

// list out all repos that require CI
// these would be repos that derive data from this single source of truth repo
export default [
	grantsContractsUpgradeable,
	graphNodeDeployment,
	serviceValidator,
	subgraph,
	grantsFrontend,
	qbAPI,
	communicationService,
	biconomyServer,
	safeGuard,
	trxnStatusService
]