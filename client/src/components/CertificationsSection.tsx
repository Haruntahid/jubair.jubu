import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Certifications & Achievements</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Professional qualifications that validate my expertise in quality assurance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${cert.bgColor} flex items-center justify-center mr-4`}>
                  <i className={`${cert.icon} text-2xl ${cert.iconColor}`}></i>
                </div>
                <div>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                </div>
              </div>
              <div className="pl-16">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {cert.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <i className="ri-calendar-line mr-1"></i> Issued: {cert.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
