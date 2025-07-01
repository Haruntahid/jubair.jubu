import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 font-medium text-sm">
              <span>QA Engineer | Software Tester | Automation Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block">Delivering Quality</span>
              <span className="block mt-2 text-primary">Through Code & Precision</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
              Passionate about finding bugs and ensuring software quality. I bring analytical thinking and automation expertise to solve complex testing challenges.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-blue-700 transition">
                Get in Touch
                <i className="ri-arrow-right-line ml-2"></i>
              </a>
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <i className="ri-download-line mr-2"></i>
                Download CV
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full max-w-md relative">
              <div className="absolute -z-10 w-80 h-80 bg-blue-300/30 dark:bg-blue-700/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">2+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">5k+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Bugs Found</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects Tested</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">5+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Testing Tools</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-400">
                      <i className="ri-user-line text-3xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Jubair Rahman</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> QA Professional</p>
                    <div className="flex mt-2 space-x-2">
                      <a href="#" className="text-gray-500 hover:text-primary">
                        <i className="ri-linkedin-fill"></i>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-primary">
                        <i className="ri-github-fill"></i>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-primary">
                        <i className="ri-mail-line"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
