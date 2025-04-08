import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary">Hi, I'm Alex Morgan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I'm a dedicated QA Engineer with a passion for ensuring software quality and reliability. With over 7 years of experience in the field, I specialize in both manual and automated testing strategies.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My approach combines analytical thinking with technical expertise to identify issues before they reach production. I believe that quality assurance is not just about finding bugs, but about improving the entire development process.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-map-pin-line text-primary mr-2"></i>
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">San Francisco, CA</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-global-line text-primary mr-2"></i>
                    <span className="font-medium">Languages</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">English, Spanish</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-briefcase-line text-primary mr-2"></i>
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">7+ Years in QA</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-graduation-cap-line text-primary mr-2"></i>
                    <span className="font-medium">Degree</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">B.S. Computer Science</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center shadow-lg">
                <i className="ri-user-6-line text-8xl text-gray-400"></i>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-xl font-bold text-primary">4.9<span className="text-sm text-gray-500">/5.0</span></div>
                <div className="flex text-yellow-400 text-sm mt-1">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
                <div className="text-xs text-gray-500 mt-1">Client Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
