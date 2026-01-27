import { db } from "@/lib/db";
import { course, courseMonth, courseWeek } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { CoursePreview } from "@/components/programs/course-preview";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";

interface PageProps {
    params: Promise<{
        courseId: string
    }>;
}

export default async function CoursePreviewPage(props: PageProps) {
    const params = await props.params;
    const {
        courseId
    } = params;

    const session = await getCurrentSession();

    const courseData = await db.query.course.findFirst({
        where: eq(course.id, courseId),
        with: {
            months: {
                orderBy: asc(courseMonth.order),
                with: {
                    weeks: {
                        orderBy: asc(courseWeek.order),
                    }
                }
            }
        }
    });

    if (!courseData) {
        return notFound();
    }

    return (
        <main>
            <CoursePreview course={courseData} isLoggedIn={!!session} />
        </main>
    );
}
