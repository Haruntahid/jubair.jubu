import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

export default function ProcessSection() {
  const { data: processSteps = [], isLoading: processLoading } = useQuery({
    queryKey: ["portfolio-process-steps"],
    queryFn: portfolioApi.getProcessSteps,
  });

  const { data: approaches = [], isLoading: approachesLoading } = useQuery({
    queryKey: ["portfolio-testing-approaches"],
    queryFn: portfolioApi.getTestingApproaches,
  });

  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (!activeTab && approaches.length > 0) {
      setActiveTab(approaches[0].key || approaches[0].id);
    }
  }, [approaches, activeTab]);

  if (processLoading || approachesLoading) {
    return (
      <section id="process" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </section>
    );
  }

  return (
    <section id="process" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Testing Processes</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            My systematic approach to ensure software quality at every stage
          </p>
        </div>

        <div className="mb-16 relative">
          <div className="absolute top-[30px] left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 z-0 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.slice(0, 4).map((step: any, index: number) => (
              <motion.div
                key={step._id || index}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-3">
                  <i className={`${step.icon} text-2xl`}></i>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-center mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            {processSteps.slice(4).map((step: any, index: number) => (
              <motion.div
                key={step._id || `p-${index}`}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-3">
                  <i className={`${step.icon} text-2xl`}></i>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-center mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap text-sm font-medium text-center border-b border-gray-200 dark:border-gray-600">
            {approaches.map((approach: any) => (
              <button
                key={approach._id || approach.key}
                onClick={() => setActiveTab(approach.key || approach.id)}
                className={`px-4 py-3 w-full sm:w-auto ${
                  activeTab === (approach.key || approach.id)
                    ? "text-primary border-b-2 border-primary dark:text-primary"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <i className={`${approach.icon} mr-1`}></i> {approach.title}
              </button>
            ))}
          </div>

          <div className="p-6">
            {approaches.map((approach: any) => (
              <div
                key={approach._id || approach.key}
                className={`${
                  activeTab === (approach.key || approach.id)
                    ? "block"
                    : "hidden"
                } animate-in fade-in duration-200`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="rounded-lg shadow-md w-full h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <i
                        className={`${approach.icon} text-6xl text-gray-400 dark:text-gray-500`}
                      ></i>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-semibold mb-3">
                      {approach.title} Approach
                    </h3>
                    <ul className="space-y-2">
                      {(approach.points || []).map(
                        (point: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-checkbox-circle-line text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                            <span>{point}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
