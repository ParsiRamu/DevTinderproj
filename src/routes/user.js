const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      touserId: loggedInuser._id,
    }).populate("fromuserId", "firstName lastName");
    res.json({ message: "user requests", connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
