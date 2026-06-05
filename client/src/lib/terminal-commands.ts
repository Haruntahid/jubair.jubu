/**
 * Terminal Command Utilities
 * Built-in commands for the contact terminal session
 */

export interface CommandResult {
  output: string;
  type: "success" | "error" | "info" | "output";
  timestamp: string;
}

export interface TerminalCommandData {
  command: string;
  description: string;
  output: string;
  category?: string;
  active?: boolean;
  order?: number;
}

export const BUILT_IN_COMMANDS = {
  help: {
    name: "help",
    description: "Show available commands",
    category: "System",
  },
  whoami: {
    name: "whoami",
    description: "Display current user information",
    category: "System",
  },
  clear: {
    name: "clear",
    description: "Clear terminal history",
    category: "System",
  },
  date: {
    name: "date",
    description: "Show current date and time",
    category: "System",
  },
  contact: {
    name: "contact",
    description: "Show contact information",
    category: "Contact",
  },
  email: {
    name: "email <message>",
    description: "Send email message",
    category: "Contact",
  },
  social: {
    name: "social",
    description: "Show social media links",
    category: "Contact",
  },
  send: {
    name: "send",
    description: "Open contact form",
    category: "Contact",
  },
  status: {
    name: "status",
    description: "Check system status",
    category: "System",
  },
  echo: {
    name: "echo <text>",
    description: "Echo text to terminal",
    category: "System",
  },
  pwd: {
    name: "pwd",
    description: "Print working directory",
    category: "System",
  },
};

export const executeCommand = (
  command: string,
  profileData?: any,
  dynamicCommands: TerminalCommandData[] = []
): CommandResult[] => {
  const cmd = command.trim().toLowerCase();
  const results: CommandResult[] = [];
  const timestamp = new Date().toLocaleTimeString();

  // Parse command and arguments
  const parts = cmd.split(/\s+/);
  const mainCmd = parts[0];
  const args = parts.slice(1).join(" ");

  const customCommand = dynamicCommands.find(
    (item) => item.active !== false && item.command.toLowerCase() === mainCmd
  );

  if (customCommand) {
    const resolvedOutput = customCommand.output
      .replace(/\{name\}/gi, profileData?.name || "Guest")
      .replace(/\{role\}/gi, profileData?.role || "QA Engineer")
      .replace(/\{email\}/gi, profileData?.email || "contact@example.com")
      .replace(/\{phone\}/gi, profileData?.phone || "N/A")
      .replace(/\{location\}/gi, profileData?.location || "N/A");

    return [
      {
        output: resolvedOutput,
        type: "output",
        timestamp,
      },
    ];
  }

  switch (mainCmd) {
    case "help":
      results.push({
        output:
          "Available Commands:\n" +
          Object.entries(BUILT_IN_COMMANDS)
            .map(([_, cmd]) => `  ${cmd.name.padEnd(25)} - ${cmd.description}`)
            .join("\n"),
        type: "info",
        timestamp,
      });
      break;

    case "whoami":
      results.push({
        output: `user: ${profileData?.name || "qa-engineer"}`,
        type: "output",
        timestamp,
      });
      results.push({
        output: `role: ${profileData?.role || "QA Engineer"}`,
        type: "output",
        timestamp,
      });
      results.push({
        output: `experience: ${profileData?.yearsOfExperience || 2} years`,
        type: "output",
        timestamp,
      });
      break;

    case "contact":
      results.push({
        output: `Email: ${profileData?.email || "contact@example.com"}`,
        type: "output",
        timestamp,
      });
      results.push({
        output: `Phone: ${profileData?.phone || "+880-164-576-3353"}`,
        type: "output",
        timestamp,
      });
      results.push({
        output: `Location: ${profileData?.location || "Dhaka, Bangladesh"}`,
        type: "output",
        timestamp,
      });
      break;

    case "email":
      results.push({
        output: args
          ? `Email draft captured: ${args}`
          : "Usage: email <message>",
        type: args ? "success" : "info",
        timestamp,
      });
      break;

    case "social":
      results.push({
        output: "Social Media Links:",
        type: "info",
        timestamp,
      });
      if (profileData?.github) {
        results.push({
          output: `  GitHub: ${profileData.github}`,
          type: "output",
          timestamp,
        });
      }
      if (profileData?.linkedin) {
        results.push({
          output: `  LinkedIn: ${profileData.linkedin}`,
          type: "output",
          timestamp,
        });
      }
      if (profileData?.twitter) {
        results.push({
          output: `  Twitter: ${profileData.twitter}`,
          type: "output",
          timestamp,
        });
      }
      break;

    case "date":
      results.push({
        output: new Date().toString(),
        type: "output",
        timestamp,
      });
      break;

    case "echo":
      results.push({
        output: args || "",
        type: "output",
        timestamp,
      });
      break;

    case "pwd":
      results.push({
        output: "/home/qa-engineer/portfolio",
        type: "output",
        timestamp,
      });
      break;

    case "status":
      results.push({
        output: "System Status Report",
        type: "info",
        timestamp,
      });
      results.push({
        output: "  Database: ✓ Connected",
        type: "success",
        timestamp,
      });
      results.push({
        output: "  API Server: ✓ Running",
        type: "success",
        timestamp,
      });
      results.push({
        output: "  Auth: ✓ Authenticated",
        type: "success",
        timestamp,
      });
      break;

    case "send":
      results.push({
        output: "Opening contact form...",
        type: "info",
        timestamp,
      });
      break;

    case "clear":
      results.push({
        output: "CLEAR",
        type: "info",
        timestamp,
      });
      break;

    default:
      results.push({
        output: `command not found: ${mainCmd}`,
        type: "error",
        timestamp,
      });
      results.push({
        output: `Type 'help' to see available commands`,
        type: "info",
        timestamp,
      });
  }

  return results;
};

export const getDefaultIconForCategory = (category: string): string => {
  const iconMap: Record<string, string> = {
    tutorial: "ri-graduation-cap-line",
    guide: "ri-book-line",
    snippet: "ri-code-line",
    testing: "ri-test-tube-line",
    automation: "ri-robot-line",
    article: "ri-article-line",
    resource: "ri-file-text-line",
    tool: "ri-tools-line",
    tip: "ri-lightbulb-line",
    default: "ri-file-text-line",
  };

  return iconMap[category.toLowerCase()] || iconMap.default;
};

export const getDefaultImageForCategory = (category: string): string => {
  const images: Record<string, string> = {
    tutorial: "📚",
    guide: "📖",
    snippet: "💻",
    testing: "🧪",
    automation: "🤖",
    article: "📄",
    resource: "📦",
    tool: "🔧",
    tip: "💡",
    default: "📝",
  };

  return images[category.toLowerCase()] || images.default;
};
