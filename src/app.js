const express = require("express");

const app = express();
const connectDB = require("./Config/database.js");
const User = require("./models/user.js");

app.use(express.json());
//FIND BY ID AND UPDATE THE USER
app.patch("/user/:userId",async (req,res)=>{
  const userId = req.params?.userId
  const data = req.body
  try{
    const ALLOWED_UPDATES = ["photourl","age","gender","skills","about"]
    const isUpateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpateAllowed){
      throw new Error("Updates are Not Allowed")
    }
    if(data?.skills.length>10){
      throw new Error("Skill not more then 10")
    } 
    const users = await User.findByIdAndUpdate(userId,data,{runValidators:true}) 
    res.send("User Updated Sucessfully")
   }
  catch(err){ 
    res.status(400).send(err.message)
  }
})
//Find By userID and delete
app.delete("/user",async (req,res)=>{
  const userId = req.body.userId
  const data = req.body
  console.log(data)
  const users = await User.findByIdAndDelete(userId,data)
  try{
    if(!users){
      res.status(404).send("User Not Found for deletion")
    }
    else{
      res.send("user Deleted Sucessfully")
    } 
  }
  catch(err){
    res.status(400).send("something Went Wrong")
  }
})

//GET ONE USER OUT OF THE MULTIPLE USERS FROM THE DATABASE ]
app.use("/userone", async (req,res)=>{
  const userMail = req.body.emailId

  const users = await User.findOne({emailId:userMail})
  try{
     if (!users) {
       res.status(404).send("User Not Found with the matches");
     } else {
       res.send(users);
     }

  }catch(err){res.status(400).send("Something went wrong")}
 
})
//GET ALL THE USERS FROM THE DATABASE
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//GET THE USER BY EMAILID
app.get("/user",async (req,res)=>{ 
  const userEmail = req.body.emailId

  const users = await User.find({emailId:userEmail})
  try{
    if(users.length===0){
    res.status(404).send("User Not Found")
  }
   else{
        res.send(users)
     }

  }
  catch(err){
    res.status(400).send("something went Wrong")
  }

})
// POST THE DATA FROM THE ENDUSER/POSTMAN
app.post("/signup", async (req, res) => {
  // console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Data Added Sucessfully");
  } catch (err) {
    // console.log(err)
    res.status(400).send(err.message);

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
