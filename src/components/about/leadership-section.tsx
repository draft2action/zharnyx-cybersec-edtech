"use client";

import { motion } from "motion/react";
import { User, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-red-500 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-red-500/30 px-4 py-2 bg-red-900/10">
          Leadership
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
          The Builders
        </h2>
        <p className="text-gray-400 font-mono text-base uppercase tracking-wide font-bold">
          Practitioners. Founders. Mentors.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <LeaderCard name="Sanjai R" role="Founder" delay={0.1} color="red" />
        <LeaderCard
          name="A. Amirthavarshini"
          role="Program Director"
          delay={0.2}
          color="blue"
        />
        <LeaderCard
          name="Navindh A"
          role="Co-Founder"
          delay={0.3}
          color="purple"
        />
        <LeaderCard
          name="Antony Shane"
          role="Project Partner"
          delay={0.4}
          color="red"
        />
      </div>
    </section>
  );
}

function LeaderCard({
  name,
  role,
  delay,
  color,
}: {
  name: string;
  role: string;
  delay: number;
  color: "red" | "blue" | "purple";
}) {
  const colorMap = {
    red: {
      hover: "hover:border-red-500 hover:shadow-[12px_12px_0px_0px_#ef4444]",
      iconBg:
        "bg-red-900/10 border-red-500/30 group-hover:bg-red-500/20 group-hover:border-red-500",
      iconColor: "text-red-500",
      roleBorder: "border-red-500/20 bg-red-500/10 text-red-500",
      overlay: "group-hover:bg-red-500/10",
    },
    blue: {
      hover: "hover:border-blue-500 hover:shadow-[12px_12px_0px_0px_#3b82f6]",
      iconBg:
        "bg-blue-900/10 border-blue-500/30 group-hover:bg-blue-500/20 group-hover:border-blue-500",
      iconColor: "text-blue-500",
      roleBorder: "border-blue-500/20 bg-blue-500/10 text-blue-500",
      overlay: "group-hover:bg-blue-500/10",
    },
    purple: {
      hover: "hover:border-purple-500 hover:shadow-[12px_12px_0px_0px_#a855f7]",
      iconBg:
        "bg-purple-900/10 border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-500",
      iconColor: "text-purple-500",
      roleBorder: "border-purple-500/20 bg-purple-500/10 text-purple-500",
      overlay: "group-hover:bg-purple-500/10",
    },
  };

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-black border-2 border-white/20 p-0 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-2 overflow-hidden",
        theme.hover
      )}
    >
      <div
        className={cn(
          "w-full h-64 bg-zinc-900 flex items-center justify-center border-b-2 border-white/20 group-hover:border-current transition-colors relative"
        )}
      >
        <User
          className={cn(
            "w-24 h-24 text-zinc-700 transition-colors duration-300",
            `group-hover:${theme.iconColor}`
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-transparent transition-colors duration-300 mix-blend-overlay",
            theme.overlay
          )}
        ></div>
      </div>

      <div className="p-8 w-full bg-black">
        <h3 className="text-xl font-black text-white uppercase mb-2 tracking-tight">
          {name}
        </h3>
        <p
          className={cn(
            "font-mono text-xs font-bold uppercase tracking-wider mb-6 border-2 inline-block px-3 py-1",
            theme.roleBorder
          )}
        >
          {role}
        </p>

        <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/10">
          <a
            href="#"
            className="p-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="p-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
