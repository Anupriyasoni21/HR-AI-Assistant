const jwt=require("jsonwebtoken");
const User=require("../models/User");
const Workspace = require("../models/Workspace");

const authMiddleware= async(req,res,next)=>{
   try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided"});
    }

    const token=authHeader.split(" ")[1];
    const decoder=jwt.verify(token,process.env.JWT_SECRET);

    const user=await User.findOne(decoder.userId).select("-password");

    if(!user){
        return res.status(401).json({message:"User not found"});
    }

    req.user={
        userId:user._id,
        role:user.role,
        workspace:user.workspaceId
    };

    next();

   } catch (error) {
    return res.status(500).json({message:"Invalid or expired token"});
   }
}

module.exports = authMiddleware;