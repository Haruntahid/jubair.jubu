import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Blog & Resources</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Sharing knowledge through code snippets, testing utilities, and QA insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-32 bg-gradient-to-br from-primary to-blue-700 relative flex items-center justify-center">
                <i className={`${post.icon} text-4xl text-white`}></i>
                <div className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {post.description}
                </p>
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500 dark:text-gray-400">
                    <i className="ri-calendar-line mr-1"></i> {post.date}
                  </span>
                </div>
                <a 
                  href={post.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                  data-testid={`link-blog-${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <i className="ri-external-link-line mr-2"></i>
                  View Gist
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://gist.github.com/JubairRahman" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md font-medium transition-colors"
            data-testid="link-all-gists"
          >
            <i className="ri-github-fill mr-2"></i>
            View All Gists
          </a>
        </div>
      </div>
    </section>
  );
}