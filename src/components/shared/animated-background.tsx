"use client";

import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Animated background component with boxes effect
 * This component provides a fixed, full-screen animated background
 * using the Boxes component from Aceternity UI
 */
export function AnimatedBackground({
  children,
  className,
}: AnimatedBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full bg-slate-900 overflow-hidden",
        className
      )}
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none opacity-50" />

      {/* Radial Gradient Spotlight - Global */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/50 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] z-10" />
      <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-80 z-10" />

      {/* Animated boxes background */}
      <Boxes />

      {/* Content wrapper with higher z-index - top layer */}
      {children && (
        <div className="relative w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
}
