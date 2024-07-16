const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    maxlength: [15, 'A tour name must have  less or equal then 40 ch'],
    minlength: [15, 'A tour name must have more or equal then 10 ch'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    max: [5, 'Rating must be below 5'],
    min: [1, 'Rating must be above 1']
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) { 
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) shuld be below regular price'
    } 
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    // to not show
    select: false,
  },
  startDates: [Date]
// ⬇ i can use schema option 
}, {
  // alwoe to be ⬇ part of the output
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});
//  it will not be save in dataBase
//  add schema name it ⬇ then use get it name getter ⬇ تكون مشتقه من 
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
})


// tourSchema.virtual(function() {
//   // add schema for add the week
//   return this.duration / 7;
// })

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
