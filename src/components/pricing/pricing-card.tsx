"use client";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Database,
  Globe,
  Lock,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: Zap, label: "6 Months Intensive Training" },
  { icon: ShieldCheck, label: "Red + Blue Combined Foundation" },
  { icon: Terminal, label: "Specialized Track (Red or Blue)" },
  { icon: Crosshair, label: "Live War Games (Month 5)" },
  { icon: Lock, label: "vSOC Residency Experience" },
  { icon: Database, label: "3+ Real Projects" },
  { icon: Globe, label: "GitHub Portfolio" },
  { icon: Award, label: "Z-CPJE Certification" },
  { icon: FileText, label: "Experience Letter" },
  { icon: Briefcase, label: "Placement Support" },
  { icon: Clock, label: "2 Floating Weeks (Exam Buffer)" },
  { icon: Users, label: "Lifetime Community Access" },
];

import {
  Crosshair,
  Award,
  FileText,
  Briefcase,
  Clock,
  Users,
} from "lucide-react";

export function PricingCard() {
  return (
    <section className="py-20 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto border-2 border-white/20 bg-zinc-950/50 backdrop-blur-md">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row border-b-2 border-white/20 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-white/20">
          {/* Left Box: Title & Price */}
          <div className="flex-1 p-8 md:p-12 space-y-6">
            <Badge
              variant="outline"
              className="bg-red-950/30 text-red-500 border-red-500/50 uppercase tracking-widest text-xs py-1 px-3 mb-4"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              Career Residency
            </Badge>

            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              The Purple Team <br /> Pathway
            </h2>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-7xl font-black text-white">
                  ₹4,500
                </span>
                <span className="text-xl text-zinc-500 font-mono">/ total</span>
              </div>
              <p className="text-sm text-purple-400 font-bold font-mono uppercase tracking-wide">
                ~₹750 per month • 6 months duration
              </p>
            </div>
          </div>

          {/* Right Box: CTA */}
          <div className="w-full lg:w-[400px] bg-zinc-900/50 flex flex-col justify-center p-8 md:p-12 space-y-6 relative overflow-hidden">
            {/* <div className="absolute top-0 right-0 p-4 border-l-2 border-b-2 border-white/10 bg-black/50">
              <span className="text-xs font-mono text-zinc-500">
                SEATS_AVAILABLE: 30
              </span>
            </div> */}

            <p className="text-zinc-400 text-sm leading-relaxed">
              This is not just a course. It is a simulated work environment
              designed to take you from novice to deployed engineer.
            </p>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-black hover:text-white font-black uppercase tracking-wider h-16 text-lg border-2 border-red-600 hover:border-red-500 transition-all group">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Jan 2026 Cohort: Open
            </div>
          </div>
        </div>

        {/* Grid of Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 md:[&>*:nth-child(2)]:border-r-2 lg:[&>*:nth-child(3)]:border-r-0 lg:[&>*:nth-child(3n)]:border-r-0 border-white/20">
          {/* Note: Tailwind divide utilities are tricky with grids. Using borders directly on elements or a container query approach is safer. 
                 For simplicity and robustness in this specific grid, I'll use individual borders.
             */}
        </div>

        {/* Re-doing grid with explicit borders for Neo-Brutalist look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                        p-6 border-b-2 border-white/20 flex flex-col gap-4 group hover:bg-white/5 transition-colors
                        ${
                          index % 4 !== 3 ? "lg:border-r-2" : ""
                        } /* Right border for all except last in row on LG */
                        ${
                          index % 2 !== 1 ? "md:max-lg:border-r-2" : ""
                        } /* Right border for odd items on MD */
                    `}
            >
              <feature.icon
                className="w-8 h-8 text-zinc-600 group-hover:text-red-500 transition-colors"
                strokeWidth={1.5}
              />
              <span className="text-sm font-bold text-zinc-300 uppercase tracking-wide leading-tight group-hover:text-white">
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Bar */}
        <div className="bg-zinc-900 border-t-2 border-white/20 p-4 flex justify-between items-center text-xs font-mono text-zinc-500 uppercase">
          <span>System: Online</span>
          <span>Ver: 2.0.4</span>
        </div>
      </div>
    </section>
  );
}
