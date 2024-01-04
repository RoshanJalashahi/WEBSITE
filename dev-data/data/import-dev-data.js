const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');
//const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE1.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  //.connect(process.env.DATABASE_LOCAL1, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILEconst
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA TO THE DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
