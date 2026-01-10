"use client";

import { motion } from "motion/react";

export function QuoteSection() {
  return (
    <section className="py-32 px-4 md:px-8 flex items-center justify-center min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-tight max-w-screen mx-auto">
          <span className="text-white">"Zharnyx is not education. </span>
          <br className="md:hidden" />
          <span className="text-red-600">Zharnyx </span>
          <span className="text-purple-500">is preparation."</span>
        </h2>
      </motion.div>
    </section>
  );
}
