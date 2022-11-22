class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public publicMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
