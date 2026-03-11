"use client";

import { motion } from "motion/react";

export function PricingPackages() {
  return (
    <section className="py-[80px] px-4 md:px-8 bg-transparent relative z-10 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Glow behind cards */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />

        {/* Student Package */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0a0a0a] border border-red-500/30 shadow-[0_0_60px_rgba(234,56,76,0.1)] rounded-[12px] p-[40px] flex flex-col relative overflow-hidden z-10"
        >
          <div className="mb-[32px]">
            <span className="inline-block px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full text-[12px] font-medium mb-[24px]">
              Student Package
            </span>
            <div className="flex items-baseline gap-1 mt-[8px]">
              <span className="text-[48px] font-bold text-[#f2f2f2] leading-none tracking-tight">₹47,137</span>
            </div>
            <p className="text-[12px] text-[#737373] mt-[8px]">Total incl. 18% GST</p>
          </div>

          <div className="flex flex-col flex-1 mb-[40px]">
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] pb-[16px]">
              <span className="text-[#a3a3a3]">Foundation (50% off)</span>
              <span className="text-[#f2f2f2]">₹4,949</span>
            </div>
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Specialization Track</span>
              <span className="text-[#f2f2f2]">₹25,999</span>
            </div>
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Career Launch</span>
              <span className="text-[#f2f2f2]">₹8,999</span>
            </div>
            
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Subtotal</span>
              <span className="text-[#f2f2f2]">₹39,947</span>
            </div>
            <div className="flex justify-between items-center text-[13px] pt-[16px]">
              <span className="text-[#a3a3a3]">GST (18%)</span>
              <span className="text-[#f2f2f2]">₹7,190.46</span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-[12px] text-red-500 font-medium mb-[16px]">
              50% discount on Foundation Phase
            </p>
            <button className="w-full bg-red-500 hover:bg-[#d02e3f] text-white rounded-[6px] h-[48px] px-[32px] text-[14px] font-medium transition-colors shadow-[0_4px_14px_0_rgba(234,56,76,0.25)]">
              Enroll as Student
            </button>
          </div>
        </motion.div>

        {/* Regular Package */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-[12px] p-[40px] flex flex-col relative overflow-hidden z-10"
        >
          <div className="mb-[32px]">
            <span className="inline-block px-4 py-1.5 bg-[#262626] text-[#a3a3a3] rounded-full text-[12px] font-medium mb-[24px]">
              Regular Package
            </span>
            <div className="flex items-baseline gap-1 mt-[8px]">
              <span className="text-[48px] font-bold text-[#f2f2f2] leading-none tracking-tight">₹52,978</span>
            </div>
            <p className="text-[12px] text-[#737373] mt-[8px]">Total incl. 18% GST</p>
          </div>

          <div className="flex flex-col flex-1 mb-[40px]">
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] pb-[16px]">
              <span className="text-[#a3a3a3]">Foundation</span>
              <span className="text-[#f2f2f2]">₹9,899</span>
            </div>
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Specialization Track</span>
              <span className="text-[#f2f2f2]">₹25,999</span>
            </div>
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Career Launch</span>
              <span className="text-[#f2f2f2]">₹8,999</span>
            </div>
            
            <div className="flex justify-between items-center text-[13px] border-b border-[#262626] py-[16px]">
              <span className="text-[#a3a3a3]">Subtotal</span>
              <span className="text-[#f2f2f2]">₹44,897</span>
            </div>
            <div className="flex justify-between items-center text-[13px] pt-[16px]">
              <span className="text-[#a3a3a3]">GST (18%)</span>
              <span className="text-[#f2f2f2]">₹8,081.46</span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-[12px] text-transparent select-none mb-[16px]">
              &nbsp;
            </p>
            <button className="w-full bg-transparent border border-[#333] hover:bg-[#1a1a1a] text-[#f2f2f2] rounded-[6px] h-[48px] px-[32px] text-[14px] font-medium transition-colors">
              Enroll Now
            </button>
          </div>
        </motion.div>
      </div>

      <div className="text-center mt-[40px] text-[12px] text-[#737373]">
        <p>EMI options available on request · Institutional / college batch pricing on request</p>
      </div>
    </section>
  );
}
