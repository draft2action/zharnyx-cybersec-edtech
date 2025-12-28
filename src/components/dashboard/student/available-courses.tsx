"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle } from "lucide-react";
import { PaymentDialog } from "@/components/student/payment-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AvailableCourse } from "@/types/dashboard";

interface AvailableCoursesProps {
  courses: AvailableCourse[];
}

export function AvailableCourses({ courses }: AvailableCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<AvailableCourse | null>(
    null
  );
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="bg-black/40 border-white/10 backdrop-blur-sm flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-white font-mono text-lg">
                {course.title}
              </CardTitle>
              <CardDescription className="text-gray-400 line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              {course.isEnrolled ? (
                <Button
                  className="w-full bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                  variant="outline"
                  onClick={() => router.push(`/dashboard/student/${course.id}`)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Enrolled
                </Button>
              ) : (
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => setSelectedCourse(course)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Enroll Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground p-8">
            No courses available at the moment.
          </div>
        )}
      </div>

      {selectedCourse && (
        <PaymentDialog
          open={!!selectedCourse}
          onOpenChange={(open) => !open && setSelectedCourse(null)}
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
        />
      )}
    </>
  );
}
