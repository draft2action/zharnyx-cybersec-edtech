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
  Crosshair,
  Award,
  FileText,
  Briefcase,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseEnrollmentDialog } from "@/components/programs/course-enrollment-dialog";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number | null;
  sellingPoints: unknown;
  months: unknown[];
  upcomingCohort: string | null;
}

interface PricingCardProps {
  course: Course;
}

const ICONS = [
  Zap,
  ShieldCheck,
  Terminal,
  Crosshair,
  Lock,
  Database,
  Globe,
  Award,
  FileText,
  Briefcase,
  Clock,
  Users,
];

export function PricingCard({ course }: PricingCardProps) {
  const sellingPoints = Array.isArray(course.sellingPoints)
    ? (course.sellingPoints as string[])
    : [];

  const durationInMonths = course.months?.length || 0;
  // Avoid division by zero if no months are defined, default to 1 or existing 6 logic?
  // Let's assume if 0 months, we show full price ~ or handle gracefully.
  // If user wants "per month", likely there is a duration.
  // If duration is 0, let's just use 1 to avoid Infinity, or maybe fallback to 6 if they want default.
  // But user said "fetch the no of the moths to show th eprive per month correctly".
  // So if months = 0, maybe "Custom Duration" or just show total?
  // Let's safe guard:
  const monthlyDivisor = durationInMonths > 0 ? durationInMonths : 1;

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

            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight break-words hyphens-auto line-clamp-3 mb-2">
              {course.title}
            </h2>

            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-4xl md:text-6xl font-black text-white break-all">
                  ₹{course.price?.toLocaleString() ?? "0"}
                </span>
                <span className="text-lg md:text-xl text-zinc-500 font-mono whitespace-nowrap">/ total</span>
              </div>
              <p className="text-sm text-purple-400 font-bold font-mono uppercase tracking-wide">
                ~₹
                {course.price
                  ? Math.round(course.price / monthlyDivisor).toLocaleString()
                  : 0}{" "}
                per month • {durationInMonths} months duration
              </p>
            </div>
          </div>

          {/* Right Box: CTA */}
          <div className="w-full lg:w-[400px] bg-zinc-900/50 flex flex-col justify-center p-8 md:p-12 space-y-6 relative overflow-hidden">
            <p className="text-zinc-400 text-sm leading-relaxed">
              {course.description}
            </p>

            <CourseEnrollmentDialog
              courseId={course.id}
              courseTitle={course.title}
              price={course.price || 0}
            >
              <Button className="w-full bg-red-600 hover:bg-red-700 text-black hover:text-white font-black uppercase tracking-wider h-16 text-lg border-2 border-red-600 hover:border-red-500 transition-all group">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CourseEnrollmentDialog>

            <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {course.upcomingCohort || "Next"} Cohort: Open
            </div>
          </div>
        </div>

        {/* Grid of Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {sellingPoints.length > 0 ? (
            sellingPoints.map((point, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <div
                  key={index}
                  className={`
                                p-6 border-b-2 border-white/20 flex flex-col gap-4 group hover:bg-white/5 transition-colors
                                ${index % 4 !== 3 ? "lg:border-r-2" : ""} 
                                ${index % 2 !== 1 ? "md:max-lg:border-r-2" : ""}
                            `}
                >
                  <Icon
                    className="w-8 h-8 text-zinc-600 group-hover:text-red-500 transition-colors"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-bold text-zinc-300 uppercase tracking-wide leading-tight group-hover:text-white">
                    {point}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-8 text-center text-zinc-600 italic">
              No features listed.
            </div>
          )}
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
