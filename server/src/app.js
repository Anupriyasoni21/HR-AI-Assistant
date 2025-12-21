const express=require("express");
const cors=require("cors");

const app=express();

//middleware
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("app is working");
});

module.exports=app;