"use server";

import { db } from "@/lib/db";
import { user, assessmentResponse, projectSubmission } from "@/lib/db/schema";
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

export async function getStudentRankings(): Promise<{
  success: boolean;
  data?: RankedStudent[];
  error?: string;
}> {
  try {
    await requireAdmin();

    // Fetch students sorted by totalScore DESC
    const students = await db.query.user.findMany({
      where: sql`${user.totalScore} > 0`,
      orderBy: [desc(user.totalScore), desc(user.createdAt)],
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        totalScore: true,
        isRecruiterVisible: true,
      },
      // Note: If we need broken down assessment/project scores in the UI, we might still need to join or fetch.
      // However, typical ranking tables just show total score.
      // If the UI expects assessmentScore/projectScore, we might need to query them or simplify the UI.
      // The existing UI component shows them. So we should fetch them or aggregate them?
      // To make it efficient, let's keep it simple for now and maybe aggregate if strictly needed,
      // OR simply remove the breakdown columns from the UI if the user didn't explicitly ask for them to stay.
      // User request: "display user from higher score to lower score".
      // Implementation plan said: "Update ranking action to fetch users sorted by totalScore".
      // Let's optimize: fetch aggregations if possible or just loop for the breakdown details if N is small.
      // Given the user wants efficiency ("currently calculate rank and score in action and push... suggestion is every student will have score..."),
      // relying on totalScore is the key.
      // Only fetching breakdown if needed.
      // Let's assume for now we just show totalScore.
      // But to keep UI compatible, let's just fill assessmentScore/projectScore with 0 or simplistic fetches if needed
      // OR do a quick single-query aggregation if Drizzle supports it easily.
      // Drizzle query builder findMany with `with` doesn't do aggregation easily.
      // Let's fetch basic breakdown *lazily* or just accept the optimization of sorting is done by DB.
      with: {
        assessmentResponses: {
          columns: { score: true },
        },
        projectSubmissions: {
          columns: { score: true },
        },
      },
    });

    const rankings: RankedStudent[] = students.map((student) => {
      const assessmentScore = student.assessmentResponses.reduce(
        (acc, curr) => acc + (curr.score || 0),
        0
      );
      const projectScore = student.projectSubmissions.reduce(
        (acc, curr) => acc + (curr.score || 0),
        0
      );

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        image: student.image,
        totalScore: student.totalScore, // Use persistent score
        assessmentScore,
        projectScore,
        lastSubmissionAt: null, // Removed strictly logic, strictly relying on score
        isRecruiterVisible: student.isRecruiterVisible,
      };
    });

    return { success: true, data: rankings };
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return { success: false, error: "Failed to fetch rankings" };
  }
}

export async function toggleRecruiterVisibility(
  studentId: string,
  isVisible: boolean
) {
  try {
    await requireAdmin();
    await db
      .update(user)
      .set({ isRecruiterVisible: isVisible })
      .where(eq(user.id, studentId));
    revalidatePath("/dashboard/admin");
    return { success: true, message: "Visibility updated" };
  } catch (error) {
    console.error("Error updating visibility:", error);
    return { success: false, error: "Failed to update visibility" };
  }
}
