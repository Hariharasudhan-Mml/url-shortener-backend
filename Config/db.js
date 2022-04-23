const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected at  ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
