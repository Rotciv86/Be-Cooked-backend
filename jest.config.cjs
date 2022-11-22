/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "!src/index.ts",
    "!src/server/startServer.ts",
    "!src/server/loadEnvironment.ts",
    "!src/database/databaseConnection.ts",
    "!src/database/models/Users.ts",
  ],
};
