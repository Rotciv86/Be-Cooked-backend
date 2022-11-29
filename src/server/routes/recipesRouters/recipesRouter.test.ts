import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import databaseConnection from "../../../database/databaseConnection";
import Recipe from "../../../database/models/Recipe";

let server: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
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
      const status = 200;

      Recipe.find = jest.fn().mockReturnValue(null);

      const response = await request(app).get("/recipes/list").expect(status);

      expect(response.body).toStrictEqual({ recipes: null });
    });
  });

  describe("When it receives a request and an interval server error happens", () => {
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
