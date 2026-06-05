import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/Portfolio.js";
import { JWT_SECRET } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required" });

    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/change-credentials", async (req, res) => {
  try {
    const { username, oldPassword, newUsername, newPassword } = req.body;

    if (!username || !oldPassword) {
      return res
        .status(400)
        .json({ message: "Username and old password are required" });
    }

    if (!newUsername && !newPassword) {
      return res
        .status(400)
        .json({ message: "Provide new username and/or new password" });
    }

    const admin = await AdminUser.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    if (newUsername && newUsername !== username) {
      const existing = await AdminUser.findOne({ username: newUsername });
      if (existing) {
        return res.status(409).json({ message: "Username already exists" });
      }
      admin.username = String(newUsername).trim();
    }

    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    res.json({
      message: "Credentials updated successfully",
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
