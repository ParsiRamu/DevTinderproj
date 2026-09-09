const express = require("express");

const app = express();


app.use("/user",[(req,res,next)=>{////app.use("/route",[rh1,rh2,rh3,rh4])
  console.log("This was the response 1")
  // res.send("Response1!")
  next()
  
},(req,res,next)=>{
  console.log("this was the response 2")
  // res.send("Response2!")
  next()
 
},(req,res,next)=>{
  console.log("this was the response 3")
   next();
  res.send("Response3!")
   
  }])

app.listen(7777, () => {
  console.log("Server running Sucessfully on port 7777");
});
