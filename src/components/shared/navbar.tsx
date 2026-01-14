"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth/auth-client";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 w-full z-50 font-mono transition-all duration-300",
        className
      )}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative flex items-center justify-between px-6 md:px-12 py-5 border-b-2 transition-all duration-300",
          scrolled
            ? "bg-black/90 backdrop-blur-md border-red-900/40"
            : "bg-transparent border-transparent py-8"
        )}
      >
        {/* Left: Company Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-red-600 text-black border-2 border-transparent transition-colors">
            <Terminal size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase transition-all duration-300">
            Zharnyx <span className="text-red-500">Academy</span>
          </span>
        </Link>

        {/* Middle: Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/curriculum" label="Curriculum" />
          <NavLink href="/pricing" label="Pricing" />
          <NavLink href="/apply" label="Join Us" />
          <NavLink href="/contact" label="Contact" />
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="relative px-6 py-2.5 bg-blue-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-blue-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Command Center
              </Link>
              <button
                onClick={() => signOut()}
                className="relative px-6 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/apply"
              className="relative px-6 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              Apply Now
            </Link>
          )}
        </div>
      </motion.nav>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-5 py-2 text-sm font-medium text-gray-400 uppercase tracking-wide hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all rounded-none"
    >
      {label}
    </Link>
  );
}
