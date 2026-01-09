"use server";

import { db } from "@/lib/db";
import { recruiterApplication, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";

export async function getRecruiterApplications() {
    try {
        await requireAdmin();
        const applications = await db.query.recruiterApplication.findMany({
            with: {
                user: true
            }
        });
        return { success: true, data: applications };
    } catch (error) {
        console.error("Error fetching recruiter applications:", error);
        return { success: false, error: "Failed to fetch applications" };
    }
}

export async function updateRecruiterApplicationStatus(applicationId: string, status: "approved" | "rejected") {
    try {
        await requireAdmin();
        
        const application = await db.query.recruiterApplication.findFirst({
            where: eq(recruiterApplication.id, applicationId)
        });

        if (!application) {
            return { success: false, error: "Application not found" };
        }

        await db.transaction(async (tx) => {
             await tx.update(recruiterApplication)
                .set({ status })
                .where(eq(recruiterApplication.id, applicationId));

             if (status === "approved") {
                 await tx.update(user)
                    .set({ role: "recruiter" })
                    .where(eq(user.id, application.userId));
             }
        });

        revalidatePath("/dashboard/admin");
        return { success: true, message: `Application ${status}` };

    } catch (error) {
        console.error("Error updating application:", error);
        return { success: false, error: "Failed to update application" };
    }
}

export async function getApprovedRecruiters() {
    try {
        await requireAdmin();
        const recruiters = await db.query.user.findMany({
            where: eq(user.role, "recruiter")
        });
        return { success: true, data: recruiters };
    } catch (error) {
        console.error("Error fetching approved recruiters:", error);
        return { success: false, error: "Failed to fetch recruiters" };
    }
}
