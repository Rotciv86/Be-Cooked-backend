import express from "express";
import morgan from "morgan";
import cors from "cors";
import environment from "../loadEnvironment.js";

const { corsAllowedDomain } = environment;

const app = express();

app.disable("x-powered-by");
const allowedOrigins = [corsAllowedDomain];

const options: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());
app.use("/", (req, res) => {
  res.send("It is working");
});

export default app;
