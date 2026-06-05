import { Router } from "express";
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Testimonial,
  BlogPost,
  ProcessStep,
  TestingApproach,
  TerminalCommand,
} from "../models/Portfolio.js";

const router = Router();

router.get("/profile", async (_req, res) => {
  try {
    res.json(await Profile.findOne());
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/skills", async (_req, res) => {
  try {
    res.json(await Skill.find().sort({ category: 1, order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/projects", async (_req, res) => {
  try {
    res.json(await Project.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/experience", async (_req, res) => {
  try {
    res.json(await Experience.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/education", async (_req, res) => {
  try {
    res.json(await Education.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/certifications", async (_req, res) => {
  try {
    res.json(await Certification.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/testimonials", async (_req, res) => {
  try {
    res.json(await Testimonial.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/blog-posts", async (_req, res) => {
  try {
    res.json(await BlogPost.find().sort({ order: 1, createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/process-steps", async (_req, res) => {
  try {
    res.json(await ProcessStep.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/testing-approaches", async (_req, res) => {
  try {
    res.json(await TestingApproach.find().sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/terminal-commands", async (_req, res) => {
  try {
    res.json(await TerminalCommand.find({ active: true }).sort({ order: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
