"use server";

import { db } from "@/lib/db";
import { mentorApplication, user } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/role-guard";
import { eq, like, or, sql, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Get Mentor Applications
export async function getMentorApplications({
    page = 1,
    limit = 10,
    search = "",
    status = "",
}: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string | undefined;
}) {
    try {
        await requireAdmin();

        const offset = (page - 1) * limit;

        const whereClause = and(
            search
                ? or(
                    like(mentorApplication.fullName, `%${search}%`),
                    like(mentorApplication.email, `%${search}%`)
                )
                : undefined,
            status && status !== "all"
                ? eq(mentorApplication.status, status as "pending" | "approved" | "rejected")
                : undefined
        );

        const [applications, totalCountResult] = await Promise.all([
            db
                .select()
                .from(mentorApplication)
                .where(whereClause)
                .limit(limit)
                .offset(offset)
                .orderBy(desc(mentorApplication.createdAt)),
            db
                .select({ count: sql<number>`count(*)` })
                .from(mentorApplication)
                .where(whereClause),
        ]);

        const totalCount = Number(totalCountResult[0]?.count || 0);
        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            data: applications,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching mentor applications:", error);
        return { success: false, error: "Failed to fetch mentor applications" };
    }
}

// Update Mentor Application Status
export async function updateMentorApplicationStatus(
    applicationId: string,
    newStatus: "approved" | "rejected"
) {
    try {
        await requireAdmin();

        // Transaction to ensure atomicity
        await db.transaction(async (tx) => {
            // 1. Update Application Status
            const [updatedApp] = await tx
                .update(mentorApplication)
                .set({ status: newStatus })
                .where(eq(mentorApplication.id, applicationId))
                .returning();

            if (!updatedApp) {
                throw new Error("Application not found");
            }

            // 2. If Approved, Update User Role
            if (newStatus === "approved") {
                await tx
                    .update(user)
                    .set({ role: "mentor" })
                    .where(eq(user.id, updatedApp.userId));
            }
        });

        revalidatePath("/dashboard/admin");
        return { success: true, message: `Application ${newStatus} successfully` };
    } catch (error) {
        console.error("Error updating mentor application status:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update status",
        };
    }
}

// Get Approved Mentors (for dropdowns)
export async function getApprovedMentors() {
    try {
        await requireAdmin();
        const mentors = await db.select({
            id: user.id,
            name: user.name,
            email: user.email,
        }).from(user).where(eq(user.role, "mentor"));

        return { success: true, data: mentors };
    } catch (error) {
        console.error("Error fetching approved mentors:", error);
        return { success: false, error: "Failed to fetch mentors" };
    }
}
