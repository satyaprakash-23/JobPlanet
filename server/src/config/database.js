const mongoose = require("mongoose")
require('dotenv').config();
// const uri = "mongodb+srv://SatyaPrakash:KxPUchakBm3QwjUW@cluster0.wwwqpnc.mongodb.net/jobPlanet?retryWrites=true&w=majority&appName=Cluster0";
console.log(process.env.MONGODB_URI);

const connectDB = async ()=>{
    console.log("hello");
    
    await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectDB;