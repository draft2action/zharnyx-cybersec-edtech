"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/role-guard";
import { eq, like, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllUsers({
    page = 1,
    limit = 10,
    query = "",
}: {
    page?: number;
    limit?: number;
    query?: string;
}) {
    try {
        await requireAdmin();

        const offset = (page - 1) * limit;

        const whereClause = query
            ? or(like(user.name, `%${query}%`), like(user.email, `%${query}%`))
            : undefined;

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
