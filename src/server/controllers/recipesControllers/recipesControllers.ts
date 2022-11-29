import type { Request, Response, NextFunction } from "express";
import debugCreator from "debug";

import chalk from "chalk";
import CustomError from "../../../utils/CustomError.js";
import Recipe from "../../../database/models/Recipe.js";

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
