import grantsFrontend from "./grants-frontend";
import graphNodeDeployment from "./graph-node-deployment";
import serviceValidator from "./service-validator";
import subgraph from "./subgraph";

export default [
	graphNodeDeployment,
	serviceValidator,
	subgraph,
	grantsFrontend,
]