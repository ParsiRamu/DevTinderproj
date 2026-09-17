const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");
const user = require("../models/user.js");

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
      throw new Error("Invalid Edit Request");
    }

    const loggedInuser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));

    await loggedInuser.save();
    res.send({message:`${loggedInuser.firstName} your profile upated sucessfully!`,data:loggedInuser});
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

module.exports = profileRouter;
