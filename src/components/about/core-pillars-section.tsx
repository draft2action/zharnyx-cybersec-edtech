"use client";

import { motion } from "motion/react";
import { Target, Zap, Users, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function CorePillarsSection() {
  return (
    <section id="core-pillars" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-purple-400 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-purple-500/30 px-4 py-2 bg-purple-900/10">
          Core Pillars
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
          What Makes Us Different
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <PillarCard
          icon={<Target className="w-8 h-8 text-white" />}
          title="Outcome-First Design"
          description="Every module, project, and assessment is reverse-engineered from industry hiring requirements."
          delay={0.1}
          color="red"
        />
        <PillarCard
          icon={<Zap className="w-8 h-8 text-white" />}
          title="Operational Intensity"
          description="We simulate the pressure and pace of real security operations. No passive learning."
          delay={0.2}
          color="blue"
        />
        <PillarCard
          icon={<Users className="w-8 h-8 text-white" />}
          title="Purple Team Philosophy"
          description="Attack and defense are two sides of the same coin. Our engineers understand both."
          delay={0.3}
          color="purple"
        />
        <PillarCard
          icon={<Shield className="w-8 h-8 text-white" />}
          title="Quality Gatekeeping"
          description="Tribunal reviews ensure no one graduates until they're genuinely ready."
          delay={0.4}
          color="green"
        />
      </div>
    </section>
  );
}

function PillarCard({
  icon,
  title,
  description,
  delay,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  color: "red" | "blue" | "purple" | "green";
}) {
  const iconColorMap = {
    red: "bg-red-600 shadow-[8px_8px_0px_0px_#ef4444] border-red-500",
    blue: "bg-blue-600 shadow-[8px_8px_0px_0px_#3b82f6] border-blue-500",
    purple: "bg-purple-600 shadow-[8px_8px_0px_0px_#a855f7] border-purple-500",
    green: "bg-green-600 shadow-[8px_8px_0px_0px_#22c55e] border-green-500",
  };

  const hoverClassMap = {
    red: "hover:border-red-500 hover:shadow-[12px_12px_0px_0px_#ef4444]",
    blue: "hover:border-blue-500 hover:shadow-[12px_12px_0px_0px_#3b82f6]",
    purple: "hover:border-purple-500 hover:shadow-[12px_12px_0px_0px_#a855f7]",
    green: "hover:border-green-500 hover:shadow-[12px_12px_0px_0px_#22c55e]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-black border-2 border-white/20 p-8 flex flex-col items-start hover:-translate-y-2 transition-all duration-300 group h-full",
        hoverClassMap[color]
      )}
    >
      <div
        className={cn(
          "w-16 h-16 flex items-center justify-center border-2 border-black mb-8 transition-transform group-hover:scale-110",
          iconColorMap[color]
        )}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight leading-none">
        {title}
      </h3>
      <p className="text-gray-400 text-sm font-mono font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
