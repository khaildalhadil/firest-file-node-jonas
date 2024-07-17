const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError')

exports.topFiveCheap = (req, res, next) => {
    req.query.fields = 'name price difficulty'
    // req.query.sort = '-price'
    // req.query.limit = 5
    next()
}

exports.getFliterTours = catchAsync( async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limiting()
      .fields()
      .pagination();
    const allTours = await features.query;

    res.status(200).json({
      status: 'Ok',
      results: allTours.length,
      data: {
        tours: allTours,
      },
    });
});

exports.getToursById = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);

    if(!tour) {
      return next(new AppError(`no tour found with that ID`, 404))
    }

    res.status(200).json({
      status: 'seccuss',
      data: tour,
    });
});


exports.createTour = catchAsync( async (req, res, next) => {
  const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'seccuss',
      tour
    })
})

exports.updateToure = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!tour) {
      return next(new AppError(`no tour found with that ID`, 404))
    }

    const updatetour = await tour.save();
    res.status(200).json({
      status: 'seccuss',
      updatetour
    })
});

exports.deleteTours = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if(!tour) {
      return next(new AppError(`no tour found with that ID`, 404))
    }

    res.status(204).json({
      status: 'seccuss',
      data: null
    })
});
