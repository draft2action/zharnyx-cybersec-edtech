"use client";

import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProgramsStandalone() {
  return (
    <section className="py-[120px] bg-[#050505] font-sans px-4 border-t border-[#1a1a1a]">
      <div className="container mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Standalone Modules Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-[48px] flex flex-col"
          >
            <h3 className="text-[24px] font-bold text-[#f2f2f2] mb-[16px]">
              Standalone Modules
            </h3>
            <p className="text-[#a3a3a3] text-[15px] mb-[32px]">
              Can't commit to the full 7 months? Take individual phases:
            </p>

            <div className="space-y-[16px] mb-[48px] flex-grow">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-[18px] h-[18px] text-red-500 flex-shrink-0" />
                <span className="text-[#d4d4d4] text-[15px]">
                  Foundation Phase — 3 months
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-[18px] h-[18px] text-red-500 flex-shrink-0" />
                <span className="text-[#d4d4d4] text-[15px]">
                  Any Specialization Track — 3 months
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-[18px] h-[18px] text-red-500 flex-shrink-0" />
                <span className="text-[#d4d4d4] text-[15px]">
                  Career Launch — 1 month
                </span>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-fit px-[24px] py-[12px] text-[14px] font-medium text-[#f2f2f2] bg-transparent border border-[#333333] rounded-md hover:bg-[#1a1a1a] transition-colors mt-auto group">
              View Standalone Pricing
              <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* AI for Cybersecurity Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a] border border-[#262626] rounded-xl p-[48px] flex flex-col relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-[16px]">
              <h3 className="text-[24px] font-bold text-[#f2f2f2]">
                AI for Cybersecurity
              </h3>
              <span className="text-red-500 text-[10px] font-bold px-2 py-1 bg-red-500/10 rounded uppercase tracking-wider">
                ADD-ON
              </span>
            </div>
            
            <p className="text-[#a3a3a3] text-[15px] leading-relaxed mb-[24px]">
              Optional standalone course covering AI/ML applications in cybersecurity — threat detection, anomaly analysis, and automated response.
            </p>
            
            <p className="text-[#737373] text-[13px] mb-[48px] flex-grow">
              Pricing on request · Available to all students
            </p>

            <button className="flex items-center justify-center gap-2 w-fit px-[24px] py-[12px] text-[14px] font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors mt-auto shadow-[0_0_15px_rgba(234,56,76,0.5)] group">
              Enquire Now
              <ArrowRight className="w-[16px] h-[16px] group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
