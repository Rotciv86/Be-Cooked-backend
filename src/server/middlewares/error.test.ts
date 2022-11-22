import type { Response } from "express";
import CustomError from "../../utils/CustomError.js";
import { errorNotFound, generalError } from "./error.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
describe("Given the errorNotFound funciton middleware", () => {
  describe("When it receives req, res and next arguments", () => {
    test("Then it should call its next method", () => {
      const expectedError = new CustomError(
        "Error not found",
        404,
        "Error not found"
      );
      const next = jest.fn();

      errorNotFound(null, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given the generalError function middleware", () => {
  describe("When it receives: error, req, res and next parameters", () => {
    const customError = new CustomError(null, null, null);
    const expectedStatus = 500;
    const expectedResponse = { error: "General error server" };

    test("Then it should return a 500 status", () => {
      generalError(customError, null, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then is should return a response with public message:'General error server'", () => {
      generalError(customError, null, res as Response, null);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
