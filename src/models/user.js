

const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    passWord:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    }
});

module.exports = mongoose.model("User",userSchema);
