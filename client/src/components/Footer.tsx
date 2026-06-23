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

export default function Footer() {
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });
  const { data: sections = DEFAULT_SECTIONS } = useQuery({
    queryKey: ["portfolio-site-sections"],
    queryFn: portfolioApi.getSiteSections,
  });

  const navSections = [...sections]
    .filter((section) => section.visible && section.key !== "hero")
    .sort((a, b) => a.order - b.order);
  const socialLinks = getProfileSocialLinks(profile);

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="ri-bug-line text-primary text-2xl mr-2"></i>
            <span className="font-bold text-lg">
              {profile?.name || "QA Portfolio"}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            {navSections.map((section) => (
              <a
                key={section.key}
                href={SECTION_ANCHORS[section.key] || `#${section.key}`}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {profile?.name || "QA Portfolio"}.
              All rights reserved.
            </div>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  <i className="ri-mail-line"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
