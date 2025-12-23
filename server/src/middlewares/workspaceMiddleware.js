
const workspaceMiddleware=(req,res,next)=>{
  if(!req.user || !req.user.workspaceId){
    return res.status(403).json({message:"Workspace context missing"});
  }
  
   // Force controllers to use this
  req.workspaceId=req.user.workspaceId;
  next();
}

module.exports=workspaceMiddleware;