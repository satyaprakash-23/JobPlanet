
const express = require("express");
const recruiterRoute = express.Router()
const Recruiter = require("../models/recruiter.model")
const Job = require("../models/job.model")
const recruiterAuth = require("../middlewares/recruiterAuth")

const validateRecruiterPatchData = require("")


recruiterRoute.get("/recruiter/profile",recruiterAuth , async(req,res)=>{
    try{
        const recruiter = req.recruiter;
        res.json({message : "profile fetched successfully !! ", recruiter : req.recruiter})

    }
    catch(err){
        res.status(400).json({error :  err.message})
    }
})




module.exports = recruiterRoute