"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, UserX } from "lucide-react";

export function StudentApplications() {
  // Mock data
  const applications = [
    {
      id: "1",
      studentName: "Alex Chen",
      course: "Advanced Penetration Testing",
      date: "2024-12-28",
    },
    {
      id: "2",
      studentName: "Sarah Jones",
      course: "SOC Fundamentals",
      date: "2024-12-27",
    },
  ];

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-yellow-400" />
          Student Applications
        </CardTitle>
        <CardDescription className="text-gray-400 font-mono">
          Pending enrollment requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No pending applications.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="p-3 rounded-lg border border-white/5 bg-white/5 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white font-mono">
                    {app.studentName}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    Applied for: {app.course}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">
                    {app.date}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 h-8"
                >
                  <UserCheck className="h-4 w-4 mr-1" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 h-8"
                >
                  <UserX className="h-4 w-4 mr-1" /> Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
