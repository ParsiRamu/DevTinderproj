const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomid = (userId, targetUserid) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserid].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName,  userId, targetUserid }) => {
      const roomId = getSecretRoomid(userId, targetUserid);
      console.log(firstName + " joined Room:  " + roomId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, lastName,userId, targetUserid, text }) => {
        try {
          const roomId = getSecretRoomid(userId, targetUserid);
          console.log(firstName + " " + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserid] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserid],
              messages: [],
            });
          }

          chat.messages.push({ senderId: userId, text });

          await chat.save();
          io.to(roomId).emit("messageRecieved", { firstName,lastName, text });
        } catch (err) {
          console.err(err.message);
        }
      },
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
