const express = require('express');
const tourController = require('../controllers/toursControllers');

const route = express.Router();

route
  .route('/top-5-cheap')
  .get(tourController.topFiveCheap, tourController.getFliterTours)

route
  .route('/')
  .get(tourController.getFliterTours)
  .post(tourController.createTour);

route
  .route('/:id')
  .get(tourController.getToursById)
  .patch(tourController.updateToure)
  .delete(tourController.deleteTours);

module.exports = route;
