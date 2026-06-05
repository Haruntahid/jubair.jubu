import type { Request, Response } from "express";
import { createApp } from "../server/app.js";

let appPromise: Promise<Awaited<ReturnType<typeof createApp>>> | null = null;

async function getApp() {
  if (!appPromise) {
    console.log("🚀 Initializing Vercel API app...");
    appPromise = createApp();
  }

  try {
    const { app } = await appPromise;
    return app;
  } catch (error) {
    appPromise = null;
    console.error("❌ Failed to initialize Vercel API app:", error);
    throw error;
  }
}

export default async function handler(req: Request, res: Response) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error("❌ Request handler error:", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Failed to initialize app",
      details,
    });
  }
}
