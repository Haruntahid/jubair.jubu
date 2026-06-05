import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/qaportfolio";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(MONGODB_URI);
    }

    await connectionPromise;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    connectionPromise = null;
    throw error;
  }
}

export default mongoose;
