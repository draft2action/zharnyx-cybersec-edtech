import { db } from "@/lib/db";
import { user, assessmentResponse, projectSubmission } from "@/lib/db/schema";
import { eq, sum } from "drizzle-orm";

/**
 * Calculates the total score for a student from all assessments and projects
 * and updates the user record.
 * @param studentId 
 */
export async function updateStudentTotalScore(studentId: string) {
    try {
        // Sum assessment scores
        // Note: sum() in drizzle might return string or number depending on driver, casting to number to be safe
        // However, drizzle-orm helper usually helps.
        // Let's filter client side or use simple query if sum is tricky with current setup
        
        const assessments = await db.query.assessmentResponse.findMany({
            where: eq(assessmentResponse.studentId, studentId),
            columns: {
                score: true
            }
        });

        const projects = await db.query.projectSubmission.findMany({
            where: eq(projectSubmission.studentId, studentId),
            columns: {
                score: true
            }
        });

        const totalAssessmentScore = assessments.reduce((acc, curr) => acc + (curr.score || 0), 0);
        const totalProjectScore = projects.reduce((acc, curr) => acc + (curr.score || 0), 0);
        
        const totalScore = totalAssessmentScore + totalProjectScore;

        await db.update(user)
            .set({ totalScore: totalScore })
            .where(eq(user.id, studentId));

        return { success: true, totalScore };
    } catch (error) {
        console.error("Error updating student total score:", error);
        return { success: false, error: "Failed to update total score" };
    }
}
