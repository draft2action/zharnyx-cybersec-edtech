"use server";

import { db } from "@/lib/db";
import { user, projectSubmission } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth/role-guard";

export type Candidate = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    projects: {
        id: string;
        title: string; // Wait, projectSubmission doesn't have title directly, it links to week -> projectTitle. 
        // Need to join or just count? "showcase their projects"
        // For dashboard list, maybe just count or top projects?
        // Requirement: "visible in the recruiter candidte dashbaord"
        // Usually list of candidates.
    }[];
    totalScore: number; // Maybe useful?
};

export async function getRecruiterCandidates() {
    try {
        const session = await getCurrentSession();
        if (!session || !session.user || (session.user.role !== 'recruiter' && session.user.role !== 'admin')) {
             return { success: false, error: "Unauthorized" };
        }

        // Fetch visible students
        const students = await db.query.user.findMany({
            where: and(eq(user.role, "student"), eq(user.isRecruiterVisible, true)),
            with: {
                projectSubmissions: {
                    with: {
                        week: true
                    }
                },
                assessmentResponses: true // if needed for score
            }
        });

        // Map to Candidate type
        const candidates = students.map(student => {
             // Calculate score if needed, or just return basic info
             return {
                 id: student.id,
                 name: student.name,
                 email: student.email,
                 image: student.image,
                 projectCount: student.projectSubmissions.length,
                 projects: student.projectSubmissions.map(p => ({
                     id: p.id,
                     title: p.week.projectTitle || "Untitled Project",
                     description: p.description,
                     githubUrl: p.githubUrl,
                     liveUrl: p.liveUrl
                 }))
             };
        });

        return { success: true, data: candidates };

    } catch (error) {
        console.error("Error fetching candidates:", error);
        return { success: false, error: "Failed to fetch candidates" };
    }
}
