import chalk from "chalk";
import debugCreator from "debug";
import app from "./app.js";

const debug = debugCreator("beCooked:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening on http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error connecting the server", error.message));
      reject(error);
    });
  });

export default startServer;
