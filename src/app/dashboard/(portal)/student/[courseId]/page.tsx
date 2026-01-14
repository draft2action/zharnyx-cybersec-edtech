import { requireStudent } from "@/lib/auth/role-guard";
import { db } from "@/lib/db";
import { course, enrollment } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { CourseViewShell } from "@/components/student/course-view/course-view-shell";
import { AnimatedBackground } from "@/components/shared/animated-background";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  await requireStudent();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  // Verify enrollment
  const enrollmentRecord = await db.query.enrollment.findFirst({
    where: and(
      eq(enrollment.studentId, session.user.id),
      eq(enrollment.courseId, courseId)
    ),
  });

  if (!enrollmentRecord) {
    redirect("/dashboard/student");
  }

  // Fetch full course data
  const courseData = await db.query.course.findFirst({
    where: eq(course.id, courseId),
    with: {
      months: {
        orderBy: (months, { asc }) => [asc(months.order)],
        with: {
          weeks: {
            orderBy: (weeks, { asc }) => [asc(weeks.order)],
            with: {
              assessments: true,
              projectSubmissions: {
                where: (submissions, { eq }) =>
                  eq(submissions.studentId, session.user.id),
                limit: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!courseData) {
    notFound();
  }

  // Here we would also fetch progress data to determining locking status
  // For now passing raw course data

  return (
    <>
      <AnimatedBackground />
      <div className="relative flex min-h-screen pointer-events-none">
        <main className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto py-8">
          <CourseViewShell course={courseData} />
        </main>
      </div>
    </>
  );
}
