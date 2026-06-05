import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api";
import { apiRequest } from "@/lib/queryClient";
import {
  executeCommand,
  BUILT_IN_COMMANDS,
  TerminalCommandData,
} from "@/lib/terminal-commands";

interface TerminalLine {
  type: "command" | "output" | "success" | "error" | "info";
  content: string;
  timestamp?: string;
}

interface FormData {
  visitorName: string;
  visitorEmail: string;
  subject: string;
  message: string;
}

export default function TerminalContactComponent() {
  const MAX_TERMINAL_LINES = 18;
  const { toast } = useToast();
  const { data: profile } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: portfolioApi.getProfile,
  });
  const { data: terminalCommandData = [] } = useQuery<TerminalCommandData[]>({
    queryKey: ["portfolio-terminal-commands"],
    queryFn: portfolioApi.getTerminalCommands,
  });

  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    {
      type: "info",
      content: "╔══════════════════════════════════════════════╗",
    },
    {
      type: "info",
      content: "║   QA ENGINEER | INTERACTIVE TERMINAL SESSION  ║",
    },
    {
      type: "info",
      content: "║  help = commands  ·  send = contact form      ║",
    },
    {
      type: "info",
      content: "╚══════════════════════════════════════════════╝",
    },
    { type: "info", content: "" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagePanelRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const addLine = (line: TerminalLine) => {
    setTerminalLines((prev) => {
      const next = [...prev, line];
      return next.length > MAX_TERMINAL_LINES
        ? next.slice(next.length - MAX_TERMINAL_LINES)
        : next;
    });
  };

  const isBannerLine = (line: TerminalLine) =>
    line.type === "info" &&
    (line.content.startsWith("╔") ||
      line.content.startsWith("║") ||
      line.content.startsWith("╚"));

  const normalizedBuiltinCommands = Object.values(BUILT_IN_COMMANDS).map(
    (cmd) => ({
      command: cmd.name.split(" ")[0],
      description: cmd.description,
      output: "",
      category: cmd.category,
      active: true,
      order: 0,
    })
  );

  const visibleCommands = [...normalizedBuiltinCommands, ...terminalCommandData]
    .filter((cmd) => cmd.active !== false)
    .reduce<TerminalCommandData[]>((acc, current) => {
      const existingIndex = acc.findIndex(
        (item) => item.command === current.command
      );
      if (existingIndex === -1) {
        acc.push(current);
      } else {
        acc[existingIndex] = {
          ...acc[existingIndex],
          ...current,
        };
      }
      return acc;
    }, [])
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const runCommand = (command: string) => {
    setInputValue(command);
    handleExecuteCommand(command);
  };

  const handleExecuteCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInputValue("");

    // Display command
    addLine({ type: "command", content: `$ ${cmd}` });

    // Execute command
    const results = executeCommand(cmd, profile, terminalCommandData);

    results.forEach((result) => {
      if (result.type === "info" && result.output === "CLEAR") {
        setTerminalLines([]);
      } else {
        addLine({
          type: result.type as TerminalLine["type"],
          content: result.output,
          timestamp: result.timestamp,
        });
      }
    });

    // Handle specific commands
    if (cmd.toLowerCase() === "send") {
      setTimeout(() => {
        setShowForm(true);
        addLine({
          type: "info",
          content: "Message composer opened on the right panel.",
        });
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecuteCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = historyIndex === null ? 0 : historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== null && historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(null);
        setInputValue("");
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      addLine({
        type: "success",
        content: "✓ Message transmitted successfully!",
      });
      toast({
        title: "Success",
        description: "Your message has been sent.",
      });
      reset();
      setShowForm(false);
    } catch (error: any) {
      addLine({
        type: "error",
        content: `✗ Transmission failed: ${error.message}`,
      });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-black text-green-400">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            <i className="ri-terminal-box-line mr-2"></i>
            Contact Terminal
          </h2>
          <p className="text-green-500">
            Execute commands to connect · Type 'help' for commands
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 border border-green-400 rounded-lg overflow-hidden shadow-lg shadow-green-400/10">
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

              <div className="p-4 font-mono text-sm h-[26rem] space-y-1 terminal-display bg-black overflow-y-auto overflow-x-hidden no-scrollbar">
                {terminalLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      isBannerLine(line)
                        ? "w-full text-center text-blue-400 whitespace-pre overflow-hidden"
                        : `flex items-start gap-2 ${
                            line.type === "command"
                              ? "text-green-400 font-bold"
                              : line.type === "success"
                              ? "text-green-300"
                              : line.type === "error"
                              ? "text-red-400"
                              : line.type === "info"
                              ? "text-blue-400"
                              : "text-gray-300"
                          }`
                    }
                  >
                    {isBannerLine(line) ? (
                      <span className="block w-full text-center leading-relaxed whitespace-pre">
                        {line.content}
                      </span>
                    ) : (
                      <>
                        <span className="flex-shrink-0">
                          {line.type === "success" && "✓"}
                          {line.type === "error" && "✗"}
                        </span>
                        <span className="break-words whitespace-pre-wrap leading-relaxed">
                          {line.content}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-black border-t border-green-500 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">$</span>
                  <input
                    ref={(el) => el?.focus()}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-black text-green-400 outline-none font-mono"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <span className="text-green-500 animate-pulse">▌</span>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">
                  Use ↑↓ for history · Type 'help' for commands
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-900 border border-green-500/30 rounded-lg p-4 relative z-0">
              <h3 className="text-green-400 font-bold mb-3">
                <i className="ri-information-line mr-2"></i>
                Visible Commands
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 text-xs max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar pr-1">
                {visibleCommands.map((cmd) => {
                  const isCustom = !Object.values(BUILT_IN_COMMANDS).some(
                    (builtIn) => builtIn.name.split(" ")[0] === cmd.command
                  );

                  return (
                    <button
                      key={cmd.command}
                      type="button"
                      onClick={() => runCommand(cmd.command)}
                      className={`text-left rounded border px-3 py-2 transition-colors ${
                        isCustom
                          ? "border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-500/10"
                          : "border-green-500/30 bg-black/60 hover:bg-green-500/10"
                      }`}
                    >
                      <div
                        className={`font-bold ${
                          isCustom ? "text-cyan-300" : "text-green-400"
                        }`}
                      >
                        {cmd.command}
                      </div>
                      <div className="text-gray-400 line-clamp-1">
                        {cmd.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Message panel */}
          <motion.div
            ref={messagePanelRef}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-900 border border-green-400 rounded-lg overflow-hidden shadow-lg shadow-green-400/10">
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

              <div className="p-5 font-mono text-sm space-y-4">
                <div>
                  <div className="text-green-400 mb-3">
                    <span className="text-yellow-400">#</span> contact_info
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <span className="text-blue-400 min-w-[80px]">email:</span>
                      <a
                        href={profile?.email ? `mailto:${profile.email}` : "#"}
                        className="text-green-300 hover:text-green-100 hover:underline break-all"
                      >
                        {profile?.email || "N/A"}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-blue-400 min-w-[80px]">phone:</span>
                      <a
                        href={
                          profile?.phone
                            ? `tel:${profile.phone.replace(/[^+\d]/g, "")}`
                            : "#"
                        }
                        className="text-green-300 hover:text-green-100 hover:underline"
                      >
                        {profile?.phone || "N/A"}
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-blue-400 min-w-[80px]">
                        location:
                      </span>
                      <span className="text-green-300">
                        {profile?.location || "N/A"}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span className="text-blue-400 min-w-[80px]">
                        status:
                      </span>
                      <span className="text-green-300">
                        available for QA work
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-400/30">
                  <div className="text-green-400 mb-3">quick_actions:</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runCommand("whoami")}
                      className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    >
                      ./whoami.sh
                    </button>
                    <button
                      type="button"
                      onClick={() => runCommand("social")}
                      className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    >
                      ./social.sh
                    </button>
                    <button
                      type="button"
                      onClick={() => runCommand("send")}
                      className="bg-gray-800 hover:bg-green-900 border border-green-400 text-green-300 hover:text-green-100 px-3 py-1 rounded text-xs font-mono transition-colors"
                    >
                      ./send_message.sh
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showForm && (
              <motion.div
                className="bg-gray-900 border border-green-500/30 rounded-lg p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Message
                  </h3>
                  <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="text-gray-400 hover:text-white transition"
                    type="button"
                  >
                    <i className="ri-eye-line text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-green-400 block mb-1">
                        Your Name
                      </label>
                      <input
                        {...register("visitorName", {
                          required: "Name is required",
                        })}
                        className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none ${
                          errors.visitorName
                            ? "border-red-500"
                            : "border-green-500/30 focus:border-green-400"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.visitorName && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.visitorName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-green-400 block mb-1">
                        Email
                      </label>
                      <input
                        {...register("visitorEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email",
                          },
                        })}
                        type="email"
                        className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none ${
                          errors.visitorEmail
                            ? "border-red-500"
                            : "border-green-500/30 focus:border-green-400"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.visitorEmail && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.visitorEmail.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-green-400 block mb-1">
                      Subject
                    </label>
                    <input
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none ${
                        errors.subject
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-green-400 block mb-1">
                      Message
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      rows={5}
                      className={`w-full px-3 py-2 bg-gray-800 border rounded text-white focus:outline-none resize-none ${
                        errors.message
                          ? "border-red-500"
                          : "border-green-500/30 focus:border-green-400"
                      }`}
                      placeholder="Your message here..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-green-500/30 text-green-400 rounded hover:bg-green-500/10 transition"
                    >
                      Hide
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white rounded transition disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-4">
              <div className="text-green-400 font-bold mb-2">
                <i className="ri-terminal-box-line mr-2"></i>
                Functional Highlights
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Terminal commands run on the left panel.</li>
                <li>• Message composer stays on the right panel.</li>
                <li>• Quick actions open terminal commands instantly.</li>
                <li>• Form validation and toast feedback remain active.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
