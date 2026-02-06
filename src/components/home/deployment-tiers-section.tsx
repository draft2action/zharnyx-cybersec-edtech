"use client";

import { motion } from "motion/react";
import { Briefcase, FolderArchive, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeploymentTiersSection() {
  return (
    <section id="deployment-tiers" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold"
          >
            // Deployment Tiers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none"
          >
            Everyone Works. <br />
            <span className="text-blue-500">No One Is Thrown Away.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 font-mono text-sm max-w-2xl mx-auto"
          >
            Three tiers of deployment. Every graduate gets real-world exposure.
          </motion.p>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-20">
          {/* Tier A */}
          <DeploymentCard
            tier="Tier A"
            title="Partner Micro-Internship"
            icon={<Briefcase size={28} />}
            description="Top performers placed directly with partner security firms for real client work."
            color="red"
            delay={0.1}
            isTopTier={true}
          />

          {/* Tier B */}
          <DeploymentCard
            tier="Tier B"
            title="Zharnyx Client Projects"
            icon={<FolderArchive size={28} />}
            description="Work on Zharnyx's own security consulting projects with full mentorship."
            color="blue"
            delay={0.2}
          />

          {/* Tier C */}
          <DeploymentCard
            tier="Tier C"
            title="Incubator & Shadowing"
            icon={<GraduationCap size={28} />}
            description="Extended support with senior shadowing and incubator access until placement."
            color="purple"
            delay={0.3}
          />
        </div>

        {/* Footer Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl text-white font-bold">
            "Exposure is guaranteed. <span className="text-blue-500">Employment is earned.</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
}

function DeploymentCard({ tier, title, icon, description, color, delay, isTopTier }: { tier: string, title: string, icon: React.ReactNode, description: string, color: "red" | "blue" | "purple", delay: number, isTopTier?: boolean }) {

  const colorMap = {
    red: {
      border: "border-red-600",
      text: "text-red-500",
      bg: "bg-red-500/10",
      shadow: "hover:shadow-[8px_8px_0px_0px_#ef4444]"
    },
    blue: {
      border: "border-blue-600",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      shadow: "hover:shadow-[8px_8px_0px_0px_#2563eb]"
    },
    purple: {
      border: "border-purple-600",
      text: "text-purple-500",
      bg: "bg-purple-500/10",
      shadow: "hover:shadow-[8px_8px_0px_0px_#9333ea]"
    }
  }

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        "group relative bg-black border-2 p-8 flex flex-col items-center text-center transition-all duration-300",
        isTopTier ? "border-red-600" : "border-white/20 hover:border-white",
        theme.shadow
      )}
    >
      {isTopTier && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest border-2 border-white">
          Top Tier
        </div>
      )}

      <div className={cn("text-xs font-mono font-bold uppercase mb-6", theme.text)}>
        {tier}
      </div>

      <div className={cn("p-4 border-2 rounded-none mb-6 text-white group-hover:scale-110 transition-transform bg-white/5", isTopTier ? "border-red-600 bg-red-600 text-black" : "border-white/20")}>
        {icon}
      </div>

      <h3 className="text-xl font-black text-white uppercase mb-4 leading-tight">{title}</h3>

      <p className="text-sm text-gray-400 font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
