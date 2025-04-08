export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <i className="ri-bug-line text-primary text-2xl mr-2"></i>
            <span className="font-bold text-lg">Alex Morgan</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">About</a>
            <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Skills</a>
            <a href="#process" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Process</a>
            <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Projects</a>
            <a href="#certifications" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Certifications</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Alex Morgan. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary">
                <i className="ri-linkedin-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary">
                <i className="ri-github-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary">
                <i className="ri-medium-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
