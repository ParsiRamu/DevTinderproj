const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Is Not Validd");
        }
      },
    },
    passWord: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter the Strong Password");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender Is Not Valid");
        }
      },
    },
    age: {
      type: Number,
    },
    about: {
      type: String,
      default: "This is about the user",
    },
    skills: {
      type: [String],
    },
    bloodGroup: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ firstName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder790", {
    expiresIn: "9d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByuser) {
  const user = this;
  const passwordHash = user.passWord;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByuser,
    passwordHash,
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
