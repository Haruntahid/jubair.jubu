import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div className={`font-body ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProcessSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      
      {/* Floating Action Button for CV download */}
      <div className="fixed bottom-6 right-6 z-40">
        <a href="#" className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <i className="ri-download-line text-xl"></i>
        </a>
      </div>
    </div>
  );
}
