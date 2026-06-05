import { Router } from "express";
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Testimonial,
  ContactMessage,
  BlogPost,
  ProcessStep,
  TestingApproach,
  TerminalCommand,
} from "../models/Portfolio.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);

// ── Profile ───────────────────────────────────────────────────────────────────
router.get("/profile", async (_req, res) => {
  try {
    res.json(await Profile.findOne());
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/profile", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      res.json(await profile.save());
    } else res.status(201).json(await Profile.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Skills ────────────────────────────────────────────────────────────────────
router.get("/skills", async (_req, res) => {
  try {
    res.json(await Skill.find().sort({ category: 1, order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/skills", async (req, res) => {
  try {
    res.status(201).json(await Skill.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/skills/:id", async (req, res) => {
  try {
    const doc = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/skills/:id", async (req, res) => {
  try {
    if (!(await Skill.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Projects ──────────────────────────────────────────────────────────────────
router.get("/projects", async (_req, res) => {
  try {
    res.json(await Project.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/projects", async (req, res) => {
  try {
    res.status(201).json(await Project.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/projects/:id", async (req, res) => {
  try {
    const doc = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/projects/:id", async (req, res) => {
  try {
    if (!(await Project.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Experience ────────────────────────────────────────────────────────────────
router.get("/experience", async (_req, res) => {
  try {
    res.json(await Experience.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/experience", async (req, res) => {
  try {
    res.status(201).json(await Experience.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/experience/:id", async (req, res) => {
  try {
    const doc = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/experience/:id", async (req, res) => {
  try {
    if (!(await Experience.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Education ─────────────────────────────────────────────────────────────────
router.get("/education", async (_req, res) => {
  try {
    res.json(await Education.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/education", async (req, res) => {
  try {
    res.status(201).json(await Education.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/education/:id", async (req, res) => {
  try {
    const doc = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/education/:id", async (req, res) => {
  try {
    if (!(await Education.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Certifications ────────────────────────────────────────────────────────────
router.get("/certifications", async (_req, res) => {
  try {
    res.json(await Certification.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/certifications", async (req, res) => {
  try {
    res.status(201).json(await Certification.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/certifications/:id", async (req, res) => {
  try {
    const doc = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/certifications/:id", async (req, res) => {
  try {
    if (!(await Certification.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Testimonials ──────────────────────────────────────────────────────────────
router.get("/testimonials", async (_req, res) => {
  try {
    res.json(await Testimonial.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/testimonials", async (req, res) => {
  try {
    res.status(201).json(await Testimonial.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/testimonials/:id", async (req, res) => {
  try {
    const doc = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/testimonials/:id", async (req, res) => {
  try {
    if (!(await Testimonial.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Blog Posts ──────────────────────────────────────────────────────────────
router.get("/blog-posts", async (_req, res) => {
  try {
    res.json(await BlogPost.find().sort({ order: 1, createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/blog-posts", async (req, res) => {
  try {
    res.status(201).json(await BlogPost.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/blog-posts/:id", async (req, res) => {
  try {
    const doc = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/blog-posts/:id", async (req, res) => {
  try {
    if (!(await BlogPost.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Process Steps ───────────────────────────────────────────────────────────
router.get("/process-steps", async (_req, res) => {
  try {
    res.json(await ProcessStep.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/process-steps", async (req, res) => {
  try {
    res.status(201).json(await ProcessStep.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/process-steps/:id", async (req, res) => {
  try {
    const doc = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/process-steps/:id", async (req, res) => {
  try {
    if (!(await ProcessStep.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Testing Approaches ──────────────────────────────────────────────────────
router.get("/testing-approaches", async (_req, res) => {
  try {
    res.json(await TestingApproach.find().sort({ order: 1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/testing-approaches", async (req, res) => {
  try {
    res.status(201).json(await TestingApproach.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/testing-approaches/:id", async (req, res) => {
  try {
    const doc = await TestingApproach.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/testing-approaches/:id", async (req, res) => {
  try {
    if (!(await TestingApproach.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Terminal Commands ───────────────────────────────────────────────────────
router.get("/terminal-commands", async (_req, res) => {
  try {
    res.json(await TerminalCommand.find().sort({ order: 1, createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.post("/terminal-commands", async (req, res) => {
  try {
    res.status(201).json(await TerminalCommand.create(req.body));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.put("/terminal-commands/:id", async (req, res) => {
  try {
    const doc = await TerminalCommand.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/terminal-commands/:id", async (req, res) => {
  try {
    if (!(await TerminalCommand.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

// ── Messages (Inbox) ──────────────────────────────────────────────────────────
router.get("/messages", async (_req, res) => {
  try {
    res.json(await ContactMessage.find().sort({ createdAt: -1 }));
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.get("/messages/unread-count", async (_req, res) => {
  try {
    res.json({ count: await ContactMessage.countDocuments({ read: false }) });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.patch("/messages/:id/read", async (req, res) => {
  try {
    const doc = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});
router.delete("/messages/:id", async (req, res) => {
  try {
    if (!(await ContactMessage.findByIdAndDelete(req.params.id)))
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error", e });
  }
});

export default router;
