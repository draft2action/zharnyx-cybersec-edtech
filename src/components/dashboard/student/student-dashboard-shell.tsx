"use client";

import { EnrolledCourses } from "./enrolled-courses";
import { UpcomingAssignments } from "./upcoming-assignments";
import { LearningProgress } from "./learning-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function StudentDashboardShell() {
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
          My Courses
        </TabsTrigger>
        <TabsTrigger
          value="assignments"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          Assignments
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <LearningProgress />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnrolledCourses />
          <UpcomingAssignments />
        </div>
      </TabsContent>

      <TabsContent value="courses">
        <div className="h-full">
          <EnrolledCourses />
        </div>
      </TabsContent>

      <TabsContent value="assignments">
        <div className="h-full">
          <UpcomingAssignments />
        </div>
      </TabsContent>
    </Tabs>
  );
}
