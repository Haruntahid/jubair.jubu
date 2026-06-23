import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Tools</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            My technical expertise and tools I use to ensure software quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <motion.i
                className="ri-code-line text-primary mr-2"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              ></motion.i>
              Programming Languages
            </h3>

            <div className="space-y-4">
              {programmingSkills.map((skill: any, index: number) => (
                <SkillBar
                  key={skill._id || skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <motion.i
                className="ri-test-tube-line text-primary mr-2"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.i>
              Testing Expertise
            </h3>

            <div className="space-y-4">
              {testingExpertise.map((skill: any, index: number) => (
                <SkillBar
                  key={skill._id || skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Tools I Use
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {toolsUsed.map((tool: any, index: number) => (
              <motion.div
                key={tool._id || tool.name}
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                viewport={{ once: true }}
              >
                <motion.i
                  className={`${
                    tool.icon || "ri-tools-line"
                  } text-3xl text-primary mb-2`}
                  whileHover={{ rotate: 8 }}
                ></motion.i>
                <span className="text-center text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
