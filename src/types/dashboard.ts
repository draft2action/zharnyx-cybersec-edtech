import { InferSelectModel } from "drizzle-orm";
import { course } from "@/lib/db/schema";

export type DashboardCourse = InferSelectModel<typeof course>;

export interface AvailableCourse extends DashboardCourse {
    isEnrolled?: boolean;
}

export interface EnrolledCourseSummary {
    id: string;
    title: string;
    progress: number;
    lastAccessed: string;
    totalModules: number;
    completedModules: number;
}

export interface CourseAssessment {
    id: string;
    title: string;
    topic: string;
    problem: string;
    submissionFormat: string;
    deadline: string | Date | null;
    isCompleted?: boolean;
    isRejected?: boolean; // Added for < 50 score
    isPending?: boolean; // Submitted but not graded
    score?: number | null;
    feedback?: string | null;
}

export interface DashboardCourseWeek {
    id: string;
    title: string;
    isLocked: boolean;
    isCompleted: boolean;
    isPending?: boolean;
    content?: string | null;
    resources?: any; // JSON
    assessments?: CourseAssessment[];
    projectTitle?: string | null;
    projectDescription?: string | null;
    isProject: boolean;
    projectScore?: number | null;
    projectReview?: string | null;
    isProjectRejected?: boolean;
}

export interface DashboardCourseMonth {
    id: string;
    title: string;
    weeks: DashboardCourseWeek[];
}
