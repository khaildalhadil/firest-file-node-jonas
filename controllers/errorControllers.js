const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
  console.log(err);
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR ⭕')
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong!'
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error xxx'

  if(process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {

    let error = {...err}

    // check error.name it desc't work ❌⭕
    // it is not maked as operational 
// error ⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕⭕❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
    if(error.name === 'CastError') error = handleCastErrorDB(error)
    sendErrorProd(error, res)
  };
};