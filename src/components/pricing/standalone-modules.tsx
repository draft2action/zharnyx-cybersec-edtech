"use client";

import { motion } from "motion/react";

export function StandaloneModules() {
  return (
    <section className="py-[80px] px-4 md:px-8 bg-transparent font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-[48px]">
          <h2 className="text-[30px] font-bold text-[#f2f2f2] tracking-tight">
            Standalone <span className="text-red-500">Modules</span>
          </h2>
        </div>

        <div className="space-y-[16px] mb-[40px]">
          {/* Foundation Phase */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center p-[24px] bg-[#111111] border border-[#262626] rounded-[8px] gap-4 text-center md:text-left"
          >
            <div>
              <h3 className="text-[18px] font-bold text-[#f2f2f2] mb-1">Foundation Phase</h3>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-baseline gap-2">
                <span className="text-[24px] font-bold text-[#f2f2f2]">₹9,899</span>
              </div>
              <span className="text-[14px] text-red-500 mb-1">Student: ₹4,949</span>
              <span className="text-[12px] text-[#8c8c8c]">3 Months · excl. GST</span>
            </div>
          </motion.div>

          {/* Specialization Track */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col md:flex-row justify-between items-center p-[24px] bg-[#111111] border border-[#262626] rounded-[8px] gap-4 text-center md:text-left"
          >
            <div>
              <h3 className="text-[18px] font-bold text-[#f2f2f2] mb-1">Specialization Track</h3>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[24px] font-bold text-[#f2f2f2]">₹25,999</span>
              </div>
              <span className="text-[12px] text-[#8c8c8c] mt-[22px]">3 Months · excl. GST</span>
            </div>
          </motion.div>

          {/* Career Launch */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center p-[24px] bg-[#111111] border border-[#262626] rounded-[8px] gap-4 text-center md:text-left"
          >
            <div>
              <h3 className="text-[18px] font-bold text-[#f2f2f2] mb-1">Career Launch</h3>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[24px] font-bold text-[#f2f2f2]">₹8,999</span>
              </div>
              <span className="text-[12px] text-[#8c8c8c] mt-[22px]">1 Month · excl. GST</span>
            </div>
          </motion.div>
        </div>

        {/* AI Add-On */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-[24px] border border-[#262626] bg-[#111111] rounded-[8px] text-center flex flex-col items-center gap-[12px] relative overflow-hidden"
        >
          <h3 className="text-[18px] font-bold text-[#f2f2f2]">
            AI for Cybersecurity <span className="text-red-500">Add-On</span>
          </h3>
          <p className="text-[14px] text-[#8c8c8c] max-w-xl">
            Standalone module covering AI/ML in cybersecurity. Available to all students.
          </p>
          <p className="text-[14px] text-[#f2f2f2] font-medium mt-[8px]">
            Pricing on request
          </p>
        </motion.div>

      </div>
    </section>
  );
}
