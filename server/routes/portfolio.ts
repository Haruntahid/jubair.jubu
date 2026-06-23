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
import { getSiteSections } from "../lib/siteSettings.js";
import { extractGithubUsername } from "../../shared/social.js";
import { isReservedTerminalCommand } from "../../shared/terminal.js";

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
    const commands = await TerminalCommand.find({ active: true }).sort({
      order: 1,
    });
    res.json(
      commands.filter((cmd) => !isReservedTerminalCommand(cmd.command))
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/site-sections", async (_req, res) => {
  try {
    res.json(await getSiteSections());
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/github-contributions/:username", async (req, res) => {
  try {
    const username = req.params.username?.trim();
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch GitHub contributions" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/github-contributions", async (_req, res) => {
  try {
    const profile = await Profile.findOne();
    const username = extractGithubUsername(profile);
    if (!username) {
      return res.status(404).json({ message: "GitHub username not configured" });
    }

    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Failed to fetch GitHub contributions" });
    }

    const data = await response.json();
    res.json({ username, ...data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
