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
    <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl  h-full">
      <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
              Managed Courses
            </CardTitle>
          </div>
          <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
            Courses you are teaching
          </CardDescription>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-xl border border-white text-white bg-transparent hover:bg-white hover:text-black font-sans uppercase text-xs font-bold tracking-wide h-8"
        >
          <TransitionLink href="/dashboard/admin/courses/new">
            Create
          </TransitionLink>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 border-b border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-bold text-white font-sans text-sm leading-tight group-hover:text-purple-400 transition-colors">
                  {course.title}
                </h4>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-sans uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {course.students} Students
                  </span>
                  <span
                    className={`px-1.5 py-0.5 border ${
                      course.status === "Active"
                        ? "border-green-500 text-green-400"
                        : "border-gray-500 text-gray-400"
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
                className="text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl h-8 font-sans text-xs uppercase"
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
