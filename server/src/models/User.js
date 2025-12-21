const mongoose=require("mongoose");

const User= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:["admin","employee"],
        default:"employee"
    },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },//worspaceid tell user belong to which company 
    
},

{timespan:true}
);