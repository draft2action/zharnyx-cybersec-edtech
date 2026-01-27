import { AnimatedBackground } from "@/components/shared/animated-background";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { getEnrolledCourses } from "@/actions/student/dashboard";
import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ProgramsList } from "../../components/programs/programs-list";

export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const session = await getCurrentSession();
  // ...
  let enrolledCourseIds: string[] = [];

  if (session?.user?.id) {
    const enrolledRes = await getEnrolledCourses(session.user.id);
    if (enrolledRes.success && enrolledRes.data) {
      enrolledCourseIds = enrolledRes.data.map(c => c.id);
    }
  }

  const courses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    with: {
      months: {
        with: {
          weeks: true
        }
      },
    },
  });

  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto max-w-[95%]">
        <ProgramsList courses={courses} enrolledCourseIds={enrolledCourseIds} />
      </main>
    </>
  );
}
