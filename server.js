import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.post("/api/chat", async(req,res)=>{
    try{
        const {message}=req.body;
        
        const response=await axios.post(
            process.env.API_URL,
            {
                messages:[{role:"user",content :message}]
            },
        );
        const reply=response.data;
        res.json({reply});

    }catch(error){
        console.log("REAL BACKEND ERROR:");
        console.log(error.response?.data || error.message);
        res.status(500).json({error:'API error'});
    }
})

app.listen(5000,()=>console.log("Server running on port 5000"));