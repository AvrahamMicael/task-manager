module.exports = class ErrorWithStatus extends Error {
  constructor(message, statusCode)
  {
    super(message);
    this.statusCode = statusCode;
  }
}
