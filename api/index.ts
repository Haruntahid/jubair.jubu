import serverless from "serverless-http";
import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import { connectDB } from "../server/db.js";
import { registerRoutes } from "../server/routes.js";
import { log } from "../server/logger.js";

let cachedHandler: any;

async function getHandler() {
  if (cachedHandler) {
    console.log("♻️ Using cached handler");
    return cachedHandler;
  }

  try {
    console.log("🚀 Initializing serverless app...");

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Request logging
    app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      const path = req.path;
      let capturedJsonResponse: Record<string, any> | undefined = undefined;

      const originalResJson = res.json;
      res.json = function (bodyJson?: any) {
        capturedJsonResponse = bodyJson;
        return originalResJson.call(this, bodyJson);
      };

      res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
          let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
          if (capturedJsonResponse) {
            logLine += ` :: ${JSON.stringify(capturedJsonResponse).slice(
              0,
              30
            )}`;
          }
          log(logLine);
        }
      });

      next();
    });

    // Connect DB
    console.log("🔗 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ MongoDB connected");

    // Register routes
    console.log("📍 Registering routes...");
    await registerRoutes(app);
    console.log("✅ Routes registered");

    // Error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error("❌ Error:", err.message);
      const status = err.status || err.statusCode || 500;
      res
        .status(status)
        .json({ message: err.message || "Internal Server Error" });
    });

    console.log("✅ App initialized successfully");
    cachedHandler = serverless(app);
    return cachedHandler;
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR during initialization:", error);
    throw error;
  }
}

export default async (req: any, res: any) => {
  try {
    const handler = await getHandler();
    return handler(req, res);
  } catch (error: any) {
    console.error("❌ Request handler error:", error);
    res
      .status(500)
      .json({ error: "Failed to initialize app", details: error.message });
  }
};
