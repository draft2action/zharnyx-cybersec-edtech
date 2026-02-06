"use client";

import { motion } from "motion/react";
import { Gavel, AlertTriangle, RefreshCcw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function GatekeepingSection() {
  return (
    <section id="gatekeeping" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            We <span className="text-white">Block Students</span> <br />
            <span className="text-red-500">Until They're Ready</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 font-mono text-sm uppercase tracking-wide"
          >
            No weak graduates. Every engineer must prove their capability.
          </motion.p>
        </div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 gap-6 relative mb-16">
          {/* Step 1 */}
          <ProcessCard
            number="01"
            title="Tribunal Evaluation"
            description="Technical assessment across all domains. Real scenarios, real pressure."
            icon={<Gavel size={24} />}
            color="red"
            delay={0.1}
          />

          {/* Step 2 */}
          <ProcessCard
            number="02"
            title="Red Zone Entry"
            description="If gaps exist, you enter Red Zone. Focused remediation begins."
            icon={<AlertTriangle size={24} />}
            color="red"
            delay={0.2}
          />

          {/* Step 3 */}
          <ProcessCard
            number="03"
            title="Remediation Cycle"
            description="Targeted re-training on weak areas. One-on-one guidance."
            icon={<RefreshCcw size={24} />}
            color="red"
            delay={0.3}
          />

          {/* Step 4 */}
          <ProcessCard
            number="04"
            title="Clearance Granted"
            description="Only cleared candidates proceed to deployment phase."
            icon={<CheckCircle2 size={24} />}
            color="red"
            delay={0.4}
          />
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-black border-2 border-white/10 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Gatekeeping Protocol Active
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ProcessCard({ number, title, description, icon, color, delay }: { number: string, title: string, description: string, icon: React.ReactNode, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative bg-black border-2 border-white/10 p-6 hover:border-red-600/50 transition-colors duration-300"
    >
      <div className="absolute top-4 left-4 text-xs font-black text-white/20 font-mono">
        {number}
      </div>

      <div className="flex items-start gap-5 pt-4">
        <div className="p-3 bg-white/5 border border-white/10 text-red-500 group-hover:bg-red-600 group-hover:text-black group-hover:border-red-600 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-black text-white uppercase mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
