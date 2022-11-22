import type { NextFunction, Request, Response } from "express";
import CustomError from "../../utils/CustomError.js";

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

  res.status(statusCode).json({ error: publicMessage });
};
