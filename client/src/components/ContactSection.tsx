import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [currentCommand, setCurrentCommand] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const terminalCommands = [
    "$ whoami",
    (profile?.name || "qa-engineer").toLowerCase().replace(/\s+/g, "-"),
    "$ cat contact_info.txt",
    "Loading contact information...",
    "$ ./establish_connection.sh",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentCommand < terminalCommands.length) {
        setTerminalText(
          (prev) => prev + terminalCommands[currentCommand] + "\n"
        );
        setCurrentCommand((prev) => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentCommand]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "✓ Command Executed Successfully",
        description: "Message transmission completed. Response incoming...",
      });
      reset();
    } catch (error) {
      toast({
        title: "✗ Command Failed",
        description: "Network error. Please retry command.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-black text-green-400">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-2xl mb-4">
            <span className="text-green-400">
              [{(profile?.name || "qa-user").toLowerCase().replace(/\s+/g, "")}
              @qa-portfolio]
            </span>
            <span className="text-white">:~$ </span>
            <span className="text-green-300">./contact</span>
          </div>
          <div className="w-16 h-1 bg-green-400 mx-auto"></div>
          <p className="text-green-300 font-mono mt-4 max-w-2xl mx-auto">
            &gt; Initiating secure communication channel...
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal Info Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Terminal Window */}
            <div className="bg-gray-900 border border-green-400 rounded-lg overflow-hidden shadow-lg shadow-green-400/20">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-green-400">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-green-400 font-mono text-sm">
                  terminal - contact_session.sh
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm min-h-[300px]">
                <div className="text-green-400 whitespace-pre-line">
                  {terminalText}
                </div>
                <div className="flex items-center">
                  <span className="text-green-400">$ </span>
                  <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Contact Info as Terminal Output */}
            <div className="bg-gray-900 border border-green-400 rounded-lg p-6 font-mono">
              <div className="text-green-400 mb-4">
                <span className="text-yellow-400">&#123;</span> contact_info{" "}
                <span className="text-yellow-400">&#125;</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex">
                  <span className="text-blue-400 min-w-[80px]">email:</span>
                  <a
                    href={profile?.email ? `mailto:${profile.email}` : "#"}
                    className="text-green-300 hover:text-green-100 hover:underline"
                    data-testid="link-email-main"
                  >
                    {`"${profile?.email || "N/A"}"`}
                  </a>
                </div>

                <div className="flex">
                  <span className="text-blue-400 min-w-[80px]">phone:</span>
                  <a
                    href={
                      profile?.phone
                        ? `tel:${profile.phone.replace(/[^+\d]/g, "")}`
                        : "#"
                    }
                    className="text-green-300 hover:text-green-100 hover:underline"
                    data-testid="link-phone-main"
                  >
                    {`"${profile?.phone || "N/A"}"`}
                  </a>
                </div>

                <div className="flex">
                  <span className="text-blue-400 min-w-[80px]">location:</span>
                  <span className="text-green-300">{`"${
                    profile?.location || "N/A"
                  }"`}</span>
                </div>

                <div className="flex">
                  <span className="text-blue-400 min-w-[80px]">status:</span>
                  <span className="text-green-300">"available"</span>
                </div>
              </div>

              {/* Social Links as Commands */}
              <div className="mt-6 pt-4 border-t border-green-400">
                <div className="text-green-400 mb-3">connection_links:</div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={profile?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    data-testid="link-linkedin"
                  >
                    ./linkedin.sh
                  </a>
                  <a
                    href={profile?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    data-testid="link-github"
                  >
                    ./github.sh
                  </a>
                  <a
                    href={profile?.email ? `mailto:${profile.email}` : "#"}
                    className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    data-testid="link-email"
                  >
                    ./send_mail.sh
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 border border-green-400 rounded-lg overflow-hidden shadow-lg shadow-green-400/20">
              {/* Form Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-green-400">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-green-400 font-mono text-sm">
                  message_composer.exe
                </div>
              </div>

              <div className="p-6">
                <div className="text-green-400 font-mono mb-6">
                  <span className="text-yellow-400">#</span> Initialize message
                  transmission
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      <span className="text-blue-400">$</span> sender_name:
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name parameter required",
                      })}
                      placeholder="Enter your name..."
                      className="w-full bg-black border border-green-400 text-green-300 font-mono px-3 py-2 focus:outline-none focus:border-green-200 focus:shadow-sm focus:shadow-green-400/50 placeholder-green-600"
                      data-testid="input-name"
                    />
                    {errors.name && (
                      <p className="text-red-400 font-mono text-xs mt-1">
                        <span className="text-red-600">✗</span>{" "}
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      <span className="text-blue-400">$</span> sender_email:
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email parameter required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="your.email@domain.com"
                      className="w-full bg-black border border-green-400 text-green-300 font-mono px-3 py-2 focus:outline-none focus:border-green-200 focus:shadow-sm focus:shadow-green-400/50 placeholder-green-600"
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-red-400 font-mono text-xs mt-1">
                        <span className="text-red-600">✗</span>{" "}
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      <span className="text-blue-400">$</span> message_subject:
                    </label>
                    <input
                      type="text"
                      {...register("subject", {
                        required: "Subject parameter required",
                      })}
                      placeholder="Brief message summary..."
                      className="w-full bg-black border border-green-400 text-green-300 font-mono px-3 py-2 focus:outline-none focus:border-green-200 focus:shadow-sm focus:shadow-green-400/50 placeholder-green-600"
                      data-testid="input-subject"
                    />
                    {errors.subject && (
                      <p className="text-red-400 font-mono text-xs mt-1">
                        <span className="text-red-600">✗</span>{" "}
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-green-400 font-mono text-sm mb-2">
                      <span className="text-blue-400">$</span> message_body:
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message body required",
                      })}
                      rows={5}
                      placeholder="Type your message here..."
                      className="w-full bg-black border border-green-400 text-green-300 font-mono px-3 py-2 focus:outline-none focus:border-green-200 focus:shadow-sm focus:shadow-green-400/50 placeholder-green-600 resize-none"
                      data-testid="input-message"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-400 font-mono text-xs mt-1">
                        <span className="text-red-600">✗</span>{" "}
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-900 hover:bg-green-800 border border-green-400 text-green-100 font-mono py-3 px-4 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">$</span>
                        ./send_message.sh --execute
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-green-400">
                  <div className="text-green-600 font-mono text-xs">
                    <span className="text-yellow-400">#</span> Secure
                    transmission protocol enabled
                  </div>
                  <div className="text-green-600 font-mono text-xs">
                    <span className="text-yellow-400">#</span> Response time:
                    &lt; 24 hours
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
