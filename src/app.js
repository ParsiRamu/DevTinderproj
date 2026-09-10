const express = require("express");
const connectDB = require("./Config/database.js");

const app = express();
const User = require("./models/user.js");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Jamun",
    lastName: "bhamir",
    emailId: "jbr@sample.com",
    passWord: "jbr@123",
  });
  try {
    await user.save();
    res.send("User Data Aded Sucessfully");
  } catch (err) {
    res.status(401).send("Error Saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(7777, () => {
      console.log("Server running Sucessfully on port 7777");
    });
  })

  .catch((err) => {
    console.error("Database Cannot be connected!!");
  });
