import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { DEFAULT_SECTIONS } from "@shared/sections";

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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });
  const { data: sections = DEFAULT_SECTIONS } = useQuery({
    queryKey: ["portfolio-site-sections"],
    queryFn: portfolioApi.getSiteSections,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navSections = [...sections]
    .filter((section) => section.visible && section.key !== "hero")
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.history.pushState(null, "", href);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <nav
      className={`fixed w-full bg-white dark:bg-gray-800 shadow-md z-50 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <i className="ri-bug-line text-primary text-2xl mr-2"></i>
              <span className="font-bold text-lg">
                {profile?.name || "QA Portfolio"}
              </span>
            </a>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navSections.map((section) => {
              const href =
                SECTION_ANCHORS[section.key] || `#${section.key}`;
              return (
                <a
                  key={section.key}
                  href={href}
                  onClick={(e) => {
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      window.history.pushState(null, "", href);
                      window.dispatchEvent(new HashChangeEvent("hashchange"));
                    }
                  }}
                  className="hover:text-primary dark:hover:text-primary font-medium"
                >
                  {section.label}
                </a>
              );
            })}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i
                className={`ri-moon-line ${
                  theme === "dark" ? "hidden" : ""
                } text-lg`}
              ></i>
              <i
                className={`ri-sun-line ${
                  theme === "dark" ? "" : "hidden"
                } text-lg`}
              ></i>
            </button>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <i
                className={`ri-menu-line text-2xl ${
                  mobileMenuOpen ? "hidden" : ""
                }`}
              ></i>
              <i
                className={`ri-close-line text-2xl ${
                  mobileMenuOpen ? "" : "hidden"
                }`}
              ></i>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i
                className={`ri-moon-line ${
                  theme === "dark" ? "hidden" : ""
                } text-lg`}
              ></i>
              <i
                className={`ri-sun-line ${
                  theme === "dark" ? "" : "hidden"
                } text-lg`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${
          mobileMenuOpen ? "" : "hidden"
        } transition-all duration-200 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          {navSections.map((section) => {
            const href = SECTION_ANCHORS[section.key] || `#${section.key}`;
            return (
              <a
                key={section.key}
                href={href}
                onClick={(e) => handleNavLinkClick(e, href)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
