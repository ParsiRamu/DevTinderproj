const express = require("express");
const { userAuth } = require("../Middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js")

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:touserId", userAuth, async (req, res) => {
  
     try{
      const fromuserId = req.user._id;
      const touserId = req.params.touserId
      const status = req.params.status

      const connectionRequest  = new ConnectionRequest({
        fromuserId,touserId,status
      });

      const data = await connectionRequest.save()

      res.send({message:`Connection request sent sucessfully!`,data})

     }
     catch(err){

     }


 
});

module.exports = requestRouter;
