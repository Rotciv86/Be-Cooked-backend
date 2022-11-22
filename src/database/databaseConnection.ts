import chalk from "chalk";
import debugCreator from "debug";
import mongoose from "mongoose";
import environment from "../loadEnvironment.js";

const debug = debugCreator("beCooked:database");

const databaseConnection = async (databaseUrl: string) => {
  try {
    await mongoose.connect(databaseUrl, { dbName: "beCooked" });
    mongoose.set("debug", environment.mongoDbDebug === "true");
    mongoose.set("toJSON", {
      virtuals: true,
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return ret;
      },
    });
    debug(chalk.green("Connected successfully to the database"));
  } catch (error: unknown) {
    debug(
      chalk.red(
        `There was an error connecting to the database: ${
          (error as Error).message
        }`
      )
    );
  }
};

export default databaseConnection;
