"use client";

import { useState } from "react";
import { CourseList } from "./course-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CourseBuilder } from "./course-builder/course-builder";

export function CourseManager() {
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleEdit = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView("edit");
  };

  const handleCreate = () => {
    setSelectedCourseId(null);
    setView("create");
  };

  const handleBack = () => {
    setView("list");
    setSelectedCourseId(null);
  };

  if (view === "list") {
    return (
      <div className="space-y-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <h2 className="text-2xl font-bold tracking-tight text-white font-mono">
            Courses
          </h2>
          <Button
            onClick={handleCreate}
            className="font-mono bg-white text-black hover:bg-gray-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
        <CourseList onEdit={handleEdit} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="font-mono border-white/10 text-black hover:bg-white/10"
        >
          Back to List
        </Button>
        {/* Header moved to CourseBuilder or kept here if prefer outer control. 
            CourseBuilder has its own header now. */}
      </div>

      <CourseBuilder courseId={selectedCourseId} onComplete={handleBack} />
    </div>
  );
}
