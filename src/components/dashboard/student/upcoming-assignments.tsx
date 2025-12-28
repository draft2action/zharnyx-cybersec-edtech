"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, AlertCircle } from "lucide-react";

export function UpcomingAssignments() {
  // Mock data
  const assignments = [
    {
      id: "1",
      title: "Network Analysis Report",
      course: "Network Defense Essentials",
      dueDate: "2025-01-05",
      status: "pending", // pending, submitted, late
    },
    {
      id: "2",
      title: "Security Policy Review",
      course: "Introduction to Cybersecurity",
      dueDate: "2025-01-10",
      status: "pending",
    },
  ];

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-400" />
          Upcoming Assignments
        </CardTitle>
        <CardDescription className="text-gray-400 font-mono">
          Tasks due soon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No pending assignments. Great job!
          </div>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 mt-1">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white font-mono truncate">
                  {assignment.title}
                </h4>
                <p className="text-xs text-gray-400 font-mono truncate">
                  {assignment.course}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
