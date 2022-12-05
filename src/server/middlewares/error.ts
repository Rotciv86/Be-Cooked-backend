import chalk from "chalk";
import debugCreator from "debug";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../utils/CustomError.js";
import "../../loadEnvironment.js";

const debug = debugCreator("beCooked:server:middlewares:error");

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Error not found", 404, "Error not found");
  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.status ?? 500;
  const publicMessage = error.publicMessage || "General error server";
  debug(chalk.red(error.message));
  res.status(statusCode).json({ error: publicMessage });
};
