"use server";

import { db } from "@/lib/db";
import {
  courseWeek,
  weekMentor,
  course,
  courseMonth,
  assessment,
  assessmentResponse,
  projectSubmission,
  doubtSession,
  user,
} from "@/lib/db/schema";
import { eq, and, desc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { updateStudentTotalScore } from "@/lib/utils/score";

/**
 * Get weeks assigned to a mentor
 */
export async function getAssignedWeeks(mentorId: string) {
  try {
    const assignedWeeks = await db.query.weekMentor.findMany({
      where: eq(weekMentor.mentorId, mentorId),
      with: {
        week: {
          with: {
            month: {
              with: {
                course: true,
              },
            },
          },
        },
      },
    });

    return { success: true, data: assignedWeeks };
  } catch (error) {
    console.error("Error fetching assigned weeks:", error);
    return { success: false, error: "Failed to fetch assigned weeks" };
  }
}

/**
 * Get pending assignment assessments for a mentor's assigned weeks
 */
export async function getPendingAssignments(mentorId: string) {
  try {
    // 1. Get week IDs assigned to mentor
    const assigned = await db
      .select({ weekId: weekMentor.weekId })
      .from(weekMentor)
      .where(eq(weekMentor.mentorId, mentorId));

    const weekIds = assigned.map((a) => a.weekId);

    if (weekIds.length === 0) {
      return { success: true, data: [] };
    }

    // 2. Get pending responses for these weeks
    const responses = await db.query.assessmentResponse.findMany({
      where: and(
        eq(assessmentResponse.status, "pending"),
        // We need to filter by weekId through assessment relation
        // But drizzle query builder handles relations nicely if we filter on the relation
      ),
      with: {
        student: true,
        assessment: {
          with: {
            week: true,
          },
        },
      },
      orderBy: [desc(assessmentResponse.submittedAt)],
    });

    // Filter manually if nested filter complexity is high or use advanced query
    // Here we filter results to only include those in assigned weeks
    const filteredResponses = responses.filter((r) =>
      weekIds.includes(r.assessment.weekId)
    );

    return { success: true, data: filteredResponses };
  } catch (error) {
    console.error("Error fetching pending assignments:", error);
    return { success: false, error: "Failed to fetch pending assignments" };
  }
}

/**
 * Get pending project submissions for a mentor's assigned weeks
 */
export async function getPendingProjects(mentorId: string) {
  try {
    const assigned = await db
      .select({ weekId: weekMentor.weekId })
      .from(weekMentor)
      .where(eq(weekMentor.mentorId, mentorId));

    const weekIds = assigned.map((a) => a.weekId);

    if (weekIds.length === 0) {
      return { success: true, data: [] };
    }

    const submissions = await db.query.projectSubmission.findMany({
      where: and(
        eq(projectSubmission.status, "pending"),
        inArray(projectSubmission.weekId, weekIds)
      ),
      with: {
        student: true,
        week: {
          with: {
            month: {
              with: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: [desc(projectSubmission.createdAt)],
    });

    return { success: true, data: submissions };
  } catch (error) {
    console.error("Error fetching pending projects:", error);
    return { success: false, error: "Failed to fetch pending projects" };
  }
}

/**
 * Get doubt session requests
 * @param mentorId - Optional, if we want to filter by assigned mentor.
 * Currently getting all pending or assigned to this mentor.
 */
export async function getDoubtRequests(mentorId: string) {
  try {
    const requests = await db.query.doubtSession.findMany({
      // Fetch pending requests OR requests assigned to this mentor
      // For now, let's fetch all pending requests that are either unassigned OR assigned to this mentor
      // And also all scheduled sessions for this mentor
      where: (doubt, { or, and, eq, isNull }) =>
        or(
            and(eq(doubt.status, "pending"), isNull(doubt.mentorId)),
            eq(doubt.mentorId, mentorId)
        ),
      with: {
        student: true,
      },
      orderBy: [desc(doubtSession.createdAt)],
    });

    return { success: true, data: requests };
  } catch (error) {
    console.error("Error fetching doubt requests:", error);
    return { success: false, error: "Failed to fetch doubt requests" };
  }
}

/**
 * Update doubt request (Approve/Reject/Complete)
 */
export async function updateDoubtRequest(
  requestId: string,
  data: {
    status: "scheduled" | "rejected" | "completed";
    scheduledAt?: Date;
    meetLink?: string;
    mentorId: string;
  }
) {
  try {
    await db
      .update(doubtSession)
      .set({
        status: data.status,
        scheduledAt: data.scheduledAt,
        meetLink: data.meetLink,
        mentorId: data.mentorId,
      })
      .where(eq(doubtSession.id, requestId));

    revalidatePath("/dashboard/mentor");
    return { success: true };
  } catch (error) {
    console.error("Error updating doubt request:", error);
    return { success: false, error: "Failed to update doubt request" };
  }
}

/**
 * Score an assignment
 */
export async function scoreAssignment(
  responseId: string,
  score: number
) {
  try {
    // 1. Get the assessment deadline
    const response = await db.query.assessmentResponse.findFirst({
        where: eq(assessmentResponse.id, responseId),
        with: {
            assessment: true
        }
    });

    if (!response) throw new Error("Response not found");

    let finalScore = score;
    
    // Check for late penalty
    if (response.assessment.deadline && response.submittedAt) {
        const deadline = new Date(response.assessment.deadline);
        const submittedAt = new Date(response.submittedAt);
        if (submittedAt > deadline) {
             finalScore = Math.max(0, score - 2); // Apply -2 penalty, min 0
        }
    }

    await db
      .update(assessmentResponse)
      .set({
        score: finalScore,
        status: "completed",
      })
      .where(eq(assessmentResponse.id, responseId));
    
    // Update total score
    await updateStudentTotalScore(response.studentId);

    revalidatePath("/dashboard/mentor");
    return { success: true };
  } catch (error) {
    console.error("Error scoring assignment:", error);
    return { success: false, error: "Failed to score assignment" };
  }
}

/**
 * Score a project
 */
export async function scoreProject(
  submissionId: string,
  score: number,
  review: string
) {
  try {
    // For projects, we don't have a strict deadline logic in the user request, 
    // but schema has it if we wanted. User request specially mentioned assessment.
    // So just applying score.
    
    await db
      .update(projectSubmission)
      .set({
        score: score,
        review: review,
        status: "graded",
      })
      .where(eq(projectSubmission.id, submissionId));
      
    // Fetch studentId to update total score
    const submission = await db.query.projectSubmission.findFirst({
        where: eq(projectSubmission.id, submissionId),
        columns: { studentId: true }
    });
    
    if(submission) {
        await updateStudentTotalScore(submission.studentId);
    }

    revalidatePath("/dashboard/mentor");
    return { success: true };
  } catch (error) {
    console.error("Error scoring project:", error);
    return { success: false, error: "Failed to score project" };
  }
}
