const express = require("express");
const seekerRoute = express.Router();
const seekerAuth = require("../middlewares/seekerAuth");

seekerRoute.get("/seeker/profile", seekerAuth, async (req, res) => {
  const loggedInSeeker = req.seeker;
  try {
    res.json({ message: "profile fetched successfully", loggedInSeeker });
  } catch (err) {
    res.status(401).json({ error: "can't fetch the data " + err.message });
  }
});



module.exports = seekerAuth