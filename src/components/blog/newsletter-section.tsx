"use client";

import { motion } from "motion/react";

export function NewsletterSection() {
  return (
    <section className="bg-[#050505] font-sans py-[120px] px-6 border-t border-[#1a1a1a]">
      <div className="container mx-auto max-w-[800px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] md:text-[40px] font-bold text-[#f2f2f2] tracking-tight mb-[16px]"
        >
          Weekly Tamil Nadu <span className="text-red-500">Cyber Insights</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#a3a3a3] text-[16px] md:text-[18px] mb-[48px]"
        >
          Get career guides, tool tutorials, and job market updates in your inbox.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center max-w-[500px] mx-auto gap-[12px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 bg-[#0a0a0a] border border-[#262626] rounded-md px-[16px] py-[12px] text-[#f2f2f2] text-[15px] placeholder:text-[#525252] focus:outline-none focus:border-red-500 transition-colors"
            required
          />
          <button 
            type="submit"
            className="bg-red-500 hover:bg-[#d92d3f] text-white px-[24px] py-[12px] rounded-md font-medium text-[15px] transition-all shadow-[0_0_20px_rgba(234,56,76,0.3)] hover:shadow-[0_0_25px_rgba(234,56,76,0.4)] whitespace-nowrap"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}
