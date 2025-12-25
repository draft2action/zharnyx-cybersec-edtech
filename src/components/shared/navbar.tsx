"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div
      className={cn(
        "fixed top-6 inset-x-0 max-w-full mx-auto z-50 px-4 font-mono",
        className
      )}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative border border-white/20 bg-slate-900/80 backdrop-blur-md shadow-lg flex items-center justify-between px-8 py-4"
        style={{ borderRadius: "0px" }} // 90-degree corners
      >
        {/* Left: Company Name */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">Zharnyx Academy</span>
        </Link>

        {/* Middle: Nav Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/programs"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Programs
          </Link>

          <Link
            href="/projects"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Projects
          </Link>

          <Link
            href="/mentors"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Mentors
          </Link>

          <Link
            href="/contact"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Right: Get Started Button */}
        <Link
          href="/auth?mode=signup"
          className="px-6 py-2 bg-white text-black font-semibold hover:bg-transparent transition-colors text-sm hover:text-white border-2 border-white"
          style={{ borderRadius: "0px" }} // 90-degree corners for button too
        >
          Get Started
        </Link>
      </motion.nav>
    </div>
  );
}
