"use client";

import { motion } from "motion/react";
import React from "react";

export const LoaderCyber = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative flex items-center justify-center w-24 h-24">
                {/* Outer Hexagon/Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-red-500/30 w-full h-full"
                />

                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-red-500/20 w-[calc(100%-16px)] h-[calc(100%-16px)]"
                />

                {/* Core Scanner */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <motion.span
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-red-600/20 rounded-full blur-md"
                    />
                    <motion.div
                        animate={{ height: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-0.5 bg-red-500 h-full absolute top-0"
                    />
                    <motion.div
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="h-0.5 bg-red-500 w-full absolute left-0"
                    />
                </div>
            </div>
        </div>
    );
};
