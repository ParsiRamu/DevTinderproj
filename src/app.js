const express = require("express");


const app = express();

const {userAuth ,adminAuth} = require("./Middlewares/auth")




app.use("/admin",adminAuth)

app.use("/user",userAuth,(req,res,next)=>{
    console.log("this was te users path")
    res.send("Valid User Authentication")
    next()})

app.use("/admin/getAllData",(req,res)=>{
  console.log("This belongs to the GetAll Data")
  res.send(" User Data sent")
})
app.use("/admin/deleteAllData",(req,res)=>{
  console.log("This belongs to the Delete the data")
  res.send("Delete User")
})

app.listen(7777, () => {
  console.log("Server running Sucessfully on port 7777");
});
