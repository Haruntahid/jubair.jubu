import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

export default function SkillsSection() {
  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["portfolio-skills"],
    queryFn: portfolioApi.getSkills,
  });

  const programmingSkills = skills.filter(
    (item: any) => item.category === "Programming"
  );
  const testingExpertise = skills.filter(
    (item: any) => item.category === "Testing Types"
  );
  const toolsUsed = skills.filter((item: any) => item.category === "Tools");

  if (isLoading) {
    return (
      <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Skills & Tools</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            My technical expertise and tools I use to ensure software quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <i className="ri-code-line text-primary mr-2"></i>
              Programming Languages
            </h3>

            <div className="space-y-2">
              {programmingSkills.map((skill: any) => (
                <div
                  key={skill._id || skill.name}
                  className="flex justify-between text-sm"
                >
                  <span>{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              Testing Expertise
            </h3>

            <div className="space-y-2">
              {testingExpertise.map((skill: any) => (
                <div
                  key={skill._id || skill.name}
                  className="flex justify-between text-sm"
                >
                  <span>{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Tools I Use
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {toolsUsed.map((tool: any) => (
              <div
                key={tool._id || tool.name}
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                <i
                  className={`${
                    tool.icon || "ri-tools-line"
                  } text-3xl text-primary mb-2`}
                ></i>
                <span className="text-center text-sm">{tool.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
