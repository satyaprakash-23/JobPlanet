const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiter.model");

const recruiterAuth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    console.log(accessToken);
    
    if (!accessToken) {
      throw new Error("There is no access Token");
    }
    const decodedData = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(decodedData);
    
    if (!decodedData) { //dont need to check explicitly as jwt.verify will throw an error if token was not verified
      throw new Error("Token is not valid");
    }
    const recruiter = await Recruiter.findById(decodedData._id).select(
      "-password -refreshToken"
    );
    console.log(recruiter);
    
    if (!recruiter) {
      throw new Error("Recruiter not found");
    }
    req.recruiter = recruiter;

    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};


module.exports = recruiterAuth;