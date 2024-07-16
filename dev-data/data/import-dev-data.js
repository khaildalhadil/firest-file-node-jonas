const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

dotenv.config({ path: './../../config.env'});


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
console.log(DB)

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))

// // Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// mport data to db
const importData = async () => {
  try{
    await Tour.create(tours);
    console.log('Data successfully loaded')
    process.exit()
  }catch(err) {
    console.log(err)
  }
}

// Deletee all data from DB
const deleteData = async () => {
  try{
    await Tour.deleteMany();
    console.log('Data successfully deleted')
    process.exit()
  }catch(err) {
    console.log(err)
  }
}

if (process.argv[2] === '--import') {
  importData();
} else {
  deleteData(); 
}


console.log(process.argv)
