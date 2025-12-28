"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeekItem } from "./week-item";
import { Month } from "@/types/course-view";

interface MonthSectionProps {
  month: Month;
  isLocked: boolean;
}

export function MonthSection({ month, isLocked }: MonthSectionProps) {
  return (
    <div
      className={cn(
        "border border-white/10 rounded-lg overflow-hidden",
        isLocked && "opacity-50 pointer-events-none"
      )}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={month.id} className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:bg-white/5 data-[state=open]:bg-white/5">
            <div className="flex items-center gap-3">
              {isLocked ? (
                <Lock className="h-4 w-4 text-gray-500" />
              ) : (
                <div className="h-4 w-4 rounded-full bg-indigo-500/20 border border-indigo-500/50" />
              )}
              <span className="text-white font-mono font-medium">
                {month.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-black/20">
            <div className="flex flex-col">
              {month.weeks.map((week) => (
                <WeekItem
                  key={week.id}
                  week={week}
                  // Placeholder locking logic: dependent on progress
                  isLocked={!!week.isLocked}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
