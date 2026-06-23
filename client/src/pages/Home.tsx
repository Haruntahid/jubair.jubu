import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ExperienceSection from "@/components/ExperienceSection";
import CertificationsSection from "@/components/CertificationsSection";
import GitHubContributionsSection from "@/components/GitHubContributionsSection";
import TerminalContactComponent from "@/components/TerminalContactComponent";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { useHashScroll } from "@/hooks/useHashScroll";
import { portfolioApi } from "@/lib/api";
import { DEFAULT_SECTIONS } from "@shared/sections";
import type { ComponentType } from "react";

const SECTION_COMPONENTS: Record<string, ComponentType> = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  process: ProcessSection,
  projects: ProjectsSection,
  blog: BlogSection,
  experience: ExperienceSection,
  certifications: CertificationsSection,
  github: GitHubContributionsSection,
  contact: TerminalContactComponent,
};

export default function Home() {
  const { theme } = useTheme();
  const { data: sections = DEFAULT_SECTIONS } = useQuery({
    queryKey: ["portfolio-site-sections"],
    queryFn: portfolioApi.getSiteSections,
  });

  const visibleSections = [...sections]
    .sort((a, b) => a.order - b.order)
    .filter((section) => section.visible);

  useHashScroll([visibleSections.map((s) => s.key).join(",")]);

  return (
    <div className={`font-body ${theme === "dark" ? "dark" : ""}`}>
      <Navbar />
      {visibleSections.map((section) => {
        const Component = SECTION_COMPONENTS[section.key];
        if (!Component) return null;
        return <Component key={section.key} />;
      })}
      <Footer />

      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="#"
          className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <i className="ri-download-line text-xl"></i>
        </a>
      </div>
    </div>
  );
}
