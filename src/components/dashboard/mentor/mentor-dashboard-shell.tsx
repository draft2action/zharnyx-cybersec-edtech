"use client";

import { ManagedCourses } from "./managed-courses";
import { StudentApplications } from "./student-applications";
import { EngagementStats } from "./engagement-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MentorDashboardShell() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/10 h-14 font-mono mb-6">
        <TabsTrigger
          value="overview"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="courses"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          Managed Courses
        </TabsTrigger>
        <TabsTrigger
          value="students"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          Students
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <EngagementStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ManagedCourses />
          <StudentApplications />
        </div>
      </TabsContent>

      <TabsContent value="courses">
        <div className="h-full">
          <ManagedCourses />
        </div>
      </TabsContent>

      <TabsContent value="students">
        <div className="h-full">
          <StudentApplications />
        </div>
      </TabsContent>
    </Tabs>
  );
}
