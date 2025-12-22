const express=require("express");
const cors=require("cors");

const authRoutes = require("./routes/authroutes");

const app=express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);


app.get("/",(req,res)=>{
    res.send("app is working");
});

module.exports=app;