// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {

//   await mongoose.connect(process.env.MONGODB_URL);

// };

// module.exports = connectDB;

const mongoose = require("mongoose");
const dns = require("node:dns");

// require("dotenv").config();

// Tell Node.js to use public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  console.log("MongoDB URL exists:", !!process.env.MONGODB_URL);

  // console.log("MongoDB host:", process.env.MONGODB_URL?.split("@")[1]);

  await mongoose.connect(process.env.MONGODB_URL);

  // console.log("MongoDB connected successfully");
};

module.exports = connectDB;
