"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function JourneySection() {
  return (
    <section id="journey" className="py-32 px-4 md:px-8 max-w-5xl mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-red-500 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-red-500/30 px-4 py-2 bg-red-900/10">
          Timeline
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
          Our Journey
        </h2>
      </motion.div>

      <div className="relative pl-8 md:pl-0">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-[19px] top-0 bottom-0 w-1 bg-white/10 md:hidden"></div>

        <div className="space-y-16">
          <TimelineItem
            date="Dec 2025"
            title="Zharnyx Founded"
            description="Purple Team Pathway concept developed & curriculum finalized."
            side="left"
            delay={0.1}
            color="red"
          />
          <TimelineItem
            date="Jan 2026"
            title="First Cohort Launch"
            description="Starting with first batch of 50 elite students."
            side="right"
            delay={0.2}
            color="blue"
          />
          <TimelineItem
            date="Q2 2026"
            title="500 Students Goal"
            description="Scaling online training operations to reach global talent."
            side="left"
            delay={0.3}
            color="purple"
          />
          <TimelineItem
            date="Late 2026"
            title="Industry Expansion"
            description="Partnerships with top MSSPs and SOCs for direct placements."
            side="right"
            delay={0.4}
            color="red"
          />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  date,
  title,
  description,
  side,
  delay,
  color,
}: {
  date: string;
  title: string;
  description: string;
  side: "left" | "right";
  delay: number;
  color: "red" | "blue" | "purple";
}) {
  const isLeft = side === "left";

  const colorMap = {
    red: {
      hover: "hover:border-red-500 hover:shadow-[12px_12px_0px_0px_#ef4444]",
      dot: "md:group-hover:border-red-500",
      text: "text-red-500",
    },
    blue: {
      hover: "hover:border-blue-500 hover:shadow-[12px_12px_0px_0px_#3b82f6]",
      dot: "md:group-hover:border-blue-500",
      text: "text-blue-500",
    },
    purple: {
      hover: "hover:border-purple-500 hover:shadow-[12px_12px_0px_0px_#a855f7]",
      dot: "md:group-hover:border-purple-500",
      text: "text-purple-500",
    },
  };

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`flex flex-col md:flex-row items-center w-full relative ${isLeft ? "md:flex-row-reverse" : ""
        } group`}
    >
      {/* Spacer for desktop alignment */}
      <div className="hidden md:block w-1/2"></div>

      {/* Center Dot */}
      <div
        className={cn(
          "absolute left-[5px] md:left-1/2 w-8 h-8 bg-black border-4 border-white rounded-full z-10 -translate-x-1/2 mt-1 md:mt-0 transition-colors shadow-[0_0_0_4px_black]",
          theme.dot
        )}
      ></div>

      {/* Content */}
      <div
        className={`w-full md:w-1/2 pl-14 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
          }`}
      >
        <div
          className={cn(
            "bg-black border-2 border-white/20 p-8 transition-all duration-300 hover:-translate-y-1",
            theme.hover
          )}
        >
          <span
            className={cn(
              "font-mono text-sm font-black uppercase tracking-widest mb-2 block border-b border-white/10 pb-2",
              theme.text
            )}
          >
            {date}
          </span>
          <h3 className="text-2xl font-black text-white uppercase mb-3 leading-none">
            {title}
          </h3>
          <p className="text-gray-400 text-sm font-mono leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
