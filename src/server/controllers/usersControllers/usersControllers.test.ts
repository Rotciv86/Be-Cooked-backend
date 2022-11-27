import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import type { RegisterUserData } from "../../types.js";
import { registerUser } from "./usersControllers.js";
import User from "../../../database/models/User.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a registerUser controller", () => {
  describe("When it receives a request with username 'Víctor', password '4321' and email 'vic@gmail.com' and doesn't exists in the database", () => {
    test("Then its method status should be called with a 201 and its method json should be called with Victor's data", async () => {
      const expectedStatusCode = 201;
      const registerData: RegisterUserData = {
        username: "Víctor",
        password: "4321",
      };

      const req: Partial<Request> = {
        body: registerData,
      };

      const hashedPassword = "565483366";
      const userId = new mongoose.Types.ObjectId();

      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
      User.create = jest.fn().mockResolvedValue({
        ...registerData,
        password: hashedPassword,
        _id: userId,
      });

      const expectedMessage = {
        message: "User Víctor has been created successfully",
      };

      await registerUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request with username 'Víctor' and password '4321' and it is already exists in the database", () => {
    test("Then it should call the next function with a CustomError", async () => {
      const registerData: RegisterUserData = {
        username: "Víctor",
        password: "4321",
      };
      const req: Partial<Request> = {
        body: registerData,
      };
      const next = jest.fn();
      const error = new Error("This users already exists");

      User.create = jest.fn().mockRejectedValue(error);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
