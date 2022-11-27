import * as dotenv from "dotenv";

dotenv.config();

const environment = {
  mongoDbDebug: process.env.DEBUG,
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_DB,
  corsAllowedDomain: process.env.CORS_ALLOWED_DOMAIN,
  jwtSecret: process.env.JWT_SECRET,
};

export default environment;
