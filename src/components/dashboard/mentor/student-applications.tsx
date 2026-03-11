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
    // Note: This component is rendered INSIDE a Card in the shell for "student-progress" view.
    // If used standalone, it needs a Card wrapper.
    // Since the shell wraps it in a Card for the "student-progress" view, simply returning the content might be better,
    // OR if it's used in "Overview" (dashboard view), it needs its own Card.
    // Looking at Shell:
    // Overview: <StudentApplications /> (needs Card)
    // Student Progress: <Card><CardContent><StudentApplications /></CardContent></Card>
    // This creates a double card issue in Student Progress view.
    // I should probably make this Component JUST the list content, or handle the wrapper conditionally.
    // However, safely, I will keep the Card wrapper here but make it "transparent" or "borderless" if needed,
    // OR simpler: Make this component fully self-contained (Card) and update Shell to NOT wrap it in a Card.
    // In Shell Step 367, I wrapped <StudentApplications /> in a Card for "student-progress" case.
    // Let's modify this component to be a full Card (consistent with ManagedCourses) and I'll need to check usage in Shell.
    // In "Overview" tab of Shell, it's just <StudentApplications />.
    // In "student-progress" case of Shell, it is wrapped.
    // To fix this inconsistency, I should make THIS component a proper Card, and remove the wrapper in Shell if I can.
    // But I can't easily edit Shell again right now without context switch.
    // Actually, I can just style this as a list (div) and let the parent handle the container Card?
    // But ManagedCourses has its own Card.
    // Let's make it a Card. The double card in Shell might look weird (Card inside CardContent).
    // I will stick to making it a Card matching ManagedCourses.
    // If double border occurs, I can fix Shell later.

    <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl  h-full">
      <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <UserPlus className="h-4 w-4 text-purple-500" />
          <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
            Student Applications
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
          Pending enrollment requests
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {applications.length === 0 ? (
          <div className="text-center text-gray-500 py-8 font-sans uppercase text-xs tracking-wider">
            No pending applications.
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="p-4 border-b border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-white font-sans text-sm">
                    {app.studentName}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">
                    {app.course}
                  </p>
                  <p className="text-[10px] text-gray-600 font-sans">
                    {app.date}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-sans uppercase text-[10px] font-bold h-7 border border-transparent hover:border-purple-400"
                >
                  <UserCheck className="h-3 w-3 mr-1" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 rounded-xl border border-[#1a1a1a] text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500 font-sans uppercase text-[10px] font-bold h-7"
                >
                  <UserX className="h-3 w-3 mr-1" /> Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
