import { motion } from "framer-motion";
import {
  SiCypress,
  SiSelenium,
  SiPostman,
  SiApachejmeter,
  SiJira,
  SiGithub,
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiExpress,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiDrizzle,
  SiMongodb,
  SiFramer,
  SiZod,
  SiVite,
  SiNodedotjs,
} from "react-icons/si";
import { TbBrandRadixUi } from "react-icons/tb";

const TOOLS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Express", Icon: SiExpress, color: "#888888" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Drizzle ORM", Icon: SiDrizzle, color: "#C5F74F" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Framer Motion", Icon: SiFramer, color: "#A855F7" },
  { name: "Zod", Icon: SiZod, color: "#3E67B1" },
  { name: "Radix UI", Icon: TbBrandRadixUi, color: "#888888" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", Icon: SiPython, color: "#3572A5" },
  { name: "Java", Icon: SiOpenjdk, color: "#F89820" },
  { name: "GitHub", Icon: SiGithub, color: "#888888" },
  { name: "Jira", Icon: SiJira, color: "#0052CC" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "Cypress", Icon: SiCypress, color: "#31BAF1" },
  { name: "Selenium", Icon: SiSelenium, color: "#43B02A" },
  { name: "JMeter", Icon: SiApachejmeter, color: "#D22128" },
];

const doubled = [...TOOLS, ...TOOLS, ...TOOLS];

export default function Slider() {
  return (
    <div className="relative mt-16 overflow-hidden">
      {/* Top divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      <div className="py-6 sm:py-6 relative overflow-hidden">
        {/* Left fade — matches hero gradient bg in both modes */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-16 sm:w-24 z-10 pointer-events-none" />

        <motion.div
          className="flex w-max"
          style={{ gap: "clamp(1.5rem, 4vw, 2.5rem)" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: TOOLS.length * 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {doubled.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="flex items-center shrink-0 gap-2 group"
              style={{ color: tool.color }}
            >
              <tool.Icon
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  width: "clamp(18px, 3vw, 24px)",
                  height: "clamp(18px, 3vw, 24px)",
                }}
              />
              <span
                className="font-mono font-medium whitespace-nowrap text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200"
                style={{ fontSize: "clamp(11px, 2vw, 14px)" }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="border-b border-gray-200 dark:border-gray-700" />
    </div>
  );
}
