class CustomError extends Error {
  constructor(
    message: string,
    public status: number,
    public publicMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
