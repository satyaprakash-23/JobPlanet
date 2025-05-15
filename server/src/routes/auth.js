const express = require("express");
const authRoute = express.Router();
const Seeker = require("../models/seeker.model");
const Recruiter = require("../models/recruiter.model");
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

authRoute.post(
  "/signup/recruiter",
  upload.single("profile"),
  async (req, res) => {
    const { fullName, email, phoneNumber, password, profile } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Profile image is required" });
      }
      const profilePath = req.file.path;
      const cloudinaryUrl = await uploadOnCloudinary(profilePath);
      const data = new Recruiter({
        fullName,
        email,
        phoneNumber,
        password,
        profile: cloudinaryUrl.secure_url,
      });
      const accessToken = data.generateAccessToken();
      const refreshToken = data.generateRefreshToken();
      data.refreshToken = refreshToken;
      res.cookie("accessToken", accessToken);
      await data.save();
      res.json({ message: "Recuiter addded successfully", data });
    } catch (err) {
      res.status(400).json({ error: "err.message" });
    }
  }
);

authRoute.post("/login/seeker", async (req, res) => {
  try {
    const { email, password } = req.body;
    const seeker = await Seeker.findOne({ email });
    if (!seeker) {
      throw new Error("Email is not registered");
    }
    const isPasswordCorrect = await seeker.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new Error("Password is not correct");
    }
    const accessToken = seeker.generateAccessToken();
    const refreshToken = seeker.generateRefreshToken();
    seeker.refreshToken = refreshToken;
    await seeker.save();
    res.cookie("accessToken", accessToken);
    res.json({ message: "Seeker logged in successfully", seeker });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRoute.post("/login/recruiter", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Enter the credentials");
    }
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      throw new Error("Enter the correct credentials");
    }
    const isPasswordCorrect = await recruiter.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new Error("Enter the correct credentials");
    }
    const accessToken = recruiter.generateAccessToken();
    const refreshToken = recruiter.generateRefreshToken();
    res.cookie("accessToken", accessToken);
    recruiter.refreshToken = refreshToken;
    await recruiter.save();
    res.json({
      message: `${recruiter.fullName} loggedIn successfully`,
      recruiter,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = authRoute;
