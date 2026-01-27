"use client";

import { OverviewSection } from "./overview-section";
import { LearningMaterialSection } from "./learning-material-section";
import { SubmissionsHistorySection } from "./submissions-history-section";
import { ProfileSection } from "./profile-section";
import { DoubtSessionsView } from "./doubt/doubt-sessions-view";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  GraduationCap,
  History,
  Settings,
} from "lucide-react";

interface StudentDashboardShellProps {
  section?: string;
  courseId?: string;
  studentId: string;
}

export function StudentDashboardShell({
  section,
  courseId,
  studentId,
}: StudentDashboardShellProps) {
  const currentSection = section || "learning";

  const renderContent = () => {
    switch (currentSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-blue-500" /> OVERVIEW
            </h2>
            <OverviewSection studentId={studentId} />
          </div>
        );
      case "learning":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Learning Material
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                Access your course content and submit assignments.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LearningMaterialSection studentId={studentId} courseId={courseId} />
            </CardContent>
          </Card>
        );
      case "submissions":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <History className="w-4 h-4 text-blue-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Submissions History
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                View status of all your assessments and projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <SubmissionsHistorySection studentId={studentId} />
            </CardContent>
          </Card>
        );
      case "profile":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-blue-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Public Profile
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                Update your public information and links.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProfileSection studentId={studentId} />
            </CardContent>
          </Card>
        );
      case "doubts":
        return <DoubtSessionsView studentId={studentId} />;
      default:
        return (
          <div className="space-y-6">
            <OverviewSection studentId={studentId} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full">
      {renderContent()}
    </div>
  );
}
