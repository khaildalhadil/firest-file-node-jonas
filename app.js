const express = require('express');
const morgan = require('morgan');

const trourRoute = require('./routes/toursRoute');
const usersRoute = require('./routes/usersRoute');

const AppError = require('./utils/appError.js')
const globalErrorHandler = require('./controllers/errorControllers.js')


const app = express();

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('development');
} else {
  console.log('production');
}

app.use(express.json());

// Middleware for routes
app.use('/api/v1/tours', trourRoute);
// app.use('/api/v1/users', usersRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)) 
});

app.use(globalErrorHandler)

module.exports = app;
