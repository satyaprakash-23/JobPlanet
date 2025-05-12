const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator  = require("../utils/emailValidator");


const recruiterSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate(value) {
      if (!emailValidator(value)) {
        throw new Error("Enter valid emailID");
      }
    },
    set: (value) => {
      value = value.toLowerCase();
      return value;
    },
  },

  phoneNumber: {
    type: String,
    unique: true,
    validate(value) {
      if (!/^[0-9]{10}$/.test(value)) {
        throw new Error("Phone number must be 10 digits");
      }
    },
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 30,
    validate(value) {
      if (
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
    },
  },
  profile: {
    type: String, //cloudinary url
    required: true,
  },
});

const Recruiter = mongoose.model("Recruiter",recruiterSchema)

module.exports = Recruiter