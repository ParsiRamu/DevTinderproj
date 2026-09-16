const express = require("express");

const app = express();
const connectDB = require("./Config/database.js");
const authRouter = require("./routes/auth.js")
const profileRouter  = require("./routes/profile.js")
const requestRouter = require("./routes/requests.js")


const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

 



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
