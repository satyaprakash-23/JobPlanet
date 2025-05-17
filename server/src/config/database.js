const mongoose = require("mongoose")
require('dotenv').config();

// console.log(process.env.MONGODB_URI);

const connectDB = async ()=>{
    console.log("hello");
    
    await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectDB;

