const emailValidator = require("./emailValidator");

const seekerSignupValidation = ({ fullName, email, password, phoneNumber, profile}) => {
  if (!email || !password || !fullName || !profile) {
    throw new Error(
      "fullName . email , profile and password are required field"
    );
  }
  if (!/^[A-Za-z\.-]+$/.test(fullName)) {
    throw new Error("name should only contails letters ");
  }
  if (!emailValidator(email)) {
    throw new Error("Enter the valid email");
  }
  if (!/^[0-9]{10}$/.test(phoneNumber)) {
    throw new Error("Phone should contain digits only");
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
  

};

module.exports = seekerSignupValidation;