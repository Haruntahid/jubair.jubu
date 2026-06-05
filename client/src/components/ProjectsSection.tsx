import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: portfolioApi.getProjects,
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </section>
    );
  }

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
          {projects.map((project: any, index: number) => (
            <motion.div
              key={project._id || index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-folder-line text-6xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                )}
                {project.testingTypes?.[0] && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {project.testingTypes[0]}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project.techStack || []).map(
                    (tech: string, idx: number) => (
                      <span
                        key={`${tech}-${idx}`}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                <div className="border-t pt-4 dark:border-gray-700">
                  <div className="flex justify-between items-center text-sm mb-3 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <i className="ri-bug-line mr-1"></i>{" "}
                      {project.metrics?.bugsCaught || 0} bugs
                    </span>
                    <span className="flex items-center">
                      <i className="ri-percent-line mr-1"></i>{" "}
                      {project.metrics?.testCoverage || 0}%
                    </span>
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      <i className="ri-github-fill mr-2"></i>
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
