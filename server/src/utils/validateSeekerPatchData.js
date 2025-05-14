const validateSeekerPatchData = (req) => {
  const allowedUpdate = [
    "fullName",
    "phoneNumber",
    "age",
    "skills",
    "bio",
    "collegeName",
    "passingYear",
  ];

  const keys = Object.keys(req.body);
  const isUpdateValid = keys.every((key) => allowedUpdate.includes(key));

  if (!isUpdateValid) {
    throw new Error("Invalid Edit Request: contains fields not allowed.");
  }

  const {
    fullName,
    phoneNumber,
    age,
    skills = [],
    bio,
    collegeName,
  } = req.body;

  if (fullName && !/^[A-Za-z\s.'-]+$/.test(fullName)) {
    throw new Error(
      "Full name should only contain letters and valid characters."
    );
  }

  if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
    throw new Error("Phone number must be exactly 10 digits.");
  }

  if (age && (age < 18 || age > 100)) {
    throw new Error("Age must be between 18 and 100.");
  }

  if (skills && skills.length > 10) {
    throw new Error("You can add a maximum of 10 skills.");
  }

  if (bio && bio.length > 200) {
    throw new Error("Bio must be at most 200 characters.");
  }

  if (collegeName && collegeName.length > 200) {
    throw new Error("College name must be at most 200 characters.");
  }
};

module.exports = validateSeekerPatchData;
