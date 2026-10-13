const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserid", userAuth, async (req, res) => {
  try {
    const { targetUserid } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserid] },
    }).populate({
      path: "messages.senderId",
      select: " firstName lastName",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserid],
        messages: [],
      });
      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = chatRouter;
