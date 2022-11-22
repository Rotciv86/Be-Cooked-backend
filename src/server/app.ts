import express from "express";
import morgan from "morgan";
import cors from "cors";
import environment from "../loadEnvironment.js";
import { errorNotFound, generalError } from "./middlewares/error.js";

const { corsAllowedDomain } = environment;

const app = express();

app.disable("x-powered-by");
const allowedOrigins = [corsAllowedDomain];

const options: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use(errorNotFound);

app.use(generalError);

export default app;
