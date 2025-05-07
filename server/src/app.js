const express = require("express");
const multer = require("multer");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Creating a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Enable CORS middleware
app.use(cors());

// JSON body parser middleware
app.use(express.json());

// File upload route
app.post("/profile", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  
  console.log("File details:", req.file);
  console.log("Form data:", req.body);
  
  // Send back file information to client
  res.json({
    message: "File uploaded successfully",
    fileDetails: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
});

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