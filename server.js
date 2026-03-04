import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());


app.get("/api/chat", async (req, res) => {
  try {
    const { query } = req.query;   // 👈 GET uses query

    const response = await axios.get(
      `https://text.pollination.ai/${encodeURIComponent(query)}`,{timeout:10000}
    );

      res.status(200).json({
        message:response.data
      });
   

    }catch(error){
        console.log("REAL BACKEND ERROR:");
        console.log(error.response?.data || error.message);
        res.status(500).json({error:'API error'});
    }
})
    
app.listen(5000,()=>console.log("Server running on port 5000"));