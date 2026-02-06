"use client";

import React from "react";
import {
  Award,
  Briefcase,
  RefreshCcw,
  Trophy,
  Users,
  MoveRight,
  FileText,
  Globe,
  KeyRound,
  MonitorX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function InternshipSection() {
  return (
    <section id="internship" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <span className="text-red-500 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-red-500/30 px-4 py-2 bg-red-900/10">
          Month 6
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter">
          The Three-Tier Internship
        </h2>
        <p className="text-gray-400 max-w-4xl mx-auto font-mono text-sm md:text-base font-medium leading-relaxed mb-4">
          To solve the &quot;Experience Guarantee,&quot; Zharnyx utilizes a
          Three-Tier Hybrid Internship model. This ensures every student,
          regardless of performance, receives a verifiable path to experience.
        </p>
      </motion.div>

      {/* Tiers Grid */}
      <div className="grid md:grid-cols-3 gap-8 items-start mb-24">
        {/* Tier 1: The Elite */}
        <TierCard
          tier="Tier 1"
          title="The Elite"
          percent="Top 20%"
          subtitle="Partner Company Placement"
          icon={<Globe size={28} />}
          badge="Industrial Exposure"
          description="Students are placed with Partner Companies (SMEs, Startups) for a 1-month industrial exposure."
          listItems={[
            "Shadow active security teams",
            "Assist with documentation",
            "Perform basic ticket triage",
          ]}
          color="red"
          delay={0.2}
        />

        {/* Tier 2: The Core */}
        <TierCard
          tier="Tier 2"
          title="The Core"
          percent="Middle 70%"
          subtitle="Zharnyx Internal Internship"
          icon={<KeyRound size={28} />}
          badge="Internal Operations"
          description="Students join the Zharnyx 2nd Company Internal Internship. The platform feeds sanitized real-world attack logs into the student's SIEM."
          listItems={[
            "Operate as on-duty analysts",
            "Real-world attack log analysis",
            "Service Record certificate",
          ]}
          color="blue"
          delay={0.4}
        />

        {/* Tier 3: Recovery Path */}
        <TierCard
          tier="Tier 3"
          title="Recovery Path"
          percent="Bottom 10%"
          subtitle="Extended Support Program"
          icon={<MonitorX size={28} />}
          badge="Re-learn & Retest"
          description="Students who do not meet initial benchmarks undergo an intensive re-learning phase with a second chance."
          listItems={[
            "3-week intensive re-learning",
            "Final War Games retest",
            "7th-month internship eligibility",
          ]}
          color="gray"
          delay={0.6}
        />
      </div>

      {/* Top 5% Advantage */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="border-2 border-red-500 bg-black p-10 md:p-12 relative overflow-hidden shadow-[16px_16px_0px_0px_#ef4444] group hover:-translate-y-1 transition-transform duration-300"
      >
        <div className="absolute top-0 right-0 bg-red-600 text-white text-sm font-black uppercase px-6 py-3 border-l-2 border-b-2 border-white">
          Exclusive
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 mb-12">
          <div className="w-24 h-24 bg-linear-to-br from-red-600 to-purple-600 flex items-center justify-center border-2 border-white shadow-[8px_8px_0px_0px_white]">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
              The Top 5% Advantage
            </h3>
            <p className="text-gray-400 font-mono text-sm md:text-base font-bold uppercase tracking-wide">
              Elite performers across all tiers receive exclusive benefits
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <BenefitItem
            icon={<Award className="w-5 h-5 text-white" />}
            label="Career Guidelines"
          />
          <BenefitItem
            icon={<FileText className="w-5 h-5 text-white" />}
            label="Personalized Roadmaps"
          />
          <BenefitItem
            icon={<Users className="w-5 h-5 text-white" />}
            label="Direct Referrals"
          />
          <BenefitItem
            icon={<Briefcase className="w-5 h-5 text-white" />}
            label="LinkedIn Optimization"
          />
          <BenefitItem
            icon={<RefreshCcw className="w-5 h-5 text-white" />}
            label="Resume & Portfolio"
          />
        </div>
      </motion.div>
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
  listItems: string[];
  color: "red" | "blue" | "gray";
  delay?: number;
}

function TierCard({
  tier,
  title,
  percent,
  subtitle,
  icon,
  badge,
  description,
  listItems,
  color,
  delay = 0,
}: TierCardProps) {
  const colorMap = {
    red: {
      border: "border-red-600",
      text: "text-red-500",
      bg: "bg-red-500/10",
      hover: "group-hover:text-red-500",
      shadow: "hover:shadow-[12px_12px_0px_0px_#ef4444]",
    },
    blue: {
      border: "border-blue-500",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      hover: "group-hover:text-blue-400",
      shadow: "hover:shadow-[12px_12px_0px_0px_#3b82f6]",
    },
    gray: {
      border: "border-gray-600",
      text: "text-gray-400",
      bg: "bg-gray-500/10",
      hover: "group-hover:text-gray-300",
      shadow: "hover:shadow-[12px_12px_0px_0px_#4b5563]",
    },
  };

  const theme = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={cn(
        "group relative bg-black border-2 p-8 h-full flex flex-col transition-all duration-300 border-white/20 hover:-translate-y-2 hover:border-white",
        theme.shadow
      )}
    >
      {/* Top Badge */}
      <div
        className={cn(
          "absolute -top-4 right-6 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-black border-2",
          theme.border,
          theme.text
        )}
      >
        {percent}
      </div>

      <div className="flex justify-between items-start mb-8">
        <div
          className={cn(
            "p-4 border-2 rounded-none bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
            theme.border
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest font-bold">
          {tier}
        </div>
        <h3 className="text-3xl font-black text-white uppercase mb-3 leading-none">
          {title}
        </h3>
        <div
          className={cn(
            "text-xs md:text-sm font-black uppercase tracking-wide",
            theme.text
          )}
        >
          {subtitle}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-3 mb-8 inline-block">
        <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
          {badge}
        </span>
      </div>

      <p className="text-base text-gray-400 font-mono mb-10 grow leading-relaxed">
        {description}
      </p>

      <ul className="space-y-4 pt-8 border-t-2 border-white/10">
        {listItems.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm text-gray-300 font-medium"
          >
            <MoveRight className={cn("w-4 h-4 shrink-0 mt-0.5", theme.text)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function BenefitItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 hover:border-white/50 transition-colors p-5 flex flex-col items-center text-center gap-4 hover:bg-zinc-900">
      <div className="p-3 bg-black border border-white/20 shadow-[2px_2px_0px_0px_white]">
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-300 uppercase leading-tight tracking-wide">
        {label}
      </span>
    </div>
  );
}
