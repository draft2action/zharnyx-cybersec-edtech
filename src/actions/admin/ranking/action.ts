"use server";

import { db } from "@/lib/db";
import { 
    user, 
    assessmentResponse, 
    projectSubmission, 
} from "@/lib/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";

export type RankedStudent = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    totalScore: number;
    assessmentScore: number;
    projectScore: number;
    lastSubmissionAt: Date | null;
    isRecruiterVisible: boolean;
};

export async function getStudentRankings(): Promise<{ success: boolean; data?: RankedStudent[]; error?: string }> {
    try {
        await requireAdmin();

        // 1. Fetch all students
        const students = await db.query.user.findMany({
            where: eq(user.role, "student"),
        });

        const rankings: RankedStudent[] = [];

        // This could be optimized with raw SQL or complex joins, but for logic clarity and MV, we'll iterate.
        // Assuming student count isn't massive yet.
        
        for (const student of students) {
            // Get Assessment Scores
            const assessments = await db.query.assessmentResponse.findMany({
                where: eq(assessmentResponse.studentId, student.id),
            });

            // Get Project Scores
            const projects = await db.query.projectSubmission.findMany({
                where: eq(projectSubmission.studentId, student.id),
            });

            let assessmentScore = 0;
            let projectScore = 0;
            let lastSubmissionAt: Date | null = null;

            for (const a of assessments) {
                if (a.score) assessmentScore += a.score;
                if (a.submittedAt) {
                   if (!lastSubmissionAt || new Date(a.submittedAt) > lastSubmissionAt) {
                       lastSubmissionAt = new Date(a.submittedAt);
                   }
                }
            }

            for (const p of projects) {
                if (p.score) projectScore += p.score;
                 // Projects created_at or updated_at? Usually updated_at is when it's graded or submitted?
                 // Schema has createdAt. Let's use createdAt for submission time approximation or if there was a submittedAt.
                 // projectSubmission has createdAt.
                 if (p.createdAt) {
                    if (!lastSubmissionAt || new Date(p.createdAt) > lastSubmissionAt) {
                        lastSubmissionAt = new Date(p.createdAt);
                    }
                 }
            }

            rankings.push({
                id: student.id,
                name: student.name,
                email: student.email,
                image: student.image,
                totalScore: assessmentScore + projectScore,
                assessmentScore,
                projectScore,
                lastSubmissionAt,
                isRecruiterVisible: student.isRecruiterVisible,
            });
        }

        // Sort:
        // 1. Total Score DESC
        // 2. Earlier Submission Time ASC (First to submit gets higher rank)
        // 3. Name ASC
        rankings.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            if (a.lastSubmissionAt && b.lastSubmissionAt) {
                 if (a.lastSubmissionAt.getTime() !== b.lastSubmissionAt.getTime()) {
                     return a.lastSubmissionAt.getTime() - b.lastSubmissionAt.getTime();
                 }
            }
            // If one has no submission, they should probably be lower? Or it doesn't matter since score 0.
            // If same score (e.g. 0), sort by name.
            return a.name.localeCompare(b.name);
        });

        return { success: true, data: rankings };

    } catch (error) {
        console.error("Error fetching rankings:", error);
        return { success: false, error: "Failed to fetch rankings" };
    }
}

export async function toggleRecruiterVisibility(studentId: string, isVisible: boolean) {
    try {
        await requireAdmin();
        await db.update(user).set({ isRecruiterVisible: isVisible }).where(eq(user.id, studentId));
        revalidatePath("/dashboard/admin");
        return { success: true, message: "Visibility updated" };
    } catch (error) {
        console.error("Error updating visibility:", error);
        return { success: false, error: "Failed to update visibility" };
    }
}
