const express = require("express");
const User = require("../models/user");
const { validateSignup } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation
    validateSignup(req);

    //Encrpt the password
    const { firstName, lastName, emailId, passWord } = req.body;
    const passWordHash = await bcrypt.hash(passWord, 10);
    // console.log(passWordHash);

    // console.log(req.body)
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passWordHash,
    });

    await user.save();
    res.send("User Data Added Sucessfully");
  } catch (err) {
    // console.log(err)
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(passWord);
    if (isPasswordValid) {
      //Create A JWT token
      const token = await user.getJWT();

      res.cookie("token", token, {
        maxAge: 8 * 60 * 60 * 10000,
      });
      // console.log(token);
      res.send("User Login Sucessfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout SucessFull!!");
});

module.exports = authRouter;
