const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const Workspace=require("../models/Workspace");

exports.register=async(req,res)=>{
 try {
    const {name,email,password,workspaceName}=req.body;

    if(!name|| !email||!password || !workspaceName){
     return res.status(400).json({message:"All fields are required"});
    }

    //check is user already exits
    const userExits=await User.findOne({email});
    if(userExits){
        return res.status(409).json({message:"User already exits"});
    }

    //create workspace first
    const workspace= await Workspace.create({name:workspaceName});

    //hash password
    const hashPassword=await bcrypt.hash(password,10);

    //create user
    const user=await User.create({
        name,
        email,
        password:hashPassword,
        role:"admin",
        workspaceId:workspace._id,
    })
    //set owner of workspace
    workspace.ownerId=user._id;
    await workspace.save();

    return res.status(201).json({message:"Admin register succesfully"});
 } catch (error) {
    console.log(error);
    res.status(500).json({message:"Registeration failed"});
 }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }

        //check user
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"User does not exits"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        //create jwt token
        const token=jwt.sign(
            {
            userId:user._id,
            role:user.role,
            workspaceId:user.workspaceId
            },
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        );

        return res.json({
          meassage:"Sucessfully Login",
          token,
          user:{
            name:user.name,
            email:user.email,
            role:user.role,
          },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Login failed"})
    }
};

