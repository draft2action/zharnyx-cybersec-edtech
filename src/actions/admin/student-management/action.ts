"use server";

import { db } from "@/lib/db";
import { user, assessmentResponse, projectSubmission } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/role-guard";
import { eq, like, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";


// Get All Users
export async function getAllUsers({
    page = 1,
    limit = 10,
    query = "",
    role = "all",
}: {
    page?: number;
    limit?: number;
    query?: string;
    role?: string;
}) {
    try {
        await requireAdmin();

        const offset = (page - 1) * limit;

        const searchCondition = query
            ? or(like(user.name, `%${query}%`), like(user.email, `%${query}%`))
            : undefined;

        const roleCondition = role && role !== "all"
            ? eq(user.role, role as "admin" | "mentor" | "student")
            : undefined;

        // Combine conditions using AND logic if both exist, or use whichever exists
        // simplified logic: and(search, role)
        // drizzle-orm 'and' handles undefineds gracefully usually, but let's be explicit
        const whereClause = searchCondition && roleCondition
            ? sql`${searchCondition} and ${roleCondition}`
            : searchCondition || roleCondition;

        const [users, totalCountResult] = await Promise.all([
            db
                .select()
                .from(user)
                .where(whereClause)
                .limit(limit)
                .offset(offset)
                .orderBy(user.createdAt),
            db
                .select({ count: sql<number>`count(*)` })
                .from(user)
                .where(whereClause),
        ]);

        const totalCount = Number(totalCountResult[0]?.count || 0);
        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            data: users,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}


// Update User Role
export async function updateUserRole(userId: string, newRole: "admin" | "mentor" | "student") {
    try {
        await requireAdmin();
        await db
            .update(user)
            .set({ role: newRole })
            .where(eq(user.id, userId));

        revalidatePath("/admin/user-management");
        return { success: true, message: "User role updated successfully" };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to update user role" };
    }
}

// Get User Progress
export async function getUserProgress(userId: string) {
    try {
        await requireAdmin();

        const [assessments, projects] = await Promise.all([
            db.query.assessmentResponse.findMany({
                where: eq(assessmentResponse.studentId, userId),
                with: {
                    assessment: true,
                }
            }),
            db.query.projectSubmission.findMany({
                where: eq(projectSubmission.studentId, userId),
                with: {
                    week: true,
                }
            })
        ]);

        return {
            success: true,
            data: {
                assessments,
                projects,
            }
        };

    } catch (error) {
        console.error("Error fetching user progress:", error);
        return { success: false, error: "Failed to fetch user progress" };
    }
}
