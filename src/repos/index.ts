import grantsContractsUpgradeable from "./grants-contracts-upgradeable";
import grantsFrontend from "./grants-frontend";
import graphNodeDeployment from "./graph-node-deployment";
import qbAPI from "./qb-api";
import serviceValidator from "./service-validator";
import subgraph from "./subgraph";

// list out all repos that require CI
// these would be repos that derive data from this single source of truth repo
export default [
	graphNodeDeployment,
	grantsContractsUpgradeable,
	serviceValidator,
	subgraph,
	grantsFrontend,
	qbAPI,
]