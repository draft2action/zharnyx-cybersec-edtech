"use server";

import { db } from "@/lib/db";
import { mentorApplication } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth/role-guard";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type MentorApplicationData = {
    fullName: string;
    email: string;
    contactNo: string;
    gender: string;
    dob: Date;
    address: string;
    linkedinUrl?: string;
    resumeUrl: string;
    portfolioUrl?: string;
    experience?: string; // JSON string
};

export async function submitMentorApplication(data: MentorApplicationData) {
    try {
        const session = await requireAuth();
        const userId = session.user.id;

        // Check if user already has a pending application
        const existingApplication = await db.query.mentorApplication.findFirst({
            where: (app, { eq, and, or }) => and(
                eq(app.userId, userId),
                or(eq(app.status, "pending"), eq(app.status, "approved"))
            )
        });

        if (existingApplication) {
            if (existingApplication.status === 'approved') {
                return { success: false, error: "You are already a mentor!" };
            }
            return { success: false, error: "You already have a pending application." };
        }

        await db.insert(mentorApplication).values({
            id: crypto.randomUUID(),
            userId,
            ...data,
            status: "pending",
        });

        revalidatePath("/dashboard");
        return { success: true, message: "Application submitted successfully!" };
    } catch (error) {
        console.error("Error submitting mentor application:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to submit application."
        };
    }
}

export async function getMentorApplicationStatus() {
    try {
        const session = await requireAuth();
        const userId = session.user.id;

        const application = await db.query.mentorApplication.findFirst({
            where: eq(mentorApplication.userId, userId),
            orderBy: (app, { desc }) => [desc(app.createdAt)],
        });

        return { success: true, status: application?.status || null };
    } catch (error) {
        console.error("Error fetching application status:", error);
        return { success: false, error: "Failed to fetch status." };
    }
}
