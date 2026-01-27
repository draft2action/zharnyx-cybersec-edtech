"use client";

import { JoinHero } from "@/components/join/hero-section";
import { ArrowRight, User, GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const roles = [
  {
    title: "Student",
    subtitle: "Future Operator",
    icon: GraduationCap,
    description:
      "Join the residency. Train in live war games. Get deployed to top security firms.",
    href: "/programs",
    cta: "Start Residency",
    color: "text-red-500",
    hoverBorder: "hover:border-red-500",
    bgHover: "group-hover:bg-red-950/20",
  },
  {
    title: "Mentor",
    subtitle: "Security Architect",
    icon: User,
    description:
      "Shape the next generation. Lead war games and guide residents through live operations.",
    href: "/apply/mentor",
    cta: "Apply to Teach",
    color: "text-purple-500",
    hoverBorder: "hover:border-purple-500",
    bgHover: "group-hover:bg-purple-950/20",
  },
  {
    title: "Hiring Partner",
    subtitle: "Agency Client",
    icon: Building2,
    description:
      "Hire day-1 ready security engineers. Skip the training period. Zero false positives.",
    href: "/apply/recruiter",
    cta: "Request Talent",
    color: "text-blue-500",
    hoverBorder: "hover:border-blue-500",
    bgHover: "group-hover:bg-blue-950/20",
  },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <JoinHero />

      <section className="py-20 px-4 md:px-8 bg-zinc-950 border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <Link
                key={index}
                href={role.href}
                className={`block group relative border-2 border-white/20 bg-black p-8 md:p-12 transition-all duration-300 ${role.hoverBorder} hover:-translate-y-2`}
              >
                {/* Hover Background */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${role.bgHover}`}
                ></div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <div>
                    <div
                      className={`inline-flex items-center justify-center p-4 border-2 border-white/10 bg-zinc-900 mb-6 group-hover:bg-black group-hover:border-white/20 transition-colors`}
                    >
                      <role.icon
                        className={`w-8 h-8 ${role.color}`}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                      {role.title}
                    </h3>
                    <p
                      className={`text-sm font-mono uppercase tracking-widest font-bold mb-4 ${role.color}`}
                    >
                      // {role.subtitle}
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <Button
                    className={`w-full bg-zinc-900 text-white border-2 border-white/10 hover:bg-${role.color.split("-")[1]
                      }-600 group-hover:border-${role.color.split("-")[1]
                      }-500 transition-all font-bold uppercase tracking-wider h-14`}
                  >
                    {role.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
