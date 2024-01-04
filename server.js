// // eslint-disable-next-line prettier/prettier
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
// const app = require('./app');



// const DB = process.env.DATABASE1.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );
// mongoose
//   //.connect(process.env.DATABASE_LOCAL1, {
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     bufferMaxEntries: 0, // Default is 1000, set to 0 to disable buffering
//     bufferCommands: false, // Disable buffering of commands
//     serverSelectionTimeoutMS: 5000,
//   })
//   .then(() => console.log('DB connection successful!'));

// // const testTour = new Tour({
// //   name: 'The college Explorer',
// //   price: 497,
// // });

// // testTour
// //   .save()
// //   .then((doc) => {
// //     console.log(doc);
// //   })
// //   .catch((err) => {
// //     console.log('ERROR:', err);
// //   });
// //console.log(process.env):
// const port = process.env.PORT || 3100;
// app.listen(port, () => {
//   console.log(`App running on port no ${port}...`);
// });

//alternative

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE1.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    bufferMaxEntries: 0, 
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
    
  })
  .then(() => console.log('DB connection successful!'));
// const port = 2000
const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
