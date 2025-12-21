const mongoose=require("mongoose");

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connect to ${conn.connection.host}`);
    } catch (error) {
        console.error("Mongodb connection failed",error.message);
        process.exit(1);
    }
};

module.exports=connectDb;