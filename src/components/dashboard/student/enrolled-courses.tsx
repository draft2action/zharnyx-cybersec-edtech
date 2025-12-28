"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/shared/transition-link";
import { PlayCircle } from "lucide-react";

export function EnrolledCourses() {
  // Mock data - replace with real data fetching later
  const courses = [
    {
      id: "1",
      title: "Introduction to Cybersecurity",
      progress: 75,
      lastAccessed: "2 days ago",
      totalModules: 12,
      completedModules: 9,
    },
    {
      id: "2",
      title: "Network Defense Essentials",
      progress: 30,
      lastAccessed: "1 week ago",
      totalModules: 15,
      completedModules: 4,
    },
    {
      id: "3",
      title: "Ethical Hacking Basics",
      progress: 0,
      lastAccessed: "Not started",
      totalModules: 10,
      completedModules: 0,
    },
  ];

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-white font-mono flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-indigo-400" />
          Enrolled Courses
        </CardTitle>
        <CardDescription className="text-gray-400 font-mono">
          Continue where you left off
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 overflow-auto">
        {courses.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No enrolled courses. Browse our catalog to get started.
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white font-mono">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-mono">
                    Last accessed: {course.lastAccessed}
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-8 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <TransitionLink href={`/courses/${course.id}`}>
                    {course.progress > 0 ? "Continue" : "Start"}
                  </TransitionLink>
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>{course.progress}% Complete</span>
                  <span>
                    {course.completedModules}/{course.totalModules} Modules
                  </span>
                </div>
                <Progress
                  value={course.progress}
                  className="h-2 bg-white/10"
                  indicatorClassName="bg-indigo-500"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
