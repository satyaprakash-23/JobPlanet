const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailValidator = require("../utils/emailValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const seekerSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 2,
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
  refreshToken: {
    type: String,
  },
  collegeName: {
    type: String,
    lowercase: true,
    trim: true,
    maxLength: 200,
    validate(value) {
      if (!/^[A-Za-z0-9\s.]+$/.test(value)) {
        throw new Error("College name must contain character and number only");
      }
    },
  },
  passingYear: {
    type: Number,
  },
});

seekerSchema.index(
  { phoneNumber: 1 }, // index key pattern
  {
    unique: true,
    partialFilterExpression: { phoneNumber: { $exists: true, $ne: null } },
  } // options
);

//the .pre("save") middleware will run when saving the data for the first time (during document creation) as well as on subsequent updates.
seekerSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

seekerSchema.methods.isPasswordCorrect = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

seekerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      phoneNumber: this.phoneNumber,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

seekerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const Seeker = mongoose.model("Seeker", seekerSchema);

module.exports = Seeker;
