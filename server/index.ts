import "dotenv/config";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite.js";
import { createApp } from "./app.js";
import { log } from "./logger.js";

(async () => {
  const { app } = await createApp();
  const server = createServer(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  server.listen(port, "127.0.0.1", () => {
    log(`serving on port ${port}`);
  });

  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.error(
        `❌ Port ${port} is already in use. Try a different port with: PORT=3001 npm run dev`
      );
      process.exit(1);
    } else if (err.code === "ENOTSUP") {
      console.error(
        `❌ Port binding not supported. Try with: PORT=3001 npm run dev`
      );
      process.exit(1);
    } else {
      console.error("❌ Server error:", err);
      process.exit(1);
    }
  });
})();
