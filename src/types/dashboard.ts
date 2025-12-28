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
