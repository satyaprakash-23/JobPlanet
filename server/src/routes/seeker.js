const express = require("express");
const seekerRoute = express.Router();
const seekerAuth = require("../middlewares/seekerAuth");
const validateSeekerPatchData = require("../utils/validateSeekerPatchData");
const {uploadPdfOnCloudinary,uploadOnCloudinary}  = require("../utils/cloudinary")
const upload = require("../middlewares/multer.middleware")

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
  try {
    validateSeekerPatchData(req.body);
    const loggedInSeeker = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInSeeker[key] = req.body[key];
    });
    await loggedInSeeker.save();
    res.json({ message: "Profile updated successfully", loggedInSeeker });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

seekerRoute.patch("/seeker/profile",seekerAuth,upload("profile"),async(req,res)=>{
  try{
    if(!req.file){
      throw new Error("there's no image url")
    }
    uploadOnCloudinary(req.file.path)
    res.json({message : "profile image updated successfully"})
  }
  catch(err){
    res.status(400).json({error : err.message})
  }
})







module.exports = seekerRoute;
