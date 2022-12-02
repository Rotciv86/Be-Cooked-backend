import express from "express";
import {
  deleteRecipe,
  getAllRecipes,
} from "../../controllers/recipesControllers/recipesControllers.js";

// eslint-disable-next-line new-cap
const recipesRouter = express.Router();

recipesRouter.get("/list", getAllRecipes);
recipesRouter.delete("/delete/:recipeId", deleteRecipe);

export default recipesRouter;
