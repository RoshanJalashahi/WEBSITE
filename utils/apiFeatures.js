// class APIFeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filter() {
//     const queryObj = { ...this.queryString };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     excludedFields.forEach((el) => delete queryObj[el]);
//     // console.log(req.query, queryObj);

//     //1 B) ADVANCED FILTERING
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     //console.log(JSON.parse(queryStr));

//     //{ difficulty: 'easy', duration: {$gte : 5}}// mongo db query
//     // { difficulty: 'easy', duration: {gte : 5}}// query
//     // gte, gt, lte, lt

//     this.query = this.query.find(JSON.parse(queryStr));
//     return this;
//   }

//   sort() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       //console.log(sortBy);
//       this.query = this.query.sort(sortBy);
//       // sort('price ratingsAverage')
//     } else {
//       this.query = this.query.sort('-createdAt');
//     }
//     return this;
//   }

//   limitFields() {
//     if (this.queryString.fields) {
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v');
//     }
//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 100;
//     const skip = (page - 1) * limit;

//     // page=2&limit=10, 1-10 page 1, 11-20 page2, 21-30 page3 .....
//     this.query = this.query.skip(skip).limit(limit);
//     return this;

//     // if (this.queryString.page) {
//     //   const numTours = await Tour.countDocuments();
//     //   if (skip >= numTours) throw new Error('This page does not exit');
//     // }
//   }
// }
// module.exports = APIFeatures;

// // alternative

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
