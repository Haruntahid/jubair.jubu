import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full bg-white dark:bg-gray-800 shadow-md z-50 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <i className="ri-bug-line text-primary text-2xl mr-2"></i>
              <span className="font-bold text-lg">Alex Morgan</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="#about" className="hover:text-primary dark:hover:text-primary font-medium">About</a>
            <a href="#skills" className="hover:text-primary dark:hover:text-primary font-medium">Skills</a>
            <a href="#process" className="hover:text-primary dark:hover:text-primary font-medium">Process</a>
            <a href="#projects" className="hover:text-primary dark:hover:text-primary font-medium">Projects</a>
            <a href="#certifications" className="hover:text-primary dark:hover:text-primary font-medium">Certifications</a>
            <a href="#contact" className="hover:text-primary dark:hover:text-primary font-medium">Contact</a>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className={`ri-moon-line ${theme === 'dark' ? 'hidden' : ''} text-lg`}></i>
              <i className={`ri-sun-line ${theme === 'dark' ? '' : 'hidden'} text-lg`}></i>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <i className={`ri-menu-line text-2xl ${mobileMenuOpen ? 'hidden' : ''}`}></i>
              <i className={`ri-close-line text-2xl ${mobileMenuOpen ? '' : 'hidden'}`}></i>
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className={`ri-moon-line ${theme === 'dark' ? 'hidden' : ''} text-lg`}></i>
              <i className={`ri-sun-line ${theme === 'dark' ? '' : 'hidden'} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'} transition-all duration-200 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          <a href="#about" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">About</a>
          <a href="#skills" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Skills</a>
          <a href="#process" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Process</a>
          <a href="#projects" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Projects</a>
          <a href="#certifications" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Certifications</a>
          <a href="#contact" onClick={handleNavLinkClick} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
        </div>
      </div>
    </nav>
  );
}
