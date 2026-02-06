"use client";

import { motion } from "motion/react";
import { Target, Shield, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function MethodologySection() {
  return (
    <section id="methodology" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold"
          >
            {/* Core Methodology */}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
          >
            Red Thinks. Blue Defends. <br />
            <span className="text-purple-500">Purple Wins.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 font-mono text-sm max-w-2xl mx-auto"
          >
            Our engineers understand both sides of the battlefield.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (Desktop Only) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-red-900 via-purple-900 to-blue-900 -z-10 hidden md:block" />

          {/* Red Team Card */}
          <MethodologyCard
            title="Red Team"
            icon={<Target size={32} />}
            description="Offensive security. Attack simulation. Vulnerability exploitation."
            bullets={[
              "Penetration Testing",
              "Social Engineering",
              "Exploit Development",
            ]}
            color="red"
            delay={0.1}
          />

          {/* Purple Sync Card */}
          <MethodologyCard
            title="Purple Sync"
            icon={<Zap size={32} />}
            description="The convergence point. Where offense informs defense."
            color="purple"
            delay={0.2}
            isCenter={true}
          />

          {/* Blue Team Card */}
          <MethodologyCard
            title="Blue Team"
            icon={<Shield size={32} />}
            description="Defensive security. Threat detection. Incident response."
            bullets={[
              "SIEM Operations",
              "Threat Hunting",
              "Forensics Analysis",
            ]}
            color="blue"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

interface MethodologyCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  bullets?: string[];
  color: "red" | "blue" | "purple";
  delay: number;
  isCenter?: boolean;
}

function MethodologyCard({
  title,
  icon,
  description,
  bullets,
  color,
  delay,
  isCenter,
}: MethodologyCardProps) {
  const colorMap = {
    red: {
      border: "border-red-600",
      text: "text-red-500",
      shadow: "shadow-[8px_8px_0px_0px_#ef4444]",
      bullet: "bg-red-500",
    },
    blue: {
      border: "border-blue-600",
      text: "text-blue-500",
      shadow: "shadow-[8px_8px_0px_0px_#2563eb]",
      bullet: "bg-blue-500",
    },
    purple: {
      border: "border-purple-600",
      text: "text-purple-500",
      shadow: "shadow-[8px_8px_0px_0px_#9333ea]",
      bullet: "bg-purple-500",
    },
  };

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        "p-8 bg-black border-2 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform",
        theme.border,
        theme.shadow
      )}
    >
      <div
        className={cn(
          "mb-6 p-4 border-2 rounded-none",
          theme.border,
          theme.text,
          "bg-white/5"
        )}
      >
        {icon}
      </div>

      <h3 className={cn("text-2xl font-black uppercase mb-4", theme.text)}>
        {title}
      </h3>

      <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
        {description}
      </p>

      {isCenter ? (
        <div className="mt-auto w-full p-4 border-2 border-purple-500/50 bg-purple-500/10 text-purple-400 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <RefreshCw size={14} className="animate-spin-slow" />
          Feedback Loop Active
        </div>
      ) : (
        <ul className="text-left w-full space-y-3 mt-auto">
          {bullets?.map((bullet, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <span className={cn("w-1.5 h-1.5", theme.bullet)} />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
