import mongoose from "mongoose";

const MONGO_URI=process.env.MONGO_URL;
let isConnected=false;

export async function connectDb() {
    try {
        if(isConnected){
            console.log("DB already connected");
            return;
        }

        const db=await mongoose.connect(MONGO_URI);
       isConnected= db.connections[0].readyState===1;
    console.log("mongo db connect");
    } catch (error) {
        console.error("Error in mongoDb",error);
      throw error;
    }
    
}