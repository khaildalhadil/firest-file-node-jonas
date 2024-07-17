const mongoose = require('mongoose');
const dotenv = require('dotenv');

// we need to but it here in the top 
process.on('uncaughtException', (err) => {
  console.log(`uncaughtException⭕ `, err.name, err.message);
  console.log('UNHANDLER REJECTION 💥 Shutting down...');
  process.exit(1);
})

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
  
  
  
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listen in port ${port}...`));

process.on('unhandledRejection', err => {
  console.log(`unhandleRejectiong⭕`, err.name, err.message);
  console.log('UNHANDLER REJECTION 💥 Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})