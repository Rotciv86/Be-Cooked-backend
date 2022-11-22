import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import bcrypt from "bcrypt";
import databaseConnection from "../../database/databaseConnection.js";
import User from "../../database/models/User.js";
import app from "../app.js";
import type { RegisterUserData } from "../types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the POST /users/sign-up endpoint", () => {
  describe("When it receives a request with a not existent database username 'Víctor' and password '1234'", () => {
    test("Then it should respond with status 201 and the message:'User Víctor has been created successfully'", async () => {
      const requestbody: RegisterUserData = {
        username: "Víctor",
        password: "1234",
      };

      const expectedStatus = 201;
      const expectedMessage = {
        message: "User Víctor has been created successfully",
      };

      const res = await request(app)
        .post("/users/sign-up")
        .send(requestbody)
        .expect(expectedStatus);

      expect(res.body).toStrictEqual(expectedMessage);
    });
  });

  describe("When it receives a request with an existent database username 'James' and password '4321'", () => {
    test("Then it should respon with status 500 and the message:'An error has ocurred on registration'", async () => {
      await User.create({
        username: "James",
        password: await bcrypt.hash("4321", 10),
      });

      const requestBody: RegisterUserData = {
        username: "James",
        password: "4321",
      };
      const expectedStatus = 500;
      const expectedMessage = { error: "An error has ocurred on registration" };

      const res = await request(app)
        .post("/users/sign-up")
        .send(requestBody)
        .expect(expectedStatus);

      expect(res.body).toStrictEqual(expectedMessage);
    });
  });
});
