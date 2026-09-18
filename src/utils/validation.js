const validator = require("validator");
const validateSignup = (req) => {
  const { firstName, lastName, emailId, passWord } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is Not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter the valid EmailID");
  } else if (!validator.isStrongPassword(passWord)) {
    throw new Error("Enter the Strong Password");
  }
};

const validateEditProfileData = (req) => {
  const isAllowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    isAllowedEditFields.includes(field),
  );

  return isAllowed;
};

module.exports = { validateSignup, validateEditProfileData };
