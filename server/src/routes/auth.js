const express = require("express");
const authRoute = express.Router();
const Seeker = require("../models/seeker.model");
const upload = require("../middlewares/multer.middleware");
const { uploadOnCloudinary } = require("../utils/cloudinary");

authRoute.post("/signup/seeker", upload.single("profile"), async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    age,
    bio,
    skills,
    collegeName,
    passingYear,
  } = req.body;

  try {
    console.log(req.file);
    const profilePath = req.file.path;
    const cloudinaryUrl = await uploadOnCloudinary(profilePath);

    const data = new Seeker({
      fullName,
      email,
      password,
      phoneNumber,
      age,
      bio,
      skills,
      collegeName,
      passingYear,
      profile: cloudinaryUrl.secure_url,
    });
    data.profile = cloudinaryUrl.secure_url;
    const accessToken = data.generateAccessToken();
    const refreshToken = data.generateRefreshToken();
    data.refreshToken = refreshToken;
    await data.save();
    res.cookie("accessToken", accessToken);
    res.json({ message: "user added successfully", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = authRoute;
