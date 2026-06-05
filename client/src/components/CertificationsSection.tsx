import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

export default function CertificationsSection() {
  const { data: certifications = [], isLoading } = useQuery({
    queryKey: ["portfolio-certifications"],
    queryFn: portfolioApi.getCertifications,
  });

  if (isLoading) {
    return (
      <section
        id="certifications"
        className="py-20 px-4 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </section>
    );
  }

  return (
    <section
      id="certifications"
      className="py-20 px-4 bg-white dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Certifications & Achievements
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional qualifications that validate my expertise in quality
            assurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert: any, index: number) => (
            <motion.div
              key={cert._id || index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <i className="ri-award-line text-2xl text-primary"></i>
                </div>
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              <div className="pl-16">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <i className="ri-calendar-line mr-1"></i> Issued:{" "}
                  {cert.issueDate}
                </div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm mt-2 inline-block hover:underline"
                  >
                    View credential
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
