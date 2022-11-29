import express from "express";
import { getAllRecipes } from "../../controllers/recipesControllers/recipesControllers.js";

// eslint-disable-next-line new-cap
const recipesRouter = express.Router();

recipesRouter.get("/list", getAllRecipes);

export default recipesRouter;
