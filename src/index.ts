import "./server/loadEnvironment.js";

import startServer from "./server/startServer.js";

const { PORT: port } = process.env;

await startServer(+port);
