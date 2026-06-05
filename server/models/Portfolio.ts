import mongoose, { Schema, Document } from "mongoose";

// ─── Profile ────────────────────────────────────────────────────────────────
export interface IProfile extends Document {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  avatarUrl: string;
  yearsOfExperience: number;
  bugsFound: number;
  projectsTested: number;
  testCasesWritten: number;
}
const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    yearsOfExperience: { type: Number, default: 0 },
    bugsFound: { type: Number, default: 0 },
    projectsTested: { type: Number, default: 0 },
    testCasesWritten: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Skill ──────────────────────────────────────────────────────────────────
export interface ISkill extends Document {
  category: string;
  name: string;
  level: number;
  icon: string;
  order: number;
}
const SkillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Project ─────────────────────────────────────────────────────────────────
export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  testingTypes: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  metrics: { bugsCaught: number; testCoverage: number; testCases: number };
}
const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: "" },
    techStack: [{ type: String }],
    testingTypes: [{ type: String }],
    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    metrics: {
      bugsCaught: { type: Number, default: 0 },
      testCoverage: { type: Number, default: 0 },
      testCases: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// ─── Experience ──────────────────────────────────────────────────────────────
export interface IExperience extends Document {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  techStack: string[];
  order: number;
}
const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    responsibilities: [{ type: String }],
    techStack: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Education ───────────────────────────────────────────────────────────────
export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  order: number;
}
const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Certification ───────────────────────────────────────────────────────────
export interface ICertification extends Document {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  order: number;
}
const CertificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, default: "" },
    credentialId: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
  order: number;
}
const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Blog Post ──────────────────────────────────────────────────────────────
export interface IBlogPost extends Document {
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  icon: string;
  imageUrl: string;
  order: number;
}
const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: String, default: "" },
    category: { type: String, default: "" },
    icon: { type: String, default: "ri-file-text-line" },
    imageUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Process Step ───────────────────────────────────────────────────────────
export interface IProcessStep extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
}
const ProcessStepSchema = new Schema<IProcessStep>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "ri-flow-chart" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Testing Approach ───────────────────────────────────────────────────────
export interface ITestingApproach extends Document {
  key: string;
  title: string;
  icon: string;
  points: string[];
  order: number;
}
const TestingApproachSchema = new Schema<ITestingApproach>(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    icon: { type: String, default: "ri-check-line" },
    points: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Terminal Command ───────────────────────────────────────────────────────
export interface ITerminalCommand extends Document {
  command: string;
  description: string;
  output: string;
  category: string;
  active: boolean;
  order: number;
}
const TerminalCommandSchema = new Schema<ITerminalCommand>(
  {
    command: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    output: { type: String, required: true },
    category: { type: String, default: "Custom" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Contact Message ─────────────────────────────────────────────────────────
export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  repliedAt?: Date;
}
const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

// ─── Admin User ──────────────────────────────────────────────────────────────
export interface IAdminUser extends Document {
  username: string;
  password: string;
}
const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ─── Exports ─────────────────────────────────────────────────────────────────
export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
export const Skill = mongoose.model<ISkill>("Skill", SkillSchema);
export const Project = mongoose.model<IProject>("Project", ProjectSchema);
export const Experience = mongoose.model<IExperience>(
  "Experience",
  ExperienceSchema
);
export const Education = mongoose.model<IEducation>(
  "Education",
  EducationSchema
);
export const Certification = mongoose.model<ICertification>(
  "Certification",
  CertificationSchema
);
export const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  TestimonialSchema
);
export const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
export const ProcessStep = mongoose.model<IProcessStep>(
  "ProcessStep",
  ProcessStepSchema
);
export const TestingApproach = mongoose.model<ITestingApproach>(
  "TestingApproach",
  TestingApproachSchema
);
export const TerminalCommand = mongoose.model<ITerminalCommand>(
  "TerminalCommand",
  TerminalCommandSchema
);
export const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema
);
export const AdminUser = mongoose.model<IAdminUser>(
  "AdminUser",
  AdminUserSchema
);
