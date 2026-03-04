import express from "express";
import mongoose from "mongoose";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY
});

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.post("/api/chat", async(req,res)=>{
    try{
        const {message}=req.body;
        
        const response = await openai.chat.completions.create({
           model: "gpt-4o-mini", // affordable & fast
        messages: [
           { role: "system", content: "You are a helpful assistant." },
           { role: "user", content: message }
           ],
        });

    res.json({
      reply: response.choices[0].message.content,
    });

    }catch(error){
        console.log("REAL BACKEND ERROR:");
        console.log(error.response?.data || error.message);
        res.status(500).json({error:'API error'});
    }
})
    
app.listen(5000,()=>console.log("Server running on port 5000"));