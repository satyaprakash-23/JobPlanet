const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator = require("../utils/emailValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const recruiterSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: 25,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!/^[A-Za-z\s.'-]+$/.test(value)) {
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
    maxLength: 100,
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
  refreshToken: {
    type: String,
  },
});

recruiterSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

recruiterSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

recruiterSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

recruiterSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
