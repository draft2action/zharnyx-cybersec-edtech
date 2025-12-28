"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MonthSection } from "./month-section";

interface CourseViewShellProps {
  course: any; // Replace with proper type
  userId: string;
}

export function CourseViewShell({ course, userId }: CourseViewShellProps) {
  // Extract all assessments and projects for valid tabs
  const allAssessments = course.months.flatMap((m: any) =>
    m.weeks.flatMap(
      (w: any) =>
        w.assessments?.map((a: any) => ({
          ...a,
          weekOrder: w.order,
          weekTitle: w.title,
          isLocked: w.isLocked,
        })) ?? []
    )
  );

  const allProjects = course.months.flatMap((m: any) =>
    m.weeks
      .filter((w: any) => w.isProject)
      .map((w: any) => ({ ...w, isLocked: w.isLocked }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors font-mono"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white font-mono">
            {course.title}
          </h1>
          <p className="text-gray-400 mt-2">{course.description}</p>
        </div>
      </div>

      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 bg-black/40 border border-white/10 h-14 font-mono mb-6">
          <TabsTrigger
            value="curriculum"
            className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
          >
            Curriculum
          </TabsTrigger>
          <TabsTrigger
            value="assessments"
            className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="h-12 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
          >
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="space-y-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                Course Modules
              </CardTitle>
              <CardDescription className="text-gray-400">
                Master the curriculum step by step
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.months.map((month: any) => (
                <MonthSection key={month.id} month={month} isLocked={false} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                All Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {allAssessments.length === 0 ? (
                <p className="text-gray-400">No assessments available.</p>
              ) : (
                allAssessments.map((assessment: any) => (
                  <div
                    key={assessment.id}
                    className="p-4 border border-white/10 rounded bg-white/5 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {assessment.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        Week {assessment.weekOrder}: {assessment.weekTitle}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={assessment.isLocked}
                    >
                      {assessment.isLocked ? "Locked" : "Start"}
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                All Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {allProjects.length === 0 ? (
                <p className="text-gray-400">No projects available.</p>
              ) : (
                allProjects.map((project: any) => (
                  <div
                    key={project.id}
                    className="p-4 border border-white/10 rounded bg-white/5 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {project.projectTitle || "Project Week"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Week {project.order}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={project.isLocked}
                    >
                      {project.isLocked ? "Locked" : "View Project"}
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
