import "dotenv/config";
import { connectDB } from "./db.js";
import {
  Profile,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Testimonial,
  AdminUser,
  BlogPost,
  ProcessStep,
  TestingApproach,
  TerminalCommand,
  SiteSettings,
} from "./models/Portfolio.js";
import bcrypt from "bcryptjs";
import { DEFAULT_SECTIONS } from "../shared/sections.js";

import {
  programmingSkills,
  testingExpertise,
  toolsUsed,
  testingProcess,
  testingApproaches,
  projects,
  blogPosts,
  experience as frontendExperience,
  certifications as frontendCertifications,
} from "../client/src/lib/data.ts";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

async function seed() {
  await connectDB();
  console.log("🌱 Starting seed from frontend data...");

  await Promise.all([
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    Project.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Certification.deleteMany({}),
    Testimonial.deleteMany({}),
    BlogPost.deleteMany({}),
    ProcessStep.deleteMany({}),
    TestingApproach.deleteMany({}),
    TerminalCommand.deleteMany({}),
    SiteSettings.deleteMany({}),
    AdminUser.deleteMany({}),
  ]);

  await Profile.create({
    name: process.env.PROFILE_NAME || "Jubair Rahman",
    role:
      process.env.PROFILE_ROLE ||
      "QA Engineer | Software Tester | Project Coordinator",
    tagline:
      process.env.PROFILE_TAGLINE ||
      "Delivering Quality Through Code & Precision",
    bio:
      process.env.PROFILE_BIO ||
      "Passionate about finding bugs and ensuring software quality. I bring analytical thinking and automation expertise to solve complex testing challenges.",
    email: process.env.PROFILE_EMAIL || "jubairrahman64@gmail.com",
    phone: process.env.PROFILE_PHONE || "+880-164-576-3353",
    location: process.env.PROFILE_LOCATION || "Dhaka, Bangladesh",
    github: process.env.PROFILE_GITHUB || "https://github.com/JubairRahman",
    githubUsername: process.env.PROFILE_GITHUB_USERNAME || "JubairRahman",
    linkedin:
      process.env.PROFILE_LINKEDIN ||
      "https://www.linkedin.com/in/thejubairahman",
    twitter: process.env.PROFILE_TWITTER || "",
    socialLinks: [
      {
        label: "Portfolio",
        url: "https://jubairrahman.dev",
        icon: "ri-global-line",
        order: 4,
      },
    ],
    resumeUrl: process.env.PROFILE_RESUME_URL || "#",
    avatarUrl: process.env.PROFILE_AVATAR_URL || "",
    yearsOfExperience: Number(process.env.PROFILE_YEARS || 2),
    bugsFound: Number(process.env.PROFILE_BUGS || 5000),
    projectsTested: Number(process.env.PROFILE_PROJECTS || 8),
    testCasesWritten: Number(process.env.PROFILE_TEST_CASES || 150),
  });

  const mergedSkills = [
    ...programmingSkills.map((item, idx) => ({
      category: "Programming",
      name: item.name,
      level: item.percentage,
      icon: "ri-code-line",
      order: idx + 1,
    })),
    ...testingExpertise.map((item, idx) => ({
      category: "Testing Types",
      name: item.name,
      level: item.percentage,
      icon: "ri-test-tube-line",
      order: idx + 1,
    })),
    ...toolsUsed.map((item, idx) => ({
      category: "Tools",
      name: item.name,
      level: 100,
      icon: item.icon,
      order: idx + 1,
    })),
  ];
  await Skill.insertMany(mergedSkills);

  await Project.insertMany(
    projects.map((item, index) => ({
      title: item.title,
      featured: item.tag?.toLowerCase().includes("automation"),
      order: index + 1,
      description: item.description,
      longDescription: item.description,
      techStack: item.technologies.map((tech) => tech.name),
      testingTypes: item.tag ? [item.tag] : [],
      imageUrl: "",
      liveUrl: "",
      githubUrl: item.githubUrl || "",
      metrics: { bugsCaught: 0, testCoverage: 0, testCases: 0 },
    }))
  );

  await Experience.insertMany(
    frontendExperience.map((item, idx) => ({
      company: item.company,
      role: item.title,
      startDate: item.duration,
      endDate: "",
      current: item.duration.toLowerCase().includes("present"),
      order: idx + 1,
      description: item.description,
      responsibilities: item.responsibilities,
      techStack: [],
    }))
  );

  await Education.insertMany([
    {
      institution: "University",
      degree: "B.Sc",
      field: "Computer Science",
      startDate: "2018-01",
      endDate: "2022-01",
      current: false,
      description: "",
      order: 1,
    },
  ]);

  await Certification.insertMany(
    frontendCertifications.map((item, idx) => ({
      name: item.title,
      issuer: item.issuer,
      issueDate: item.year,
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      imageUrl: "",
      order: idx + 1,
    }))
  );

  await BlogPost.insertMany(
    blogPosts.map((post, idx) => ({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.date,
      category: post.category,
      icon: post.icon,
      imageUrl: (post as any).imageUrl || "",
      order: idx + 1,
    }))
  );

  await ProcessStep.insertMany(
    testingProcess.map((step, idx) => ({
      title: step.title,
      description: step.description,
      icon: step.icon,
      order: idx + 1,
    }))
  );

  await TestingApproach.insertMany(
    testingApproaches.map((approach, idx) => ({
      key: approach.id,
      title: approach.title,
      icon: approach.icon,
      points: approach.points,
      order: idx + 1,
    }))
  );

  await TerminalCommand.insertMany([
    {
      command: "portfolio",
      description: "Show portfolio summary",
      output:
        "QA Engineer · {name} · Manual and automation testing expert",
      category: "Profile",
      active: true,
      order: 1,
    },
    {
      command: "services",
      description: "Show available QA services",
      output:
        "Manual testing, automation testing, API testing, regression testing, and bug reporting",
      category: "Services",
      active: true,
      order: 2,
    },
  ]);

  await SiteSettings.create({
    sections: DEFAULT_SECTIONS,
  });

  await Testimonial.insertMany([
    {
      name: "Client Feedback",
      role: "Quality Partner",
      company: "Product Team",
      content:
        "Great QA collaboration and consistent attention to software quality.",
      avatarUrl: "",
      rating: 5,
      order: 1,
    },
  ]);

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await AdminUser.create({
    username: ADMIN_USERNAME,
    password: hashedPassword,
  });

  console.log("✅ Seed completed!");
  console.log(
    `👤 Admin login: username=${ADMIN_USERNAME}, password=${ADMIN_PASSWORD}`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
