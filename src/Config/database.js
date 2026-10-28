

const mongoose = require("mongoose");
const dns = require("node:dns");

// require("dotenv").confi
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  console.log("MongoDB URL exists:", !!process.env.MONGODB_URL);

 

  await mongoose.connect(process.env.MONGODB_URL);

  
};

module.exports = connectDB;
