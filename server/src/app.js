const express = require("express");
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");


const {uploadOnCloudinary} =  require("./utils/cloudinary.js")
const authRoute = require("./routes/auth.js")
const seekerRoute = require("./routes/seeker.js")


const app = express();

// Enable CORS middleware
app.use(cors());
app.use(cookieParser());

// JSON body parser middleware
app.use(express.json());

// File upload route
// app.post("/profile", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded");
//   }
  
//   console.log("File details:", req.file);
//   console.log("Form data:", req.body);
//   console.log(req.path);
  
//   uploadOnCloudinary(req.file.path)
  
//   // Send back file information to client
//   res.json(req.file);
// });

app.use("/",authRoute)
app.use("/",seekerRoute)

// Start server after connecting to database
connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database is not connected successfully " + err.message);
  });