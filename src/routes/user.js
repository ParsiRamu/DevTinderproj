const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_PUB_DATA = "firstName lastName gender skills about";
const User = require("../models/user");

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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromuserId: loggedInUser._id }, { touserId: loggedInUser._id }],
    }).select("fromuserId touserId");

    const hideUserfromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserfromFeed.add(req.fromuserId.toString());
      hideUserfromFeed.add(req.touserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserfromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_PUB_DATA)
      .skip(skip)
      .limit(limit);

    res.json(users);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
