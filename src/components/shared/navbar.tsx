"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth/auth-client";
import { Terminal, Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/shared/transition-link";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 w-full z-[100] font-mono transition-all duration-300",
        className
      )}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "relative flex items-center justify-between px-6 md:px-12 py-5 border-b-2 transition-all duration-300",
          "bg-black border-red-900/40"
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
          {/* About Dropdown */}
          <div className="relative group">
            <NavLink href="/about" label="About" hasDropdown />
            <div className="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-black border-2 border-white/20 shadow-[8px_8px_0px_0px_white] flex flex-col p-2 gap-1">
                <DropdownItem href="/about#mission" label="Mission" />
                <DropdownItem href="/about#core-pillars" label="Core Pillars" />
                <DropdownItem href="/about#leadership" label="Leadership" />
                <DropdownItem href="/about#journey" label="Our Journey" />
              </div>
            </div>
          </div>
          {/* Curriculum Dropdown */}
          <div className="relative group">
            <NavLink href="/curriculum" label="Curriculum" hasDropdown />
            <div className="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-black border-2 border-white/20 shadow-[8px_8px_0px_0px_white] flex flex-col p-2 gap-1">
                <DropdownItem href="/curriculum#foundation" label="Foundation" />
                <DropdownItem href="/curriculum#specialization" label="Specialization" />
                <DropdownItem href="/curriculum#convergence" label="Convergence" />
                <DropdownItem href="/curriculum#internship" label="Internship" />
                <DropdownItem href="/curriculum#portfolio" label="Portfolio" />
              </div>
            </div>
          </div>
          <NavLink href="/programs" label="courses" />
          {/* Why Us Dropdown */}
          <div className="relative group">
            <NavLink href="/#why-us" label="why us" hasDropdown />
            <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-black border-2 border-white/20 shadow-[8px_8px_0px_0px_white] flex flex-col p-2 gap-1">
                <DropdownItem href="/#why-us" label="Architecture" />
                <DropdownItem href="/#master-plan" label="Master Plan" />
                <DropdownItem href="/#methodology" label="Methodology" />
                <DropdownItem href="/#war-room" label="War Rooms" />
                <DropdownItem href="/#agency-ops" label="Agency Ops" />
                <DropdownItem href="/#gatekeeping" label="Gatekeeping" />
                <DropdownItem href="/#deployment-tiers" label="Deployment" />
              </div>
            </div>
          </div>
          <NavLink href="/contact" label="Contact" />
        </div>

        {/* Right: CTA - Desktop */}
        <div className="hidden md:flex items-center gap-4">
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
            <>
              <Link
                href="/auth?mode=signin"
                className="px-6 py-2.5 text-white font-bold text-sm uppercase tracking-wider hover:text-red-500 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth?mode=signup"
                className="relative px-6 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-white border-2 border-white/20 hover:bg-white/10">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-l-2 border-white/20 p-0 w-[300px]">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <span className="text-xl font-black text-white tracking-tighter uppercase">
                    Zharnyx <span className="text-red-500">Academy</span>
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-4">
                  <MobileNavLink href="/" label="Home" />
                  <MobileNavLink href="/about" label="About" />
                  <MobileNavLink href="/curriculum" label="Curriculum" />
                  <MobileNavLink href="/pricing" label="Pricing" />
                  <MobileNavLink href="/apply" label="Join Us" />
                  <MobileNavLink href="/contact" label="Contact" />
                </div>
                <div className="p-6 border-t border-white/10 flex flex-col gap-4">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="w-full text-center px-6 py-3 bg-blue-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-blue-600"
                      >
                        Command Center
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="w-full px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth?mode=signin"
                        className="w-full text-center px-6 py-3 text-white font-bold text-sm uppercase tracking-wider border-2 border-white/20 hover:bg-white/10"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth?mode=signup"
                        className="w-full text-center px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  );
}

function NavLink({ href, label, hasDropdown }: { href: string; label: string; hasDropdown?: boolean }) {
  return (
    <TransitionLink
      href={href}
      className="px-5 py-2 text-sm font-medium text-gray-400 uppercase tracking-wide hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all rounded-none flex items-center gap-1.5"
    >
      {label}
      {hasDropdown && (
        <ChevronDown
          size={14}
          className="transition-transform duration-300 group-hover:-rotate-180"
        />
      )}
    </TransitionLink>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wide"
    >
      {label}
    </Link>
  );
}
function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <SheetClose asChild>
      <Link href={href} className="block px-4 py-3 text-lg font-bold text-gray-300 uppercase hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-red-500 transition-all">
        {label}
      </Link>
    </SheetClose>
  )
}


