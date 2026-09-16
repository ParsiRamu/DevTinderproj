const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try{
    const {token} = req.cookies;
  if(!token){
    throw new Error("Invalid Token")
  }
  const decodedobj = await jwt.verify(token, "Dev@Tinder7");

  const {_id} = decodedobj;

  const user = await User.findById(_id)
  if(!user){
    throw new Error("User Not found")
  }
  req.user = user
  next()
  }
  catch(err){
    res.status(400).send("ERROR:"+err.message)
  }
  
}


module.exports = {userAuth}