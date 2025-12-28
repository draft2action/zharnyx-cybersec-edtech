"use server";

import { db } from "@/lib/db";
import { studentProgress } from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markWeekComplete(weekId: string, courseId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const existing = await db.query.studentProgress.findFirst({
            where: and(
                eq(studentProgress.studentId, session.user.id),
                eq(studentProgress.weekId, weekId)
            )
        });

        if (existing) {
            if (!existing.isCompleted) {
                await db.update(studentProgress)
                    .set({ isCompleted: true, completedAt: new Date() })
                    .where(eq(studentProgress.id, existing.id));
            }
        } else {
            await db.insert(studentProgress).values({
                id: crypto.randomUUID(),
                studentId: session.user.id,
                weekId,
                isCompleted: true,
                completedAt: new Date(),
                isUnlocked: true // If they can complete it, it was unlocked
            });
        }

        revalidatePath(`/dashboard/student/${courseId}`);
        return { success: true };

    } catch (error) {
        console.error("Error marking week complete:", error);
        return { success: false, error: "Failed to update progress" };
    }
}
