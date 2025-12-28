import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireStudent } from "@/lib/auth/role-guard";
import { StudentDashboardShell } from "@/components/dashboard/student/student-dashboard-shell";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { db } from "@/lib/db";
import { course, enrollment } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function StudentPage() {
  await requireStudent();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null; // Should be handled by requireStudent but strict check

  // Fetch all published courses
  const allCourses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    orderBy: [desc(course.createdAt)],
  });

  // Fetch user enrollments
  const userEnrollments = await db.query.enrollment.findMany({
    where: eq(enrollment.studentId, session.user.id),
    with: {
      course: true,
    },
  });

  // Map to distinct lists
  const enrolledCourseIds = new Set(userEnrollments.map((e) => e.courseId));

  const availableCourses = allCourses.map((c) => ({
    ...c,
    isEnrolled: enrolledCourseIds.has(c.id),
  }));

  const enrolledCoursesList = userEnrollments.map((e) => ({
    id: e.course.id,
    title: e.course.title,
    // Mock progress for now, as we haven't implemented progress calculation yet
    progress: 0,
    lastAccessed: "Recently",
    totalModules: 0, // Placeholder
    completedModules: 0, // Placeholder
  }));

  return (
    <>
      <AnimatedBackground />
      <div className="relative flex min-h-screen pointer-events-none">
        <main className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                Student Dashboard
              </h1>
              <p className="text-gray-400 font-mono mt-2 text-lg">
                Track your learning journey and view assignments
              </p>
            </div>
          </div>

          <StudentDashboardShell
            availableCourses={availableCourses}
            enrolledCourses={enrolledCoursesList}
          />
        </main>
      </div>
    </>
  );
}
