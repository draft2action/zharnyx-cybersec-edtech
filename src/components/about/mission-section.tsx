"use client";

import { motion } from "motion/react";

export function MissionSection() {
  return (
    <section id="mission" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto border-b-2 border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-20"
      >
        <span className="text-red-500 font-mono font-bold uppercase tracking-widest text-base mb-6 border-2 border-red-500/30 px-4 py-2 bg-red-900/10">
          Our Mission
        </span>
        <h2 className="text-5xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none">
          "This is not a course.
          <br /> It's a career residency."
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative bg-black border-2 border-white/20 p-10 md:p-14 shadow-[16px_16px_0px_0px_#ef4444] hover:-translate-y-1 hover:border-white transition-all duration-300 max-w-5xl mx-auto group"
      >
        <div className="absolute top-0 left-0 bg-white text-black text-xs font-black uppercase px-4 py-2 border-b-2 border-r-2 border-white">
          Manifesto
        </div>

        <p className="text-gray-300 text-lg md:text-2xl leading-relaxed font-mono font-medium">
          <span className="text-white font-bold">
            Zharnyx isn&apos;t a course; it's a workforce engine.
          </span>{" "}
          We don't just graduate students; we graduate veterans of a{" "}
          <span className="text-red-500">4-week cyber war</span> (Month 5) and
          consultants with{" "}
          <span className="text-purple-500">
            1 month of operational experience
          </span>{" "}
          (Month 6). And we do it all for the price of a gym membership.
        </p>
      </motion.div>
    </section>
  );
}
