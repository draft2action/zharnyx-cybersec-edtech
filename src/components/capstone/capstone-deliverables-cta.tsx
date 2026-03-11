"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CapstoneDeliverablesCTA() {
  const deliverables = [
    "Track-Specific Technical Deliverable (Report, Runbook, or Timeline)",
    "Documented GitHub Repository showcasing your work",
    "A detailed blog post/write-up explaining your simulation experience",
  ];

  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6 border-t border-[#1a1a1a]">
      <div className="container mx-auto max-w-[1280px]">

        {/* Portfolio Outputs */}
        <div className="max-w-[800px] mx-auto mb-[120px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[20px] md:text-[28px] font-bold text-[#ffffff] mb-[40px] text-center"
          >
            Portfolio <span className="text-red-500">Outputs</span>
          </motion.h2>

          <div className="space-y-[16px] md:space-y-[24px] max-w-2xl">
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-[16px] bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-[12px] md:p-[16px]"
              >
                <CheckCircle2 className="text-red-500 w-6 h-6 shrink-0" />
                <span className="text-[#f2f2f2]/[0.5] text-[12px] md:text-[14px] leading-snug">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[800px] mx-auto rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] p-[40px] md:p-[80px] text-center"
        >
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500 opacity-[0.1] blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#ffffff] leading-[1.1] tracking-tight mb-[24px]">
              Ready for the <span className="text-red-500">Challenge?</span>
            </h2>
            <p className="text-[#a3a3a3] text-[16px] md:text-[18px] mb-[40px] max-w-[500px] leading-relaxed">
              Prove your skills in a simulated enterprise environment and graduate with real-world experience.
            </p>

            <div className="flex justify-center">
              <Link
                href="/enroll"
                className="inline-flex items-center gap-[8px] bg-red-500 text-white px-[32px] py-[16px] rounded-full font-semibold text-[15px] hover:bg-[#d92d3f] transition-colors"
                style={{
                  boxShadow: '0 0 40px rgba(234, 56, 76, 0.3)',
                }}
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
