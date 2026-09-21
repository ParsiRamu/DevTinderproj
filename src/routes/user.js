const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_PUB_DATA = "firstName lastName gender skills about";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      touserId: loggedInuser._id,
    }).populate("fromuserId", USER_PUB_DATA);
    res.json({ message: "user requests", connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          touserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromuserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromuserId", USER_PUB_DATA)
      .populate("touserId", USER_PUB_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromuserId._id.toString() == loggedInUser._id.toString()) {
        return row.touserId;
      }
      return row.fromuserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
