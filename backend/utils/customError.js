export default class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    const lowChars = message.toLowerCase();
    if (lowChars.includes('validation failed')) {
      this.statusCode = 400;
    } else if (lowChars.includes('not found')) {
      this.statusCode = 404;
    } else if (lowChars.includes('unauthorized')) {
      this.statusCode = 403;
    } else {
      this.statusCode = 500;
    }
  }
}