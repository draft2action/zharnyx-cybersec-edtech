"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function ProgramsHero() {
    return (
        <section id="overview" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#050505] font-sans px-4">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-20">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 text-red-700 border border-[#262626] rounded-full text-[12px] font-semibold text-[#f2f2f2] uppercase tracking-wider mb-[32px]"
                >
                    {/* <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(234,56,76,0.6)] animate-pulse" /> */}
                    PROGRAMS
                </motion.div>

                <motion.h1
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="text-[30px] md:text-[40px] lg:text-[54px] font-bold tracking-tight text-[#f2f2f2] leading-[1.1] mb-[24px]"
                >
                    7 Months. 4 Tracks.{" "}
                    <span className="text-red-500">100% Hands-On.</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[14px] md:text-[18px] text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed mb-[64px]"
                >
                    Our program is structured in 3 phases — Foundation, Specialization, and Career Launch. Every student builds a portfolio of real deliverables.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2"
            >
                <ArrowDown className="w-5 h-5 text-[#8c8c8c]" />
            </motion.div>
        </section>
    );
}
