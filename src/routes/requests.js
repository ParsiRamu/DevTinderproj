const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      const fromuserId = req.user._id;
      const touserId = req.params.touserId;
      const status = req.params.status;
      //Request belogs to only sender(interested/ignored)
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send({ message: "Cannot valid StatusType" });
      }
      //Validate the outside-randomn user
      const touser = await User.findById(touserId);
      if (!touser) {
        return res.status(400).json({ message: "User Not Found!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromuserId,
        touserId,
        status,
      });
      //  Handle to send the request between sender and receiver...only one could send the request between those...
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromuserId,
            touserId,
          },
          {
            fromuserId: touserId,
            touserId: fromuserId,
          },
        ],
      });
      //Handle Multiple Same Requests and Handle sending the request to the same user
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request Already exists!" });
      }

      const data = await connectionRequest.save();

      res.send({
        message:
          req.user.firstName + " is " + status + " - " + touser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({ message: "Status Not Allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        touserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request Not Found!" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.send({ message: `Connection Request Accepted!`, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

module.exports = requestRouter;
