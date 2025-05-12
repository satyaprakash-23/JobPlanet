const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator = require("../utils/emailValidator");

const seekerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
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
        throw new Error("Invalid phone number");
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
  age: {
    type: Number,
    min: [18, "to young for this platform"],
    max: 100,
  },
  profile: {
    type: String, //cloudinary url
    required: true,
  },
  resume: {
    type: String, //cloudinary url
  },
  skills: {
    type: [String],
    validate(value) {
      if (value.length > 10) {
        throw new Error("You can add maximum 10 skills");
      }
    },
  },
  bio: {
    type: String,
    maxLength: 200,
  },
});

const Seeker = mongoose.model("Seeker", seekerSchema);

module.exports = Seeker;
