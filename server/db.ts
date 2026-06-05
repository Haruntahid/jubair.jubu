import mongoose from "mongoose";

const DEFAULT_LOCAL_URI = "mongodb://127.0.0.1:27017/qaportfolio";
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_LOCAL_URI;

let connectionPromise: Promise<typeof mongoose> | null = null;

mongoose.set("bufferCommands", false);

export async function connectDB(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in production environment");
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 10000,
        family: 4,
      });
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
