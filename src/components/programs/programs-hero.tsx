"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function ProgramsHero() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden border-b-2 border-white/10 bg-black/50 backdrop-blur-sm "
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-white/20 bg-white/5 text-sm font-mono font-bold text-white uppercase tracking-widest mb-10 hover:bg-white/10 transition-colors cursor-default"
            >
                <span className="w-2 h-2 bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></span>
                Elite Training Collection
            </motion.div>

            <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 max-w-7xl mx-auto uppercase text-white leading-[0.9]"
            >
                Operational <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 decoration-red-500 underline decoration-4 underline-offset-8 decoration-skip-ink-none">
                    Training Arsenal
                </span>
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-lg text-gray-300 font-mono max-w-5xl mx-auto border-y-2 border-white/10 py-6 px-10 bg-white/5 backdrop-blur-md mb-8"
            >
                Industry-standard cybersecurity training designed to take you from a{" "}
                <span className="text-white bg-red-600 px-1">beginner</span> to a{" "}
                <span className="text-white bg-red-600 px-1">professional</span>.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2"
            >
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Scroll
                </span>
                <ArrowDown className="w-6 h-6 text-red-500" />
            </motion.div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none opacity-50" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        </motion.section>
    );
}
