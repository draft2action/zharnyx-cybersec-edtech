"use server";

import { db } from "@/lib/db";
import { recruiterApplication, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const RecruiterApplicationSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  companyName: z.string().min(1, "Company Name is required"),
  position: z.string().min(1, "Position is required"),
  contactNo: z.string().min(1, "Contact Number is required"),
  linkedinUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export type RecruiterApplicationValues = z.infer<typeof RecruiterApplicationSchema>;

export async function submitRecruiterApplication(data: RecruiterApplicationValues) {
    try {
        const session = await getCurrentSession();
        if (!session || !session.user) {
            return { success: false, error: "Unauthorized" };
        }

        const userId = session.user.id;

        // Check if already applied
        const existing = await db.query.recruiterApplication.findFirst({
            where: eq(recruiterApplication.userId, userId),
        });

        if (existing) {
             if (existing.status === 'pending') {
                 return { success: false, error: "You already have a pending application." };
             }
             if (existing.status === 'approved') {
                 return { success: false, error: "You are already a recruiter." };
             }
             // If rejected, maybe allow re-apply? For now, block.
             return { success: false, error: "Your previous application was rejected." };
        }

        const validated = RecruiterApplicationSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: "Invalid data" };
        }

        await db.insert(recruiterApplication).values({
            id: createId(),
            userId: userId,
            ...validated.data,
            status: "pending",
        });

        return { success: true, message: "Application submitted successfully" };

    } catch (error) {
        console.error("Error submitting recruiter application:", error);
        return { success: false, error: "Failed to submit application" };
    }
}
