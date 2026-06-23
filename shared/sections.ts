export interface SiteSectionConfig {
  key: string;
  label: string;
  order: number;
  visible: boolean;
}

export const DEFAULT_SECTIONS: SiteSectionConfig[] = [
  { key: "hero", label: "Hero", order: 1, visible: true },
  { key: "about", label: "About", order: 2, visible: true },
  { key: "skills", label: "Skills & Tools", order: 3, visible: true },
  { key: "process", label: "Process", order: 4, visible: true },
  { key: "projects", label: "Projects", order: 5, visible: true },
  { key: "blog", label: "Blog", order: 6, visible: true },
  { key: "experience", label: "Experience", order: 7, visible: true },
  { key: "certifications", label: "Certifications", order: 8, visible: true },
  { key: "github", label: "GitHub Activity", order: 9, visible: true },
  { key: "contact", label: "Contact Terminal", order: 10, visible: true },
];

export const NAV_SECTION_KEYS = DEFAULT_SECTIONS.filter(
  (s) => s.key !== "hero"
).map((s) => s.key);
