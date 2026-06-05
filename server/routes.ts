import type { Express } from "express";
import { createServer, type Server } from "http";
import { ContactMessage } from "./models/Portfolio.js";
import portfolioRoutes from "./routes/portfolio.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

export async function registerRoutes(app: Express): Promise<Server> {
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/admin", adminRoutes);

  // Public contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message)
        return res.status(400).json({ message: "All fields are required" });
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email))
        return res.status(400).json({ message: "Invalid email address" });
      await ContactMessage.create({ name, email, subject, message });
      return res
        .status(200)
        .json({ message: "Message sent successfully!", success: true });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return createServer(app);
}
