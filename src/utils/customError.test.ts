import CustomError from "./customError.js";

describe("Given the class CustomError", () => {
  describe("When it's initialized with the message 'Error', publicMessage 'There was a server error' and statusCode 500", () => {
    test("Then it should create a new instance object with the same data", () => {
      const expectedCurtomError = {
        message: "Error",
        publicMessage: "There was a server error",
        statusCode: 500,
      };
      const { statusCode, message, publicMessage } = expectedCurtomError;

      const expectedCustomErrorKeys = Object.keys(expectedCurtomError);
      const [messageProperty, publicMessageProperty, statusProperty] =
        expectedCustomErrorKeys;

      const resultCustomError = new CustomError(
        statusCode,
        message,
        publicMessage
      );

      expect(resultCustomError).toHaveProperty(messageProperty, message);
      expect(resultCustomError).toHaveProperty(
        publicMessageProperty,
        publicMessage
      );
      expect(resultCustomError).toHaveProperty(statusProperty, statusCode);
    });
  });
});
