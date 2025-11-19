// src/utils/AppError.ts
// A custom Error class that includes an HTTP status code
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Pass the message to the base Error class
    this.statusCode = statusCode;

    // This is necessary to make 'instanceof AppError' work correctly
    Object.setPrototypeOf(this, AppError.prototype);
    // Maintains proper stack trace in V8 (Node.js)
    Error.captureStackTrace(this, this.constructor);
  }

  // Static helper methods to create common errors easily

  /**
   * Creates a new 404 Not Found error
   */
  static notFound(message: string): AppError {
    return new AppError(message, 404);
  }

  /**
   * Creates a new 400 Bad Request error
   */
  static badRequest(message: string): AppError {
    return new AppError(message, 400);
  }

  /**
   * Creates a new 409 Conflict error
   */
  static conflict(message: string): AppError {
    return new AppError(message, 409);
  }
}