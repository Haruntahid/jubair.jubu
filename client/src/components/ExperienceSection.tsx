import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            My journey in quality assurance and software testing
          </p>
        </div>
        
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`${exp.bgColor} rounded-full p-4 inline-flex`}>
                    <i className={`${exp.icon} ${exp.iconColor} text-2xl`}></i>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-medium text-primary mb-2">
                        {exp.company}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {exp.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col lg:text-right">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mb-2 whitespace-nowrap">
                        {exp.duration}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        <i className="ri-map-pin-line mr-1"></i>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                      Key Responsibilities:
                    </h5>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start text-gray-600 dark:text-gray-300"
                        >
                          <i className="ri-check-line text-primary mr-3 mt-1 flex-shrink-0"></i>
                          <span className="text-sm leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://www.linkedin.com/in/thejubairahman/details/experience/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md font-medium transition-colors"
            data-testid="link-full-experience"
          >
            <i className="ri-linkedin-fill mr-2"></i>
            View Full Experience on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}