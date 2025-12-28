"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/shared/transition-link";
import { BookOpen, Users } from "lucide-react";

export function ManagedCourses() {
  // Mock data
  const courses = [
    {
      id: "1",
      title: "Advanced Penetration Testing",
      students: 45,
      status: "Active",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Security Operations Center (SOC) Fundamentals",
      students: 128,
      status: "Active",
      rating: 4.6,
    },
  ];

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white font-mono flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            Managed Courses
          </CardTitle>
          <CardDescription className="text-gray-400 font-mono">
            Courses you are teaching
          </CardDescription>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-white/10 text-white hover:bg-white/10"
        >
          <TransitionLink href="/dashboard/admin/courses/new">
            Create New
          </TransitionLink>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 rounded-lg border border-white/5 bg-white/5 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white font-mono">
                  {course.title}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {course.students} Students
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      course.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <TransitionLink href={`/dashboard/admin/courses/${course.id}`}>
                  Manage
                </TransitionLink>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
