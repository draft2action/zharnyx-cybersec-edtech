"use client";

import { useEffect, useState } from "react";
import { getAssignedWeeks } from "@/actions/mentor/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";

interface AssignedWeeksSectionProps {
  mentorId: string;
}

export function AssignedWeeksSection({ mentorId }: AssignedWeeksSectionProps) {
  const [weeks, setWeeks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAssignedWeeks(mentorId);
      if (result.success) {
        setWeeks(result.data || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [mentorId]);

  if (loading) {
    return <div className="text-white">Loading assigned weeks...</div>;
  }

  if (weeks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-[#1a1a1a] border-dashed rounded-lg bg-[#0a0a0a]">
        <Users className="h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Assigned Weeks</h3>
        <p className="text-gray-400 text-center max-w-sm">
          You haven't been assigned to any course weeks yet. Contact an admin to
          get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {weeks.map((assignment) => (
        <Card
          key={assignment.id}
          className="bg-black border border-purple-500/30 hover:border-purple-500 transition-all group"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant="outline"
                className="bg-purple-900/20 text-purple-400 border-purple-500/50"
              >
                {assignment.week.month.course.title}
              </Badge>
              <span className="text-xs text-gray-500 font-sans">
                {format(new Date(assignment.assignedAt), "MMM d, yyyy")}
              </span>
            </div>
            <CardTitle className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {assignment.week.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Calendar className="h-4 w-4" />
              <span>Month: {assignment.week.month.title}</span>
            </div>
            <div className="text-xs text-gray-500 border-t border-[#1a1a1a] pt-3 flex justify-between">
              <span>Week ID: {assignment.week.id.slice(0, 8)}...</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
