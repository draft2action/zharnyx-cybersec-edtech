"use client";

import React from "react";
import { motion } from "motion/react";

interface PortfolioSectionProps {
  stats?: {
    scripts?: number;
    audits?: number;
    caseStudies?: number;
    certificates?: number;
  } | null;
}

export function PortfolioSection({ stats }: PortfolioSectionProps) {
  const scripts = stats?.scripts?.toString() || "3";
  const audits = stats?.audits?.toString() || "2";
  const caseStudies = stats?.caseStudies?.toString() || "1";
  const certificates = stats?.certificates?.toString() || "5";

  return (
    <section id="portfolio" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto mb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 tracking-tighter">
          The Portfolio Promise
        </h2>
        <p className="text-gray-400 font-mono text-base uppercase tracking-widest font-bold">
          By the end, every student walks away with:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <PortfolioCard
          number={scripts}
          title="Python/Bash Scripts"
          subtitle="Tools you wrote yourself"
          delay={0.2}
        />
        <PortfolioCard
          number={audits}
          title="Audit Reports"
          subtitle="VAPT or IR reports"
          delay={0.4}
        />
        <PortfolioCard
          number={caseStudies}
          title="Purple Team Case Study"
          subtitle="The War Game documentation"
          delay={0.6}
        />
        <PortfolioCard
          number={certificates}
          title="Monthly Certificates"
          subtitle="One certificate per month"
          delay={0.8}
        />
      </div>
    </section>
  );
}

function PortfolioCard({
  number,
  title,
  subtitle,
  delay = 0,
}: {
  number: string;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="bg-black border-2 border-white/20 p-8 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300 hover:shadow-[12px_12px_0px_0px_#a855f7] hover:-translate-y-2 group"
    >
      <span className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-gray-800 mb-6 group-hover:text-purple-500 group-hover:bg-none transition-colors">
        {number}
      </span>
      <h3 className="font-black text-white uppercase text-xl mb-3 leading-tight tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest font-bold">
        {subtitle}
      </p>
    </motion.div>
  );
}
