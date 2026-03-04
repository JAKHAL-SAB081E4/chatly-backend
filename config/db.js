import mongoose from "mongoose";

 const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://shokinkhan244_db_user:SHAUKEEN%40123@cluster0.yghlfzd.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}

export default connectDB;
