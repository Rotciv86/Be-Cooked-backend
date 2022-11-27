import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User.js";
import type {
  RegisterUserData,
  UserCredentials,
  UserTokenPayload,
} from "../../types.js";
import CustomError from "../../../utils/CustomError.js";
import environment from "../../../loadEnvironment.js";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as RegisterUserData;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: `User ${newUser.username} has been created successfully`,
    });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "An error has ocurred on registration"
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError(
      "Username not found",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Incorrect password",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPayload, environment.jwtSecret, {
    expiresIn: "2d",
  });

  res.status(200).json({ accessToken: token });
};
