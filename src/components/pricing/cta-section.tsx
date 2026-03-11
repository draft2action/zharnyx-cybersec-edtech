"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function PricingCTA() {
  return (
    <section className="py-[96px] px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto text-center space-y-[16px]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[36px] font-bold text-[#f2f2f2] tracking-tight"
        >
          Ready to <span className="text-red-500">Invest in Your Future?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[18px] text-[#8c8c8c] max-w-2xl mx-auto mt-[16px]"
        >
          Limited seats per cohort. Secure your spot today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-[16px]"
        >
          <button className="bg-red-500 hover:bg-[#d02e3f] text-white rounded-[6px] h-[44px] px-[32px] text-[16px] font-medium transition-all shadow-[0_0_20px_rgba(234,56,76,0.3)] inline-flex items-center justify-center group">
            Enroll Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
