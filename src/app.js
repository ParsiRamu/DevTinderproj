const express = require("express");

const app = express();
const connectDB = require("./Config/database.js");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./utils/cronjob.js");
require("./utils/datefns.js")

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connection is Established");
    app.listen(process.env.PORT, () => {
      console.log("Server running Sucessfully on port 7777");
    });
  })
  .catch((err) => {
    console.log("DataBase is not connected");
    console.log(err);
  });
