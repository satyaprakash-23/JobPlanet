const express = require("express");
const seekerRoute = express.Router();
const seekerAuth = require("../middlewares/seekerAuth");
const validateSeekerPatchData = require("../utils/validateSeekerPatchData");
const {
  uploadPdfOnCloudinary,
  uploadOnCloudinary,
} = require("../utils/cloudinary");
const upload = require("../middlewares/multer.middleware");

seekerRoute.get("/seeker/profile", seekerAuth, async (req, res) => {
  const loggedInSeeker = req.seeker;
  console.log("hey");

  try {
    res.json({ message: "profile fetched successfully", loggedInSeeker });
  } catch (err) {
    res.status(401).json({ error: "can't fetch the data " + err.message });
  }
});

seekerRoute.patch("/seeker/data", seekerAuth, async (req, res) => {
  console.log("hey 3:47");

  try {
    validateSeekerPatchData(req.body);
    const loggedInSeeker = req.seeker;
    // console.log(loggedInSeeker);

    Object.keys(req.body).forEach((key) => {
      // console.log(req.body[key] + "testing");
      loggedInSeeker[key] = req.body[key];
      // console.log(key);
      // console.log(loggedInSeeker[key]);
    });
    await loggedInSeeker.save();
    res.json({ message: "Profile updated successfully", loggedInSeeker });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seekerRoute.patch(
  "/seeker/profile",
  seekerAuth,
  upload.single("profile"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("there's no image url");
      }
      const response = await uploadOnCloudinary(req.file.path);
      console.log(response?.secure_url);
      const loggedInSeeker = req.seeker;
      loggedInSeeker.profile = response?.secure_url;
      await loggedInSeeker.save();
      res.json({
        message: "profile image updated successfully",
        path: req.file.path,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

seekerRoute.patch(
  "/seeker/resume",
  seekerAuth,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("there's no file url");
      }
      const response = await uploadPdfOnCloudinary(req.file.path);
      const loggedInSeeker = req.seeker;
      loggedInSeeker.resume = response?.secure_url;
      await loggedInSeeker.save();
      res.json({
        message: "Resume updated successfully",
        resume: loggedInSeeker.resume,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = seekerRoute;
