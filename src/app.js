const express = require("express");

const app = express();
const connectDB = require("./Config/database.js");
const User = require("./models/user.js");

app.use(express.json()) 
app.post("/signup", async (req, res) => {
  console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Data Added Sucessfully");
  } catch (err) {
    res.status(401).send("Error Saving the users Data");

  }
});

connectDB() 
  .then(() => {
    console.log("Database Connection is Established");
    app.listen(7777, () => {
      console.log("Server running Sucessfully on port 7777");
    });
  })
  .catch((err) => {
    console.log("DataBase is not connected");
  });
