
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail': 'error'
    // an operational error تمييز نوع 
    this.isOperational = true;

    // وين الايرو في اي لاين 
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;