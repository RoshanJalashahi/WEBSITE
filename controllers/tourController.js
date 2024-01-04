// //const fs = require('fs');

// const Tour = require('./../models/tourModel');
// const APIFeatures = require('./../utils/apiFeatures');

// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };

// // const tours = JSON.parse(
// //   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// // );

// // exports.checkID = (req, res, next, val) => {
// //   console.log(`Tour id is ${val}`);
// //   const id = req.params.id * 1;
// //   if (id > tours.length) {
// //     return res.status(404).json({
// //       status: 'fail',
// //       message: 'invalid id',
// //     });
// //   }
// //   next();
// // };

// // exports.checkBody = (req, res, next) => {
// //   if (!req.body.name || !req.body.price) {
// //     return res.status(400).json({
// //       status: 'fail',
// //       message: 'missing name or price',
// //     });
// //   }
// //   next();
// // };

// exports.getAllTours = async (req, res) => {
//   // console.log(req.requestTime);
//   try {
//     console.log(req.query);

//     //EXECUTE QUERY
//     const features = new APIFeatures(Tour.find(), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     const tours = await features.query;
//     // const tours = await Tour.find({
//     //   duration: 5,
//     //   difficulty: 'easy'
//     // });

//     //some special mongose methods
//     // const tours = await Tour.find()
//     //   .where('duration')
//     //   .equals(5)
//     //   .where('difficulty')
//     //   .equals('easy');

//     //SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       // requestedAt: req.requestTime,
//       results: tours.length,

//       data: {
//         tours,
//       }
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getTour = async (req, res) => {
//   // console.log(req.params);

//   // const id = req.params.id * 1;
//   // const tour = tours.find((el) => el.id === id);
//   // //if (id > tours.length) {
//   // // if (!tour) {
//   // //   return res.status(404).json({
//   // //     status: 'fail',
//   // //     message: 'invalid id',
//   // //   });
//   // // }
//   try {
//     const tour = await Tour.findById(req.params.id);
//     //Tour.find({ _id: req.params.id })
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.createTour = async (req, res) => {
//   try {
//     // const newTour = new Tour({});
//     // newTour.save();

//     //new method for creating
//     const newTour = await Tour.create(req.body);

//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err
//     });
//   }

//   //console.log(req.body);
//   // const newId = tours[tours.length - 1].id + 1;
//   // const newTour = { id: newId, ...req.body };

//   // tours.push(newTour);

//   // fs.writeFile(
//   //   `${__dirname}/dev-data/data/tours-simple.json`,
//   //   JSON.stringify(tours),
//   //   (err) => {
//   //     res.status(201).json({
//   //       status: 'success',
//   //       data: {
//   //         tour: newTour,
//   //       },
//   //     });
//   //   },
//   //);

//   //res.send('done');
// };

// exports.updateTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.deleteTour = async (req, res) => {
//   try {
//     await Tour.findByIdAndDelete(req.params.id, req.body);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getTourStats = async (req, res) => {
//   try {
//     const stats = await Tour.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.5 } },
//       },
//       {
//         $group: {
//           //_id: '$ratingsAverage',
//           _id: { $toUpper: '$difficulty' },
//           numTours: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//       {
//         $sort: { avgPrice: 1 },
//       },
//       // {
//       //   $match: { _id: {$ne: 'EASY' }},
//       // },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         stats,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = req.params.year * 1; //2021

//     const plan = await Tour.aggregate([
//       {
//         $unwind: '$startDates',
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`), //$lte: new Date(`${year+1}-01-01`)
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' },
//           numTourStart: { $sum: 1 },
//           tours: { $push: '$name' }, // push is used to push array into the document
//         },
//       },
//       {
//         $addFields: { month: '$_id' },
//       },
//       {
//         $project: { _id: 0 },
//       },
//       {
//         $sort: {
//           numTourStart: -1,
//         },
//       },
//       {
//         $limit: 12,
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         plan,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// ALTERNATIVE

const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// exports.updateTour = async (req, res) => {
//   try {
//     console.log('Updating tour. Request body:', req.body);

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     console.log('Updated tour:', tour);

//     // Check if the tour was found and updated
//     if (!tour) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Tour not found',
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });

//     //

//     // res.status(200).json({
//     //   status: 'success',
//     //   data: {
//     //     tour: tour
//     //   }
//     // });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.updateTour = async (req, res) => {
//   try {
//     console.log('Updating tour. Request body:', req.body);

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     console.log('Updated tour:', tour);

//     // Check if the tour was found and updated
//     if (!tour) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Tour not found',
//       });
//     }

//     console.log('Sending updated tour in response:', tour);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     console.error('Error updating tour:', err);
//       // Log the error details
//   console.error(err);

//     if (err.name === 'ValidationError') {
//       const errors = Object.values(err.errors).map((el) => el.message);
//       return res.status(400).json({
//         status: 'fail',
//         message: errors,
//       });
//     }

//     res.status(500).json({
//       status: 'error',
//       message: err.message || 'Internal Server Error',
//     });
//   }
// };

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      strict: true,
      new: true,
      runValidators: true,
      includeResultMetadata: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
