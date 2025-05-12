const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  recruiterId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Recruiter",
  },
  name: {
    type: String,
    required: true,
    maxLength: 25,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!/^[A-Za-z]+$/.test(value)) {
        throw new Error("Name should contain only letters");
      }
    },
  },
  logo: {
    type: String, //cloudinary url
    required: true,
  },
  description: {
    type: String,
    validate(value) {
      if (value.length > 200) {
        throw new Error("200 characters allowed");
      }
    },
  },
  location: {
    type: String,
    required: true,
    maxLength: 200,
  },
  website: {
    type: String,
    required: true,
    maxLength: 100,
  },
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company
