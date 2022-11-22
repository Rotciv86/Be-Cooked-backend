import "./loadEnvironment.js";
import databaseConnection from "./database/databaseConnection.js";
import startServer from "./server/startServer.js";

const { PORT: port, MONGO_DB: databaseUrl } = process.env;

await startServer(+port);
await databaseConnection(databaseUrl);
