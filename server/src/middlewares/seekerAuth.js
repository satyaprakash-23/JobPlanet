const jwt = require("jsonwebtoken");
const Seeker = require("../models/seeker.model");

const seekerAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    
    const {accessToken} = req.cookies;
    if (!accessToken) {
      throw new Error("Access token missing");
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const seeker = await Seeker.findById(decoded?._id).select(
      "-password -refreshToken"
    );
    if (!seeker) {
      throw new Error("Invalid Seeker");
    }
    req.seeker = seeker;
    next();
  } catch (err) {
    res.status(401).json({error : err.message})
  }
};

module.exports = seekerAuth;
