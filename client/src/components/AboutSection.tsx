import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import profileImage from "@assets/L_In_1757586366832.jpg";

export default function AboutSection() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });

  if (isLoading) {
    return (
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto animate-pulse h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
      </section>
    );
  }

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
              <h3 className="text-2xl font-semibold text-primary">
                Hi, I&apos;m {profile?.name || "QA Engineer"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{profile?.bio}</p>
              <p className="text-gray-600 dark:text-gray-300">
                I focus on building reliable testing strategies, improving
                release quality, and preventing production issues through
                proactive QA.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-map-pin-line text-primary mr-2"></i>
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {profile?.location || "N/A"}
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-global-line text-primary mr-2"></i>
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 break-all">
                    {profile?.email || "N/A"}
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-briefcase-line text-primary mr-2"></i>
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {profile?.yearsOfExperience || 0}+ Years in QA
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <i className="ri-user-star-line text-primary mr-2"></i>
                    <span className="font-medium">Role</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {profile?.role || "QA Engineer"}
                  </p>
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
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-lg">
                <img
                  src={profile?.avatarUrl || profileImage}
                  alt={profile?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
