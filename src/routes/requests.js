const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionrequest", userAuth, async (req, res) => {
  const user = req.user;
//   console.log("Sending the connection Request");

  res.send(user.firstName + " sent a connection Request");
});

module.exports = requestRouter;
