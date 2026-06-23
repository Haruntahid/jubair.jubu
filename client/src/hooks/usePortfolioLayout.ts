import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { DEFAULT_SECTIONS } from "@shared/sections";
import { getProfileSocialLinks } from "@shared/social";

const SECTION_ANCHORS: Record<string, string> = {
  about: "#about",
  skills: "#skills",
  process: "#process",
  projects: "#projects",
  blog: "#blog",
  experience: "#experience",
  certifications: "#certifications",
  github: "#github",
  contact: "#contact",
};

export function useVisibleNavSections() {
  const { data: sections = DEFAULT_SECTIONS } = useQuery({
    queryKey: ["portfolio-site-sections"],
    queryFn: portfolioApi.getSiteSections,
  });

  return [...sections]
    .sort((a, b) => a.order - b.order)
    .filter((section) => section.visible && section.key !== "hero")
    .map((section) => ({
      key: section.key,
      label: section.label,
      href: SECTION_ANCHORS[section.key] || `#${section.key}`,
    }));
}

export function useProfileSocialLinks() {
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });

  return getProfileSocialLinks(profile);
}
