"use client";

import { ManagedCourses } from "./managed-courses";
import { StudentApplications } from "./student-applications";
import { EngagementStats } from "./engagement-stats";
import { AssignedWeeksSection } from "./assigned-weeks-section";
import { AssignmentScoringSection } from "./assignment-scoring-section";
import { ProjectScoringSection } from "./project-scoring-section";
import { DoubtClearingSection } from "./doubt-clearing-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  GraduationCap,
  FileText,
  FolderKanban,
  HelpCircle,
} from "lucide-react";

interface MentorDashboardShellProps {
  section?: string;
  mentorId: string;
}

export function MentorDashboardShell({
  section,
  mentorId,
}: MentorDashboardShellProps) {
  const currentSection = section || "student-progress";

  const renderContent = () => {
    switch (currentSection) {
      case "student-progress":
        return (
          <div className="space-y-6">
            <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl ">
              <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                    Assigned Sessions
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                  View your assigned course weeks and sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AssignedWeeksSection mentorId={mentorId} />
              </CardContent>
            </Card>
          </div>
        );
      case "score-assignments":
        return (
          <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl ">
            <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                  Score Assignments
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                Review and grade pending student assignments.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <AssignmentScoringSection mentorId={mentorId} />
            </CardContent>
          </Card>
        );
      case "score-projects":
        return (
          <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl ">
            <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <FolderKanban className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                  Score Projects
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                Evaluate capstone and module projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProjectScoringSection mentorId={mentorId} />
            </CardContent>
          </Card>
        );
      case "doubt-sessions":
        return (
          <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl ">
            <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                  Doubt Sessions
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                Manage student doubt clearing requests.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <DoubtClearingSection mentorId={mentorId} />
            </CardContent>
          </Card>
        );
      default:
        // Default to student progress or empty state
        return (
          <div className="space-y-6">
            <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl ">
              <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
                    Assigned Sessions
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                  View your assigned course weeks and sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <AssignedWeeksSection mentorId={mentorId} />
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {renderContent()}
    </div>
  );
}
