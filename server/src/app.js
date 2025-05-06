const express = require("express");
const app = express();
const connectDB = require("./config/database");

app.use("/satya/prakash", (req, res) => {
  res.send("hello from mars");
});

connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(7777, () => {
      console.log("server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("DataBase is not connected successfully " + err.message);
  });
