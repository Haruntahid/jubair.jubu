import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss quality assurance? Let's connect!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                    <i className="ri-mail-line text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Email</h4>
                    <a href="mailto:jubairrahman64@gmail.com" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary" data-testid="link-email-main">jubairrahman64@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                    <i className="ri-phone-line text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Phone</h4>
                    <a href="tel:+8801645763353" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary" data-testid="link-phone-main">+880 - 164 576 3353</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                    <i className="ri-map-pin-line text-primary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Location</h4>
                    <p className="text-gray-800 dark:text-gray-200">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/thejubairahman" target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary p-3 rounded-full transition-colors" data-testid="link-linkedin">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a href="https://github.com/JubairRahman" target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary p-3 rounded-full transition-colors" data-testid="link-github">
                    <i className="ri-github-fill"></i>
                  </a>
                  <a href="mailto:jubairrahman64@gmail.com" className="bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary p-3 rounded-full transition-colors" data-testid="link-email">
                    <i className="ri-mail-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="John Doe" 
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      placeholder="john@example.com" 
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    placeholder="How can I help you?" 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white ${errors.subject ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message"
                    {...register("message", { required: "Message is required" })}
                    rows={5} 
                    placeholder="Your message here..." 
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white ${errors.message ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="ri-send-plane-line ml-1"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
