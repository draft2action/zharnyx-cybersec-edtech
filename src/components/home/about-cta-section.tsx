"use client";

import { motion } from "motion/react";
import { Shield, Target, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AboutCTASection() {
  return (
    <section className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* --- PART 1: ABOUT ZHARNYX --- */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold"
          >
            // Who We Are
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-20"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
              Zharnyx
            </span>
          </motion.h2>

          {/* 3 Column Features */}
          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <FeatureColumn
              icon={<Shield size={32} />}
              title="Built by Practitioners"
              description="Founded by working security engineers who understand real-world demands."
              delay={0.1}
            />
            <FeatureColumn
              icon={<Target size={32} />}
              title="Fixing Broken Pipelines"
              description="Designed to address the gap between academic knowledge and job readiness."
              delay={0.2}
            />
            <FeatureColumn
              icon={<Building2 size={32} />}
              title="Company, Not Classroom"
              description="Structured like a security organization, not an educational institution."
              delay={0.3}
            />
          </div>

          {/* Manifesto Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border-2 border-white/10 p-8 md:p-12 relative max-w-4xl mx-auto"
          >
            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-8">
              We don't believe in mass-produced graduates. We believe in
              engineers who can walk into a SOC, a red team engagement, or a
              security architecture discussion — and deliver from day one.
            </p>
            <div className="h-px w-20 bg-red-500 mx-auto mb-8" />
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              "Zharnyx is not education.
              <br />
              <span className="text-red-500">Zharnyx is preparation.</span>"
            </h3>
          </motion.div>
        </div>

        {/* --- PART 2: FINAL CTA --- */}
        <div className="text-center pt-20 border-t border-white/10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4"
          >
            If You're Serious About <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-purple-500 to-blue-500">
              Cybersecurity, Apply.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-mono text-sm mb-10"
          >
            This residency is selective. Not everyone gets in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 text-black font-black text-xl uppercase tracking-widest border-2 border-red-600 shadow-[8px_8px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_white] transition-all"
            >
              Apply Now <ArrowRight size={24} strokeWidth={3} />
            </Link>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 mt-16 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> 6-month
              intensive
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Limited
              seats per cohort
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Next
              cohort starting soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureColumn({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className="p-4 bg-white/5 border-2 border-white/20 rounded-full mb-6 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white uppercase mb-3">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}
