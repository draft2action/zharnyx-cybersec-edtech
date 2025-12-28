"use server";

import { db } from "@/lib/db";
import { enrollment, course } from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function enrollStudent(courseId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        // Check if course exists
        const existingCourse = await db.query.course.findFirst({
            where: eq(course.id, courseId),
        });

        if (!existingCourse) {
            return { success: false, error: "Course not found" };
        }

        // Check if already enrolled
        const existingEnrollment = await db.query.enrollment.findFirst({
            where: and(
                eq(enrollment.studentId, session.user.id),
                eq(enrollment.courseId, courseId)
            ),
        });

        if (existingEnrollment) {
            return { success: false, error: "Already enrolled in this course" };
        }

        await db.insert(enrollment).values({
            id: crypto.randomUUID(),
            studentId: session.user.id,
            courseId: courseId,
            paymentStatus: "paid",
            amount: 0, // Mock amount
        });

        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (error) {
        console.error("Enrollment error:", error);
        return { success: false, error: "Failed to enroll" };
    }
}
