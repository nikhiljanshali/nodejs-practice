import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoDB";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Do not exit, allow server to start without DB
  }
}

export default connectToDatabase;