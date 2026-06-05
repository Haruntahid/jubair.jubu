import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { getDefaultIconForCategory } from "@/lib/terminal-commands";
import { useState } from "react";

export default function BlogSection() {
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["portfolio-blog-posts"],
    queryFn: portfolioApi.getBlogPosts,
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto animate-pulse h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </section>
    );
  }

  const getDisplayIcon = (post: any) => {
    const imageFailed = brokenImages[post._id || post.url];

    if (post.imageUrl && !imageFailed) {
      return (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={() =>
            setBrokenImages((prev) => ({
              ...prev,
              [post._id || post.url]: true,
            }))
          }
        />
      );
    }

    // Fall back to icon class
    const iconClass = post.icon || getDefaultIconForCategory(post.category);
    return <i className={`${iconClass} text-4xl text-white`}></i>;
  };

  return (
    <section id="blog" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <i className="ri-article-line mr-2"></i>
            Blog & Resources
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Sharing knowledge through code snippets, testing utilities, and QA
            insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post: any, index: number) => (
            <motion.div
              key={post._id || index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header with Icon/Image */}
              <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700 relative flex items-center justify-center overflow-hidden">
                {getDisplayIcon(post)}
                <div className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {post.date}
                  </span>
                </div>

                {/* Action Button */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <i className="ri-external-link-line mr-2"></i>
                  View Gist
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <i className="ri-inbox-line text-4xl mb-3 block"></i>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://gist.github.com/JubairRahman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 rounded-md font-medium transition-colors"
          >
            <i className="ri-github-line mr-2"></i>
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
