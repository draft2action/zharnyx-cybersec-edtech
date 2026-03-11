"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ProgramsCTA() {
  return (
    <section className="py-[120px] bg-[#050505] font-sans px-4 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-30">
        <div className="w-[800px] h-[400px] bg-red-500 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="container mx-auto max-w-[800px] relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[40px] md:text-[56px] font-bold text-[#f2f2f2] tracking-tight mb-[24px]"
        >
          Ready to <span className="text-red-500">Choose Your Track?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#a3a3a3] text-[18px] mb-[48px]"
        >
          Enrollment slots are limited per cohort. Apply now to secure your spot.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/enroll"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-[32px] py-[16px] text-[15px] font-bold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(234,56,76,0.4)] group"
          >
            Enroll Now
            <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="/curriculum"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-[32px] py-[16px] text-[15px] font-medium text-[#f2f2f2] bg-transparent border border-[#333333] rounded-md hover:bg-[#1a1a1a] transition-colors"
          >
            Full Curriculum
          </a>
        </motion.div>
      </div>
    </section>
  );
}
