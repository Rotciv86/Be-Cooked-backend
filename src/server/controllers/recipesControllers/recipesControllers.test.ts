import type { Request, Response, NextFunction } from "express";
import { deleteRecipe, getAllRecipes } from "./recipesControllers.js";
import CustomError from "../../../utils/CustomError.js";
import { mockRecipe } from "../../../mocks/mockRecipe.js";
import Recipe from "../../../database/models/Recipe.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a contactsController", () => {
  describe("When it is invoked with getAllRecipes method with the recipe 'Arroz caldoso con bogavante' wich is in the data base", () => {
    test("Then it should respond with a 200 status", async () => {
      const status = 200;
      const req: Partial<Request> = {};

      Recipe.find = jest.fn().mockReturnValue(mockRecipe);
      await getAllRecipes(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });

  describe("When it is invoked with getAllRecipes method with no recipe in the data base", () => {
    test("Then it should respond with a 204 status", async () => {
      const customError = new CustomError(
        "There are no recipes",
        204,
        "There are no recipes"
      );
      const req: Partial<Request> = {};

      Recipe.find = jest.fn().mockRejectedValue(customError);
      await getAllRecipes(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it is invoked with getAllRecipes method with no recipe in the data base", () => {
    test("Then it should respond with a 204 status", async () => {
      const req: Partial<Request> = {};
      const customError = new CustomError(
        "There are no recipes",
        204,
        "There are no recipes"
      );

      Recipe.find = jest.fn().mockReturnValueOnce(null);
      await getAllRecipes(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a deleteVenue controller", () => {
  describe("When it receives a request with a venueId", () => {
    test("Then it should return a response and call its method status with code 200 and its method json with the received venue", async () => {
      const expectedStatus = 200;
      const recipeToDelete = mockRecipe;
      const req: Partial<Request> = {
        params: { recipeId: mockRecipe.recipeId },
      };

      Recipe.findByIdAndDelete = jest.fn().mockReturnValue(recipeToDelete);

      await deleteRecipe(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(recipeToDelete);
    });
  });

  describe("When it receives a request without any venueId", () => {
    test("Then next function should be called with a Custom error with public message 'Venue not found'", async () => {
      const req: Partial<Request> = {
        params: { recipeId: mockRecipe.recipeId },
      };
      const expectedError = new CustomError(
        "Recipe not found",
        404,
        "Recipe not found"
      );

      Recipe.findByIdAndDelete = jest.fn().mockRejectedValueOnce(expectedError);

      await deleteRecipe(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
