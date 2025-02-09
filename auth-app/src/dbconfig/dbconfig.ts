import mongoose from "mongoose";

// Connect to MongoDB
export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        //checking the errors
        connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });
        console.log("Connected to MongoDB!");
        // connection event to log when the connection is established
        connection.on("connection", ()=>{
            console.log("MongoDB connected successfully.");
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}