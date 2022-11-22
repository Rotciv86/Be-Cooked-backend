import * as dotenv from "dotenv";

dotenv.config();

const environment = {
  mongoDbDebug: process.env.DEBUG,
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_DB,
};

export default environment;
