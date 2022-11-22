import * as dotenv from "dotenv";

dotenv.config();

const environment = {
  mongoDbDebug: process.env.DEBUG,
  port: process.env.PORT,
};

export default environment;
