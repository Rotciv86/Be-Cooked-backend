/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import databaseConnection from "../../../database/databaseConnection";
import { Recipe } from "../../../database/models/Recipe";
import { mockRecipe } from "../../../mocks/mockRecipe";

let server: MongoMemoryServer;
const recipe = mockRecipe;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
  await Recipe.create(recipe);
});

beforeEach(async () => {
  await Recipe.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /recipes/list", () => {
  describe("When it receives a request with an empty body and 10 recipes in the data base", () => {
    test("Then it should respond with a 200 status", async () => {
      const status = 200;

      const response = await request(app).get("/recipes/list").expect(status);

      expect(response.body).toHaveProperty("recipes");
    });
  });

  describe("When it receives a request with no recipes in the data base", () => {
    test("Then it should respond with a 200 status and a object with property 'recipes' that has an array of empty recipes", async () => {
      const status = 204;

      Recipe.find = jest.fn().mockReturnValue(null);

      const response = await request(app).get("/recipes/list").expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request and an internal server error happens", () => {
    test("Then it should return a 500 status", async () => {
      const status = 500;

      Recipe.find = jest
        .fn()
        .mockRejectedValue({ error: "General error server" });

      const response = await request(app).get("/recipes/list").expect(status);

      expect(response.body).toStrictEqual({ error: "General error server" });
    });
  });
});

describe("Given the DELETE '/recipes/delete/:recipeId' endpoint", () => {
  describe("When it receives a request with  a valid recipeId", () => {
    test("Then it should return a response with status 200", async () => {
      const expectedStatus = 200;

      await request(app)
        .delete(`/recipes/delete/${recipe.recipeId}`)
        .expect(expectedStatus);
    });
  });
});

describe("When use the endpoint POST /recipes/create", () => {
  describe("And it receives a correct request with a correct recipe", () => {
    test("Then it should response with the new recipe created", async () => {
      const response = await request(app)
        .post("/recipes/create")
        .send(recipe)
        .expect(201);

      expect(response.body).toHaveProperty("recipe");
    });
  });

  describe("And it receives an uncomplete recipe", () => {
    test("Then it should response with status 500 and a message 'General error server'", async () => {
      const message = "General error server";

      const response = await request(app).post("/recipes/create").expect(500);

      expect(response.body).toHaveProperty("error", message);
    });
  });
});
