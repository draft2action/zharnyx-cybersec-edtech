import { cn } from "@/lib/utils";
import { Lock, FileText, Code, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Week } from "@/types/course-view";

interface WeekItemProps {
  week: Week;
  isLocked: boolean;
}

export function WeekItem({ week, isLocked }: WeekItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b border-white/5 last:border-0",
        isLocked && "opacity-50 bg-black/40"
      )}
    >
      <div className="flex items-center gap-4">
        {isLocked ? (
          <div className="h-8 w-8 rounded-full bg-gray-500/10 flex items-center justify-center">
            <Lock className="h-4 w-4 text-gray-500" />
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <span className="text-xs font-mono text-indigo-400">
              {week.order}
            </span>
          </div>
        )}
        <div>
          <h4 className="text-white font-mono text-sm font-medium">
            {week.title}
          </h4>
          {week.isProject && (
            <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded ml-2">
              Project Week
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* If assessment exists */}
        {week.assessments && week.assessments.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-gray-400 hover:text-white"
            disabled={isLocked}
          >
            <FileText className="h-3 w-3 mr-2" />
            Assessment
          </Button>
        )}
        {/* If project exists */}
        {week.isProject && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-gray-400 hover:text-white"
            disabled={isLocked}
          >
            <Code className="h-3 w-3 mr-2" />
            Project
          </Button>
        )}

        <div className="ml-2">
          {/* Status Indicator */}
          <Circle className="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
