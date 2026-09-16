const express = require("express");

const app = express();
const connectDB = require("./Config/database.js");
const User = require("./models/user.js");
const { validateSignup } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./Middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

//Get the User Profie for Cookies
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User Does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// POST THE DATA FROM THE ENDUSER/POSTMAN
app.post("/signup", async (req, res) => {
  try {
    //Validation
    validateSignup(req);

    //Encrpt the password
    const { firstName, lastName, emailId, passWord } = req.body;
    const passWordHash = await bcrypt.hash(passWord, 10);
    console.log(passWordHash);

    // console.log(req.body)
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: passWordHash,
    });

    await user.save();
    res.send("User Data Added Sucessfully");
  } catch (err) {
    // console.log(err)
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (isPasswordValid) {
      //Create A JWT token
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder7", {
        expiresIn: '1d'
      });

      //Add the token to cookies and send the response back to the user
      res.cookie("token", token, {
        maxAge: 8 * 60 * 60 * 10000
      });
      console.log(token)
      res.send("User Login Sucessfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
app.post("/sendConnectionrequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending the connection Request");

  res.send(user.firstName + " sent a connection Request");
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
