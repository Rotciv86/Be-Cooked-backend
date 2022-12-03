import type { Request, Response, NextFunction } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
} from "./recipesControllers.js";
import CustomError from "../../../utils/CustomError.js";
import { mockRecipe } from "../../../mocks/mockRecipe.js";
import { Recipe } from "../../../database/models/Recipe.js";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given the contactsController", () => {
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

describe("Given a deleteRecipe controller", () => {
  describe("When it receives a request with a recipeId", () => {
    test("Then it should return a response and call its method status with code 200 and its method json with the received recipe", async () => {
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

  describe("When it receives a request without any recipeId", () => {
    test("Then next function should be called with a Custom error with public message 'Recipe not found'", async () => {
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

describe("Given a createRecipe controller", () => {
  describe("When it receives a request", () => {
    test("Then it should invoke its response with status 201 and the new created recipe", async () => {
      const expectedStatus = 201;
      const recipes = mockRecipe;
      const expectedResponse = { ...recipes };
      const req: Partial<Request> = {
        params: { userId: mockRecipe.owner },
      };

      req.body = recipes;

      Recipe.create = jest.fn().mockResolvedValue({
        recipes,
      });

      await createRecipe(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({
        recipes: expectedResponse,
      });
    });
  });

  describe("When it receives a request and recipe create rejects", () => {
    test("Then next should be invoked with an error", async () => {
      const req: Partial<Request> = {
        params: {},
      };
      const error = new Error();

      Recipe.create = jest.fn().mockRejectedValue(error);

      await createRecipe(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
