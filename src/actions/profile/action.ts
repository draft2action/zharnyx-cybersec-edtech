"use server";

import { db } from "@/lib/db";
import { user, projectSubmission, studentProgress, courseWeek } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth/role-guard"; // Use my helper

export async function getUserProfile(userId: string) {
    try {
        const session = await getCurrentSession();
        if (!session) {
             return { success: false, error: "Unauthorized" };
        }

        const userProfile = await db.query.user.findFirst({
            where: eq(user.id, userId),
            with: {
                projectSubmissions: {
                    with: {
                        week: true
                    }
                },
                progress: {
                     where: eq(studentProgress.isCompleted, true),
                     with: {
                         week: true
                     }
                }
            }
        });

        if (!userProfile) {
            return { success: false, error: "User not found" };
        }

        return { success: true, data: userProfile };

    } catch (error) {
        console.error("Error fetching profile:", error);
        return { success: false, error: "Failed to fetch profile" };
    }
}
