import type { Request, Response, NextFunction } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import "../../../loadEnvironment.js";
import CustomError from "../../../utils/CustomError.js";
import type { RecipeStructure } from "../../../database/models/Recipe.js";
import { Recipe } from "../../../database/models/Recipe.js";

const debug = debugCreator("beCooked:server:controllers:recipesController");

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find();

    if (!recipes) {
      const customError = new CustomError(
        "There are no recipes!",
        204,
        "There are no recipes!"
      );
      next(customError);
    }

    res.status(200).json({ recipes });
    debug(chalk.green(`${recipes.length} recipes found`));
  } catch (error: unknown) {
    next(error);
    debug(chalk.red("We couldn't find any recipe"));
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { recipeId } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json(deletedRecipe);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Recipe not found"
    );
    next(customError);
  }
};

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = "638a78c1055780b4dcfbcc6d";
  const receivedRecipe = req.body as RecipeStructure;

  try {
    const newRecipe = await Recipe.create({
      ...receivedRecipe,
      owner: admin,
    });

    res.status(201).json({
      recipe: {
        newRecipe,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};
