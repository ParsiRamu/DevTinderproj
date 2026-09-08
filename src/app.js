const express = require("express");

const app = express();


app.get("/user",(req,res)=>{
  res.send({firstNmae:"RamuParsi",LastName:"KTP"})
})
app.post("/user",(req,res)=>{
  res.send("Data Sended SucessFully")
})
app.delete("/user",(req,res)=>{
  res.send("Data Deleted SucessFully")
})
app.put("/user",(req,res)=>{
  res.send("Data Updated Sucessfully")
})

app.use("/test", (req, res) => {
    res.send("This was the Test Path");
});


app.listen(7777, () => {
  console.log("Server running Sucessfully on port 7777");
});
