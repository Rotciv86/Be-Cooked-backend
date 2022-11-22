import CustomError from "./CustomError.js";

describe("Given the class CurtomError", () => {
  describe("When it's initialized with the message 'Error', status 500, and public message 'There was a server error, try again later'", () => {
    test("Then it should create a new instance object with the same data", () => {
      const expectedCurtomError = {
        message: "Error",
        status: 500,
        publicMessage: "There was a server error, try again later",
      };
      const { message, status, publicMessage } = expectedCurtomError;

      const expectedCurtomErrorKeys = Object.keys(expectedCurtomError);
      const [messageProperty, statusProperty, publicMessageProperty] =
        expectedCurtomErrorKeys;

      const resultCustomError = new CustomError(message, status, publicMessage);

      expect(resultCustomError).toHaveProperty(messageProperty, message);
      expect(resultCustomError).toHaveProperty(statusProperty, status);
      expect(resultCustomError).toHaveProperty(
        publicMessageProperty,
        publicMessage
      );
    });
  });
});
