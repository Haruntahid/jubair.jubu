import { motion } from "framer-motion";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Projects & Case Studies</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Showcasing my QA expertise through real-world testing projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <div className="w-full h-full flex items-center justify-center">
                  <i className={`${project.icon} text-6xl text-gray-400 dark:text-gray-500`}></i>
                </div>
                <div className={`absolute top-3 right-3 ${project.tagColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {project.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className={`${tech.bgColor} ${tech.textColor} text-xs font-medium px-2 py-1 rounded`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="border-t pt-4 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <i className={`${project.metricIcon} mr-1`}></i> {project.metric}
                    </span>
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <i className="ri-time-line mr-1"></i> {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
