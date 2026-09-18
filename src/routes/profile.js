const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User Does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName}! you profile updated Sucessfully!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

profileRouter.patch("/profile/editpassword", userAuth, async (req, res) => {
  try {
    // const user = req.user;
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user does not exist!");
    }
    const passwordHash = await bcrypt.hash(passWord, 10);

    const isloggedInuser = req.user; 
    isloggedInuser.passWord = passwordHash;
    // console.log(passwordHash)
    // console.log(isloggedInuser);

    await isloggedInuser.save();

    res.send("User Password sucessfully Updated!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
