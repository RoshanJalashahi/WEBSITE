// const mongoose = require('mongoose');
// const slugify = require('slugify');
// // mongosh schema
// const tourSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'A tour must have a name'],
//       unique: true,
//       trim: true,
//       maxlength: [40, 'A tour name must have less or equal than forty characters'],
//       minlength: [10, 'A tour name must have more or equal than ten characters ']
//     },
//     slug: String,

//     duration: {
//       type: Number,
//       required: [true, 'A tour must have duration'],
//     },
//     maxGroupSize: {
//       type: Number,
//       required: [true, 'A tour must have group size'],
//     },
//     difficulty: {
//       type: String,
//       required: [true, ' A tour must have difficulty'],
//     },
//     ratingsAverage: {
//       type: Number,
//       default: 4.5,
//     },
//     ratingsQuantity: {
//       type: Number,
//       default: 0
//     },
//     price: {
//       type: Number,
//       required: [true, 'A tour must have a price'],
//     },
//     priceDiscount: Number,
//     description: {
//       type: String,
//       trim: true,
//     },
//     summary: {
//       type: String,
//       trim: true,
//       required: [true, ' A tour must have summary'],
//     },
//     imageCover: {
//       type: String,
//       required: [true, 'A tour must have cover image'],
//     },
//     images: [String],
//     createdAt: {
//       type: Date,
//       default: Date.now(),
//       select: false,
//     },
//     startDates: [Date],
//     secretTour: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );

// tourSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// //DOCUMENT MIDDLEWARE it runs before the save() and .create()but not in .insertmany()
// tourSchema.pre('save', function (next) {
//   //console.log(this);
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// // tourSchema.pre('save', function (next) {
// //   console.log('Will save document...');
// //   next();
// // });

// // tourSchema.post('save', function (doc, next) {
// //   console.log(doc);
// //   next();
// // });

// //QUERY MIddleware
// //tourSchema.pre('find', function (next) {
// tourSchema.pre(/^find/, function (next) {
//   //console.log(this);
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();

//   next();
// });

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   //console.log(docs);

//   next();
// });

// // tourSchema.pre('findOne', function (next) {
// //   this.findOne({ secretTour: { $ne: true } });

// //   next();
// // });

// //AGGREGRATION MIDDLEWARE
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({
//     $match: { secretTour: { $ne: true } },
//   });
//   console.log(this.pipeline());
//   next();
// });

// //MONGOOSE VALIDATION IS A VERY POWERFUL TOOL FOR THE DATA VALIDATION

// //schema model
// const Tour = mongoose.model('Tour', tourSchema);
// module.exports = Tour;

// // mongoose middleware first one is document middleware pre and post hook
// //  there are four middleware they are:- document , query , aggergrate and model middelware

// ////////////// alternative

const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {

// 2)
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
