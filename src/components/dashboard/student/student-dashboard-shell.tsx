"use client";

import { EnrolledCourses } from "./enrolled-courses";
import { AvailableCourses } from "./available-courses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailableCourse, EnrolledCourseSummary } from "@/types/dashboard";

interface StudentDashboardShellProps {
  availableCourses: AvailableCourse[];
  enrolledCourses: EnrolledCourseSummary[];
}

export function StudentDashboardShell({
  availableCourses,
  enrolledCourses,
}: StudentDashboardShellProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10 h-14 font-mono mb-6">
        <TabsTrigger
          value="overview"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          My Courses
        </TabsTrigger>
        <TabsTrigger
          value="available"
          className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
        >
          Available Courses
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="h-full">
          <EnrolledCourses courses={enrolledCourses} />
        </div>
      </TabsContent>

      <TabsContent value="available">
        <div className="h-full">
          <AvailableCourses courses={availableCourses} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
