import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
} from "../../controllers/recipesControllers/recipesControllers.js";

// eslint-disable-next-line new-cap
const recipesRouter = express.Router();

recipesRouter.get("/list", getAllRecipes);
recipesRouter.delete("/delete/:recipeId", deleteRecipe);
recipesRouter.post("/create", createRecipe);
recipesRouter.get("detail/:recipeId", getRecipeById);

export default recipesRouter;
