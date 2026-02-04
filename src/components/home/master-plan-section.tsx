"use client";

import { motion } from "motion/react";
import { Shield, Swords, Gavel, Rocket, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MasterPlanSection() {
  return (
    <section id="master-plan" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-4xl relative">
        {/* Background Connector Line */}
        <div className="absolute left-4 md:left-1/2 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-4 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 md:hidden" />

        {/* Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold"
          >
            // Strategic Framework
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            The Zharnyx <span className="text-purple-500">Master Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 font-mono text-sm uppercase tracking-wide"
          >
            Every phase has a filter. No one passes by luck.
          </motion.p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 relative z-10">
          <TimelineItem
            phase="Phase 1"
            title="Foundation"
            period="Month 1-2"
            description="Core security fundamentals, lab setup, linux & network mastery."
            icon={<Shield size={24} />}
            color="blue"
            alignment="left"
            delay={0.1}
          />

          <TimelineItem
            phase="Phase 2"
            title="Red vs Blue Combat"
            period="Month 3-4"
            description="Offensive & defensive operations, live fire war games, team rotations."
            icon={<Swords size={24} />}
            color="purple"
            alignment="right"
            delay={0.2}
          />

          <TimelineItem
            phase="Phase 3"
            title="Tribunal & Red Zone"
            period="Month 5"
            description="Performance evaluation, remediation, and final gatekeeping exam."
            icon={<Gavel size={24} />}
            color="red"
            alignment="left"
            delay={0.3}
          />

          <TimelineItem
            phase="Phase 4"
            title="Deployment"
            period="Month 6"
            description="3-tier placement, real-world exposure, and career launch."
            icon={<Rocket size={24} />}
            color="red"
            alignment="right"
            delay={0.4}
          />
        </div>

        {/* Footer Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border-2 border-white/10 rounded-full">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100" />
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-200" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              War Rooms • Tribunal Gatekeeping • 3-Tier Deployment
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

interface TimelineItemProps {
  phase: string;
  title: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "purple" | "red";
  alignment: "left" | "right";
  delay: number;
}

function TimelineItem({ phase, title, period, description, icon, color, alignment, delay }: TimelineItemProps) {
  const isLeft = alignment === "left";

  const colorMap = {
    blue: {
      border: "border-blue-600",
      text: "text-blue-500",
      bg: "bg-blue-600",
      shadow: "shadow-[8px_8px_0px_0px_#2563eb]"
    },
    purple: {
      border: "border-purple-600",
      text: "text-purple-500",
      bg: "bg-purple-600",
      shadow: "shadow-[8px_8px_0px_0px_#9333ea]"
    },
    red: {
      border: "border-red-600",
      text: "text-red-500",
      bg: "bg-red-600",
      shadow: "shadow-[8px_8px_0px_0px_#ef4444]"
    }
  };

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        "flex md:items-center gap-8 md:gap-0",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Content Card */}
      <div className={cn("flex-1 md:w-1/2", isLeft ? "md:pr-24" : "md:pl-24 pl-16")}>
        <div className={cn(
          "p-6 bg-black border-2 relative group hover:-translate-y-1 transition-transform",
          "border-white", // Base border white
          theme.shadow
        )}>
          {/* Colored Top Bar */}
          <div className={cn("absolute top-0 left-0 w-full h-1", theme.bg)} />

          <div className="flex flex-col gap-2">
            <span className={cn("font-mono text-xs uppercase tracking-widest", theme.text)}>
              {period}
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              {title}
            </h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Center Icon Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className={cn(
          "w-12 h-12 bg-black border-2 flex items-center justify-center z-10",
          theme.border,
          theme.text
        )}>
          {icon}
        </div>
      </div>

      {/* Empty Space for Grid Layout */}
      <div className="flex-1 md:w-1/2" />
    </motion.div>
  );
}
