"use client";

import Link from "next/link";
import { Shield, Mail, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative bg-black border-t-2 border-white/20 pt-20 pb-10"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* COLUMN 1: BRAND */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield
                className="text-red-600 fill-transparent stroke-[2.5px]"
                size={32}
              />
              <span className="text-2xl font-black text-white tracking-wide">
                ZHARNYX
              </span>
            </div>

            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xs">
              The Cyber-Agency — Operational Blueprint & Strategic Roadmap
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:apply@zharnyx.com"
                className="flex items-center gap-3 text-sm font-mono text-gray-400 hover:text-red-500 transition-colors group"
              >
                <Mail
                  size={16}
                  className="text-red-500 group-hover:text-red-400"
                />
                apply@zharnyx.com
              </a>
              <div className="flex items-start gap-3 text-sm font-mono text-gray-400">
                <MapPin size={16} className="text-red-500 mt-0.5 shrink-0" />
                Coimbatore, Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4 font-mono text-sm text-gray-400">
              <li>
                <Link
                  href="/curriculum"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  Curriculum
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: THE PROGRAM */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">The Program</h4>
            <ul className="space-y-4 font-mono text-sm text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  Red Team Track
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  Blue Team Track
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  War Games
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white transition-colors hover:underline decoration-red-500 underline-offset-4"
                >
                  vSOC Residency
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEXT COHORT CARD */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Next Cohort</h4>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl relative group hover:border-white/30 transition-colors">
              <div className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-500 to-purple-600 mb-2">
                January 2026
              </div>
              <div className="text-xs font-mono text-blue-400 mb-6 uppercase tracking-wider">
                Registration Open
              </div>

              <Link
                href="/apply"
                className="flex justify-center items-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm rounded-md transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
              >
                Apply Now <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 pt-10">
          {/* Founders Row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 text-sm text-white font-medium">
            <Founder name="Sanjai R" role="Founder" color="bg-red-500" />
            <Founder
              name="A. Amirthavarshini"
              role="Program Director"
              color="bg-red-500"
            />
            <Founder name="Navindh A" role="Co-Founder" color="bg-orange-500" />
            <Founder
              name="Antony Shane"
              role="Project Partner"
              color="bg-red-500"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-gray-500 border-t border-white/5 pt-8">
            <div>© {currentYear} ZHARNYX. All rights reserved.</div>

            <div className="text-center md:text-right text-gray-400">
              &quot;This is not a course. It&apos;s a career residency.&quot;
            </div>

            <div className="flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_limegreen]" />
              Systems Operational
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

function Founder({
  name,
  role,
  color,
}: {
  name: string;
  role: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="font-bold text-white">{name}</span>
      <span className="text-gray-500">— {role}</span>
    </div>
  );
}
