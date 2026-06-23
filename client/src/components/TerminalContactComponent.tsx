import { useState, useRef, useEffect } from "react";
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
import { getProfileSocialLinks } from "@shared/social";

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

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 flex items-center border-b border-green-400/60 dark:border-green-400 bg-gray-200 dark:bg-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <div className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <div className="flex-1 text-center font-mono text-sm truncate px-2 text-green-700 dark:text-green-400">
        {title}
      </div>
    </div>
  );
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

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = terminalScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [terminalLines]);

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
    }),
  );

  const visibleCommands = [...normalizedBuiltinCommands, ...terminalCommandData]
    .filter((cmd) => cmd.active !== false)
    .reduce<TerminalCommandData[]>((acc, current) => {
      const existingIndex = acc.findIndex(
        (item) => item.command === current.command,
      );
      if (existingIndex === -1) acc.push(current);
      return acc;
    }, [])
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const socialLinks = getProfileSocialLinks(profile);

  const runCommand = (command: string) => {
    handleExecuteCommand(command);
    inputRef.current?.focus();
  };

  const handleExecuteCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInputValue("");
    addLine({ type: "command", content: `$ ${cmd}` });

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
      toast({ title: "Success", description: "Your message has been sent." });
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

  // ── line color: different per theme ──────────────────────────────────────
  const lineClass = (line: TerminalLine) => {
    if (isBannerLine(line))
      return "w-full text-center text-blue-600 dark:text-blue-400 whitespace-pre overflow-hidden";
    switch (line.type) {
      case "command":
        return "flex items-start gap-2 text-green-700 dark:text-green-400 font-bold";
      case "success":
        return "flex items-start gap-2 text-emerald-700 dark:text-green-300";
      case "error":
        return "flex items-start gap-2 text-red-600 dark:text-red-400";
      case "info":
        return "flex items-start gap-2 text-blue-700 dark:text-blue-400";
      default:
        return "flex items-start gap-2 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gray-50 dark:bg-black text-green-700 dark:text-green-400"
    >
      <div className="max-w-6xl mx-auto">
        {/* heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            <i className="ri-terminal-box-line mr-2" />
            Contact Terminal
          </h2>
          <p className="text-green-700 dark:text-green-500">
            Execute commands to connect · Type 'help' for commands
          </p>
        </div>

        {/* ROW 1 — Terminal + Composer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* LEFT: Terminal */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 border border-green-400/60 dark:border-green-400 rounded-lg overflow-hidden shadow-lg dark:shadow-green-400/10 flex flex-col">
              <WindowChrome title="terminal — contact_session.sh" />

              {/* scrollable output */}
              <div
                ref={terminalScrollRef}
                className="p-4 font-mono text-sm h-80 overflow-y-auto overflow-x-hidden no-scrollbar space-y-1 bg-gray-50 dark:bg-black"
              >
                {terminalLines.map((line, idx) => (
                  <div key={idx} className={lineClass(line)}>
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

              {/* input bar */}
              <div className="bg-gray-100 dark:bg-black border-t border-green-400/40 dark:border-green-500 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    $
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-green-700 dark:text-green-400 outline-none font-mono placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    placeholder="Type a command..."
                  />
                  <span className="text-green-500 animate-pulse">▌</span>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">
                  Use ↑↓ for history · Type 'help' for commands
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact info */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 border border-green-400/60 dark:border-green-400 rounded-lg overflow-hidden shadow-lg dark:shadow-green-400/10 flex flex-col h-full">
              <WindowChrome title="message_composer.exe" />

              <div className="p-5 font-mono text-sm flex-1">
                <div className="text-green-700 dark:text-green-400 mb-4">
                  <span className="text-amber-600 dark:text-yellow-400">#</span>{" "}
                  contact_info
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="grid grid-cols-[88px_1fr] items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      email:
                    </span>
                    <a
                      href={profile?.email ? `mailto:${profile.email}` : "#"}
                      className="text-green-700 dark:text-green-300 hover:underline break-all"
                    >
                      {profile?.email || "N/A"}
                    </a>
                  </div>
                  <div className="grid grid-cols-[88px_1fr] items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      phone:
                    </span>
                    <a
                      href={
                        profile?.phone
                          ? `tel:${profile.phone.replace(/[^+\d]/g, "")}`
                          : "#"
                      }
                      className="text-green-700 dark:text-green-300 hover:underline"
                    >
                      {profile?.phone || "N/A"}
                    </a>
                  </div>
                  <div className="grid grid-cols-[88px_1fr] items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      location:
                    </span>
                    <span className="text-green-700 dark:text-green-300">
                      {profile?.location || "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-[88px_1fr] items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      status:
                    </span>
                    <span className="text-green-700 dark:text-green-300">
                      available for QA work
                    </span>
                  </div>

                  {socialLinks.length > 0 && (
                    <div className="grid grid-cols-[88px_1fr] items-start gap-2 pt-2 border-t border-green-400/20">
                      <span className="text-blue-600 dark:text-blue-400">
                        social:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {socialLinks.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 hover:underline text-xs"
                          >
                            <i className={link.icon} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-5 border-t border-green-400/30">
                  <div className="text-green-700 dark:text-green-400 mb-3 text-xs uppercase tracking-wide">
                    quick_actions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { cmd: "whoami", label: "./whoami.sh" },
                      { cmd: "social", label: "./social.sh" },
                      { cmd: "send", label: "./send_message.sh" },
                    ].map(({ cmd, label }) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => runCommand(cmd)}
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 border border-green-500/50 dark:border-green-400 text-green-700 dark:text-green-300 px-3 py-1 rounded text-xs font-mono transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 2 — Commands + Send Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Commands */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 border border-green-500/30 rounded-lg p-4 h-full">
              <h3 className="text-green-700 dark:text-green-400 font-bold mb-3">
                <i className="ri-information-line mr-2" />
                Visible Commands
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar pr-1">
                {visibleCommands.map((cmd) => {
                  const isCustom = !Object.values(BUILT_IN_COMMANDS).some(
                    (builtIn) => builtIn.name.split(" ")[0] === cmd.command,
                  );
                  return (
                    <button
                      key={cmd.command}
                      type="button"
                      onClick={() => runCommand(cmd.command)}
                      className={`text-left rounded border px-3 py-2 transition-colors ${
                        isCustom
                          ? "border-cyan-400/40 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-500/10"
                          : "border-green-400/30 dark:border-green-500/30 bg-gray-50 dark:bg-black/60 hover:bg-green-50 dark:hover:bg-green-500/10"
                      }`}
                    >
                      <div
                        className={`font-bold ${isCustom ? "text-cyan-700 dark:text-cyan-300" : "text-green-700 dark:text-green-400"}`}
                      >
                        {cmd.command}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 line-clamp-1">
                        {cmd.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-green-500/20">
                <div className="text-green-700 dark:text-green-400 font-bold mb-2 text-sm">
                  <i className="ri-terminal-box-line mr-2" />
                  Session Tips
                </div>
                <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <li>• Built-in commands: clear, date, echo, help, social</li>
                  <li>• Custom commands are managed from the admin panel</li>
                  <li>• Use ↑↓ for command history in the terminal</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Send Message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            viewport={{ once: true }}
          >
            {showForm ? (
              <div className="bg-white dark:bg-gray-900 border border-green-500/30 rounded-lg p-6 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <i className="ri-mail-send-line mr-2" />
                    Send Message
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                    type="button"
                    aria-label="Hide form"
                  >
                    <i className="ri-close-line text-xl" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-green-700 dark:text-green-400 block mb-1">
                        Your Name
                      </label>
                      <input
                        {...register("visitorName", {
                          required: "Name is required",
                        })}
                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-gray-900 dark:text-white focus:outline-none ${
                          errors.visitorName
                            ? "border-red-500"
                            : "border-gray-300 dark:border-green-500/30 focus:border-green-500 dark:focus:border-green-400"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.visitorName && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                          {errors.visitorName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-green-700 dark:text-green-400 block mb-1">
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
                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-gray-900 dark:text-white focus:outline-none ${
                          errors.visitorEmail
                            ? "border-red-500"
                            : "border-gray-300 dark:border-green-500/30 focus:border-green-500 dark:focus:border-green-400"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.visitorEmail && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                          {errors.visitorEmail.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-green-700 dark:text-green-400 block mb-1">
                      Subject
                    </label>
                    <input
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-gray-900 dark:text-white focus:outline-none ${
                        errors.subject
                          ? "border-red-500"
                          : "border-gray-300 dark:border-green-500/30 focus:border-green-500 dark:focus:border-green-400"
                      }`}
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-green-700 dark:text-green-400 block mb-1">
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
                      rows={4}
                      className={`w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded text-gray-900 dark:text-white focus:outline-none resize-none ${
                        errors.message
                          ? "border-red-500"
                          : "border-gray-300 dark:border-green-500/30 focus:border-green-500 dark:focus:border-green-400"
                      }`}
                      placeholder="Your message here..."
                    />
                    {errors.message && (
                      <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-green-500/30 text-gray-600 dark:text-green-400 rounded hover:bg-gray-100 dark:hover:bg-green-500/10 transition"
                    >
                      Hide
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-400 text-white rounded transition disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full h-full min-h-[120px] rounded-lg border border-dashed border-green-500/30 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/5 transition text-sm font-mono"
              >
                <i className="ri-mail-add-line mr-2" />
                Show message form
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
