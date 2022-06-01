import grantsFrontend from "./grants-frontend";
import graphNodeDeployment from "./graph-node-deployment";
import serviceValidator from "./service-validator";
import subgraph from "./subgraph";

// list out all repos that require CI
// these would be repos that derive data from this single source of truth repo
export default [
	graphNodeDeployment,
	serviceValidator,
	subgraph,
	grantsFrontend,
]