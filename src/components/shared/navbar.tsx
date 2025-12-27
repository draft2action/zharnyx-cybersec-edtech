"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useSession } from "@/lib/auth/auth-client";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Loader2 } from "lucide-react";
import { TransitionLink } from "@/components/shared/transition-link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { data: session, isPending } = useSession();

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
          <TransitionLink
            href="/programs"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Programs
          </TransitionLink>

          <TransitionLink
            href="/projects"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Projects
          </TransitionLink>

          <TransitionLink
            href="/mentors"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Mentors
          </TransitionLink>

          <TransitionLink
            href="/contact"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium"
          >
            Contact
          </TransitionLink>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : session ? (
            <>
              <TransitionLink
                href="/dashboard"
                className="text-white hover:text-white/80 transition-colors text-sm font-medium"
              >
                Dashboard
              </TransitionLink>
              <SignOutButton
                variant="default"
                className="px-6 py-2 bg-white text-black font-semibold hover:bg-transparent transition-colors text-sm hover:text-white border-2 border-white rounded-none"
              >
                Sign Out
              </SignOutButton>
            </>
          ) : (
            <TransitionLink
              href="/auth?mode=signup"
              className="px-6 py-2 bg-white text-black font-semibold hover:bg-transparent transition-colors text-sm hover:text-white border-2 border-white"
              style={{ borderRadius: "0px" }} // 90-degree corners for button too
            >
              Get Started
            </TransitionLink>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
