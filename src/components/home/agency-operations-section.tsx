"use client";

import { motion } from "motion/react";
import { Rocket, Monitor, BookOpen, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function AgencyOperationsSection() {
  return (
    <section id="agency-ops" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-white/20 rounded-full bg-white/5 text-xs font-mono text-gray-400 uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Month 6 // Entity B: Zharnyx Labs
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            The <span className="text-red-500">3-Tier</span>{" "}
            <span className="text-purple-500">Agency</span> Operations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 font-mono text-sm max-w-3xl mx-auto"
          >
            Students operate as &quot;Junior Security Consultants&quot; under
            the supervision of the Zharnyx SOC Manager. Placement is determined
            by Crucible performance.
          </motion.p>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-20">
          {/* Tier 1: The Elite */}
          <TierCard
            tier="Tier 1"
            title="The Elite"
            percent="Top 20%"
            subtitle="Partner Companies (SMEs, Startups)"
            icon={<Rocket size={24} />}
            badge="1-Month Unpaid Industrial"
            description="Sent to Partner Companies for a 1-month unpaid industrial exposure. Real-world networking and a potential job offer from the partner."
            benefit="Real-world networking and a potential job offer from the partner."
            color="red"
            delay={0.1}
          />

          {/* Tier 2: The Core */}
          <TierCard
            tier="Tier 2"
            title="The Core"
            percent="Middle 70%"
            subtitle="Zharnyx Internal Internship"
            icon={<Monitor size={24} />}
            badge="Managed Operations"
            description="Students log into Zharnyx's internal company for the 1-month internship. Real Data: We feed sanitized real attack logs (from open-source datasets or partner NGOs) into the system."
            benefit="A 'Service Record' certificate certifying 'Completed Operations.'"
            color="blue"
            delay={0.2}
          />

          {/* Tier 3: The Failed Members */}
          <TierCard
            tier="Tier 3"
            title="The Failed Members"
            percent="Bottom 10%"
            subtitle="Remediation Track"
            icon={<BookOpen size={24} />}
            badge="Re-learn & Retest"
            description="Re-learn all the concepts within 3 weeks and the final week retest the war. Pass = get internship in Zharnyx (7th month addition). Fail = get the completion certificate and all 5 monthly project certificates."
            benefit="A second chance to prove competence with extended 7th month internship."
            color="gray"
            delay={0.3}
          />
        </div>

        {/* Top 5% Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-red-900/20 to-purple-900/20 border-2 border-red-500/30 p-8 md:p-10 mb-20 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="shrink-0 p-4 bg-red-600 text-black border-2 border-white shadow-[4px_4px_0px_0px_white]">
              <Crown size={32} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                The Top 5%
              </h3>
              <p className="text-gray-400 mb-6 font-mono text-sm">
                Top 5% from all tiers get unique guidelines and personalized
                roadmap
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "LinkedIn optimization",
                  "Resume development",
                  "Portfolio development",
                  "Project guiding and report",
                  "Next company internship help and guide",
                  "Referrals",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-black border border-white/20 text-xs font-mono text-gray-300 uppercase hover:border-white transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatBox number="3" label="Deployment Tiers" highlight="text-white" />
          <StatBox
            number="100%"
            label="Exposure Guarantee"
            highlight="text-purple-500"
          />
          <StatBox
            number="Top 5%"
            label="Elite Program"
            highlight="text-purple-500"
          />
          <StatBox
            number="NDA"
            label="Professional Contracts"
            highlight="text-purple-500"
          />
        </div>
      </div>
    </section>
  );
}

interface TierCardProps {
  tier: string;
  title: string;
  percent: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  benefit: string;
  color: "red" | "blue" | "gray";
  delay: number;
}

function TierCard({
  tier,
  title,
  percent,
  subtitle,
  icon,
  badge,
  description,
  benefit,
  color,
  delay,
}: TierCardProps) {
  const colorMap = {
    red: {
      border: "border-red-600",
      text: "text-red-500",
      bg: "bg-red-500/10",
      hover: "group-hover:text-red-500",
      shadow: "hover:shadow-[8px_8px_0px_0px_#ef4444]",
    },
    blue: {
      border: "border-blue-500",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      hover: "group-hover:text-blue-400",
      shadow: "hover:shadow-[8px_8px_0px_0px_#3b82f6]",
    },
    gray: {
      border: "border-gray-600",
      text: "text-gray-400",
      bg: "bg-gray-500/10",
      hover: "group-hover:text-gray-300",
      shadow: "hover:shadow-[8px_8px_0px_0px_#4b5563]",
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
        "group relative bg-black border-2 p-8 h-full flex flex-col transition-all duration-300 border-white/20 hover:-translate-y-2 hover:border-white",
        theme.shadow
      )}
    >
      {/* Top Badge */}
      <div
        className={cn(
          "absolute -top-3 right-6 px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black border",
          theme.border,
          theme.text
        )}
      >
        {percent}
      </div>

      <div className="flex justify-between items-start mb-6">
        <div
          className={cn(
            "p-3 border-2 rounded-lg bg-black text-white",
            theme.border
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-xs font-mono text-gray-500 mb-1 uppercase">
          {tier}
        </div>
        <h3 className="text-2xl font-black text-white uppercase mb-2">
          {title}
        </h3>
        <div className={cn("text-xs font-bold uppercase", theme.text)}>
          {subtitle}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-3 mb-6 flex items-center gap-3">
        <Star
          size={14}
          className="text-yellow-500 shrink-0"
          fill="currentColor"
        />
        <span className="text-xs font-bold text-gray-200 uppercase">
          {badge}
        </span>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-8 grow">
        {description}
      </p>

      <div
        className={cn(
          "mt-auto pt-6 border-t border-white/10 text-xs font-medium",
          theme.text
        )}
      >
        <span className="font-bold mr-1 text-white/50">{">"} Benefit:</span>{" "}
        {benefit}
      </div>
    </motion.div>
  );
}

function StatBox({
  number,
  label,
  highlight,
}: {
  number: string;
  label: string;
  highlight?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-6 border-2 border-white/10 bg-white/5 text-center hover:border-white/30 transition-colors"
    >
      <div
        className={cn("text-3xl font-black mb-1", highlight || "text-white")}
      >
        {number}
      </div>
      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}
