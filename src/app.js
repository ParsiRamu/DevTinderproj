const express = require("express");

const app = express();

// const { userAuth, adminAuth } = require("./Middlewares/auth");
app.use("/",(err,req,res,next)=>{
  if (err){
    res.status(500).send("SomeThing Went Wrong")
  }
})
// app.use("/admin",(req,res)=>{
//   res.send("Admin Panell")
// })

app.use("/user",(req,res,next)=>{
  throw new Error("inbinbinbinb")
   res.send("This was the UsersDATA")
  // try{
  //   throw new Error("dvnvnnv")
  //   res.send("users Data")
  // }catch(err){
  //   res.status(500).send("Something error, contact the support")
  // }

})
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("SomeThing Went Wrong");
//   }
// });


app.listen(7777, () => {
  console.log("Server running Sucessfully on port 7777");
});
