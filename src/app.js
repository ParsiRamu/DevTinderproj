const express = require("express");

const app = express();


app.use("/hai",(req,res)=>{
    res.send("Hello Text")
    
})

app.use("/test", (req, res) => {
    res.send("This was the Test Path");
});

app.use("/", (req, res) => {
  res.send("Hello World Welcome to the server");
});

app.listen(7777, () => {
  console.log("Server running Sucessfully on port 7777");
});
