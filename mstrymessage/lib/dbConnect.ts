import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {}

// Connect to MongoDB
async function dbConnect(): Promise<void> {
  if (connection.isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {});
    console.log("Connected to MongoDB!");
    connection.isConnected = 1;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
    console.error("MongoDB connection failed");
  }
}

export default dbConnect;