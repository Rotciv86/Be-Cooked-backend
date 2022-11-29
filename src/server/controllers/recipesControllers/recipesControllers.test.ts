import type { Request, Response, NextFunction } from "express";
import { getAllRecipes } from "./recipesControllers.js";
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
