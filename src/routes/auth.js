const express = require("express");
const User = require("../models/user");
const { ValidateSignupp } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    ValidateSignupp(req);
    const { firstName, lastName, emailId, passWord } = req.body;

    const passwordHash = await bcrypt.hash(passWord, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passwordHash,
    });

    await user.save();
    res.send("user Added Sucessfully!");
  } catch (err) {
    res.status(400).send(`ERROR:${err.message}`);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Please signup again!");
    }
    const isPasswordValid = await user.validatePassword(passWord);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("User Login SucessFully!!");
    } else {
      throw new Error("Invalid User");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User Logout Sucessfully!!");
});

module.exports = authRouter;
