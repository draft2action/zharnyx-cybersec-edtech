"use client";

import { motion } from "motion/react";
import { X, Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhyZharnyxSection() {
  return (
    <section className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-black border-2 border-white shadow-[4px_4px_0px_0px_#333] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <AlertTriangle size={14} strokeWidth={3} className="text-red-600" />
            <span>Problem Statement</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
          >
            <div className="text-gray-500 line-through decoration-red-600 decoration-4">
              Why Courses Fail.
            </div>
            <div className="text-red-500 mt-2">Why Zharnyx Exists.</div>
          </motion.h2>
        </div>

        {/* Comparison Table - Neo Brutalist */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Traditional Column */}
          <div>
            <div className="text-center mb-8 p-4 border-2 border-white/20 bg-white/5">
              <h3 className="text-xl font-bold font-mono text-gray-400 uppercase tracking-widest">
                Traditional Courses
              </h3>
            </div>
            <div className="space-y-4">
              <CompareItem isPositive={false} text="Theory-based learning" />
              <CompareItem isPositive={false} text="Certificates as proof" />
              <CompareItem isPositive={false} text="Hope for placement" />
              <CompareItem isPositive={false} text="Self-paced isolation" />
              <CompareItem isPositive={false} text="Generic curriculum" />
            </div>
          </div>

          {/* Zharnyx Column */}
          <div className="relative">
            {/* Decorator
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-600 pattern-dots z-0 hidden md:block" /> */}
            <div className="text-center mb-8 p-4 bg-red-600 border-2 border-red-600 shadow-[4px_4px_0px_0px_white] relative z-10">
              <h3 className="text-xl font-black font-mono text-black uppercase tracking-widest">
                Zharnyx Residency
              </h3>
            </div>
            <div className="space-y-4 relative z-10">
              <CompareItem
                isPositive={true}
                text="Simulation-based operations"
              />
              <CompareItem isPositive={true} text="Portfolio & verified work" />
              <CompareItem
                isPositive={true}
                text="Gatekeeping & deployment tiers"
              />
              <CompareItem isPositive={true} text="Pressure-tested cohorts" />
              <CompareItem isPositive={true} text="War room missions" />
            </div>
          </div>
        </div>

        {/* Brutalist Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-8 border-2 border-white text-center max-w-4xl mx-auto shadow-[8px_8px_0px_0px_#ef4444] bg-black hover:-translate-y-1 hover:-translate-x-1 transition-transform group cursor-default"
        >
          <p className="text-xl md:text-3xl text-white font-bold uppercase tracking-tight">
            "We don't teach cybersecurity. <br className="hidden md:block" />
            <span className="text-red-500 bg-white/10 px-2">
              We operationalize it.
            </span>
            "
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CompareItem({
  isPositive,
  text,
}: {
  isPositive: boolean;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isPositive ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex items-center gap-4 p-4 border-2 text-base font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
        isPositive
          ? "border-red-600 bg-black text-white shadow-[4px_4px_0px_0px_#ef4444] hover:shadow-[6px_6px_0px_0px_#ef4444]"
          : "border-white/20 bg-transparent text-gray-500 hover:border-white/40 hover:text-gray-300"
      )}
    >
      <div
        className={cn(
          "shrink-0 p-1 border-2",
          isPositive
            ? "border-red-500 text-red-500 bg-white"
            : "border-gray-600 text-gray-600"
        )}
      >
        {isPositive ? (
          <Check size={16} strokeWidth={4} />
        ) : (
          <X size={16} strokeWidth={4} />
        )}
      </div>
      <span>{text}</span>
    </motion.div>
  );
}
