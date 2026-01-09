"use server";

import { db } from "@/lib/db";
import {
    course,
    courseMonth,
    courseWeek,
    assessment,
    weekMentor
} from "@/lib/db/schema";
import { eq, desc, asc, like, and } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";
import { CourseFormValues } from "@/lib/validators/course";
import { createId } from "@paralleldrive/cuid2";

// --- CREATE ---

export async function createFullCourse(data: CourseFormValues) {
    try {
        await requireAdmin();

        await db.transaction(async (tx) => {
            // 1. Create Course
            const newCourseId = createId();
            const [newCourse] = await tx.insert(course).values({
                id: newCourseId,
                title: data.title,
                description: data.description,
                image: data.image || null,
                status: data.status,
            }).returning();

            // 2. Create Months
            if (data.months && data.months.length > 0) {
                for (const [mIndex, monthData] of data.months.entries()) {
                    const newMonthId = createId();
                    const [newMonth] = await tx.insert(courseMonth).values({
                        id: newMonthId,
                        courseId: newCourse.id,
                        title: monthData.title,
                        type: monthData.type,
                        order: mIndex + 1, // Ensure correct order from array
                    }).returning();

                    // 3. Create Weeks
                    if (monthData.weeks && monthData.weeks.length > 0) {
                        for (const [wIndex, weekData] of monthData.weeks.entries()) {
                            const newWeekId = createId();
                            const [newWeek] = await tx.insert(courseWeek).values({
                                id: newWeekId,
                                monthId: newMonth.id,
                                title: weekData.title,
                                order: wIndex + 1,
                                team: weekData.team || null,
                                isProject: weekData.isProject,
                                projectTitle: weekData.projectTitle,
                                projectDescription: weekData.projectDescription,
                                content: weekData.content || null,
                                resources: weekData.resources || [],
                            }).returning();

                            // 4. Create Assessment if exists
                            if (weekData.assessment) {
                                await tx.insert(assessment).values({
                                    id: createId(),
                                    weekId: newWeek.id,
                                    title: weekData.assessment.title,
                                    topic: weekData.assessment.topic!,
                                    problem: weekData.assessment.problem!,
                                    submissionFormat: weekData.assessment.submissionFormat,
                                    timer: weekData.assessment.timer,
                                });
                            }

                            // 5. Assign Mentors
                            if (weekData.mentorIds && weekData.mentorIds.length > 0) {
                                const mentorValues = weekData.mentorIds.map(mentorId => ({
                                    id: createId(),
                                    weekId: newWeek.id,
                                    mentorId: mentorId,
                                }));
                                await tx.insert(weekMentor).values(mentorValues);
                            }
                        }
                    }
                }
            }
        });

        revalidatePath("/dashboard/admin");
        return { success: true, message: "Course created successfully" };
    } catch (error) {
        console.error("Error creating course:", error);
        return { success: false, error: "Failed to create course" };
    }
}

// --- READ ---

export async function getAllCourses({
    page = 1,
    limit = 10,
    query = "",
    status = "all",
}: {
    page?: number;
    limit?: number;
    query?: string;
    status?: string;
}) {
    // ... existing read logic ...
    try {
        await requireAdmin();
        const offset = (page - 1) * limit;

        const conditions = [];
        if (query) {
            conditions.push(like(course.title, `%${query}%`));
        }
        if (status !== "all") {
            // Safe cast as we control the dropdown/input
            conditions.push(eq(course.status, status as "published" | "unpublished"));
        }

        const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

        const data = await db.query.course.findMany({
            where: whereCondition,
            limit: limit,
            offset: offset,
            orderBy: [desc(course.createdAt)],
        });

        // Simple count query:
        const allMatching = await db.select({ id: course.id }).from(course).where(whereCondition);
        const totalCount = allMatching.length;
        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            data,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching courses:", error);
        return { success: false, error: "Failed to fetch courses" };
    }
}

export async function getCourseDetails(courseId: string) {
    // ... existing get logic ...
    try {
        await requireAdmin();
        const courseData = await db.query.course.findFirst({
            where: eq(course.id, courseId),
            with: {
                months: {
                    orderBy: asc(courseMonth.order),
                    with: {
                        weeks: {
                            orderBy: asc(courseWeek.order),
                            with: {
                                assessments: true,
                                mentors: {
                                    with: {
                                        mentor: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!courseData) {
            return { success: false, error: "Course not found" };
        }

        return { success: true, data: courseData };

    } catch (error) {
        console.error("Error fetching course details:", error);
        return { success: false, error: "Failed to fetch course details" };
    }
}


// --- UPDATE ---

export async function updateFullCourse(courseId: string, data: CourseFormValues) {
    try {
        await requireAdmin();

        await db.transaction(async (tx) => {
            // 1. Update Course Details
            await tx.update(course)
                .set({
                    title: data.title,
                    description: data.description,
                    image: data.image || null,
                    status: data.status,
                })
                .where(eq(course.id, courseId));

            // Sync Months
            // Get existing month IDs
            const existingMonths = await tx.select({ id: courseMonth.id }).from(courseMonth).where(eq(courseMonth.courseId, courseId));
            const existingMonthIds = new Set(existingMonths.map(m => m.id));
            const incomingMonthIds = new Set(data.months.map(m => m.id).filter(Boolean));

            // Delete removed months
            const monthsToDelete = [...existingMonthIds].filter(id => !incomingMonthIds.has(id));
            if (monthsToDelete.length > 0) {
                // Should cascade delete everything via DB FKs
                for (const mId of monthsToDelete) {
                    await tx.delete(courseMonth).where(eq(courseMonth.id, mId));
                }
            }

            // Upsert Months
            for (const [mIndex, monthData] of data.months.entries()) {
                let currentMonthId = monthData.id;

                if (currentMonthId && existingMonthIds.has(currentMonthId)) {
                    // Update existing month
                    await tx.update(courseMonth).set({
                        title: monthData.title,
                        type: monthData.type,
                        order: mIndex + 1,
                    }).where(eq(courseMonth.id, currentMonthId));
                } else {
                    // Create new month
                    const newId = createId();
                    currentMonthId = newId; // Update for weeks
                    await tx.insert(courseMonth).values({
                        id: newId,
                        courseId: courseId,
                        title: monthData.title,
                        type: monthData.type,
                        order: mIndex + 1,
                    });
                }

                // Sync Weeks for this month
                if (currentMonthId) {
                    const existingWeeks = await tx.select({ id: courseWeek.id }).from(courseWeek).where(eq(courseWeek.monthId, currentMonthId));
                    const existingWeekIds = new Set(existingWeeks.map(w => w.id));
                    const incomingWeekIds = new Set(monthData.weeks.map(w => w.id).filter(Boolean));

                    // Delete removed weeks
                    const weeksToDelete = [...existingWeekIds].filter(id => !incomingWeekIds.has(id));
                    if (weeksToDelete.length > 0) {
                        for (const wId of weeksToDelete) {
                            await tx.delete(courseWeek).where(eq(courseWeek.id, wId));
                        }
                    }

                    // Upsert Weeks
                    for (const [wIndex, weekData] of monthData.weeks.entries()) {
                        let currentWeekId = weekData.id;

                        if (currentWeekId && existingWeekIds.has(currentWeekId)) {
                            // Update Week
                            await tx.update(courseWeek).set({
                                title: weekData.title,
                                order: wIndex + 1,
                                team: weekData.team || null,
                                isProject: weekData.isProject,
                                projectTitle: weekData.projectTitle,
                                projectDescription: weekData.projectDescription,
                                content: weekData.content || null,
                                resources: weekData.resources || [],
                            }).where(eq(courseWeek.id, currentWeekId));
                        } else {
                            // Insert Week
                            const newWId = createId();
                            currentWeekId = newWId;
                            await tx.insert(courseWeek).values({
                                id: newWId,
                                monthId: currentMonthId,
                                title: weekData.title,
                                order: wIndex + 1,
                                team: weekData.team || null,
                                isProject: weekData.isProject,
                                projectTitle: weekData.projectTitle,
                                projectDescription: weekData.projectDescription,
                                content: weekData.content || null,
                                resources: weekData.resources || [],
                            });
                        }

                        // Sync Assessment
                        const existingAssessment = await tx.query.assessment.findFirst({ where: eq(assessment.weekId, currentWeekId) });

                        if (weekData.assessment) {
                            if (existingAssessment) {
                                // Update
                                await tx.update(assessment).set({
                                    title: weekData.assessment.title,
                                    topic: weekData.assessment.topic!,
                                    problem: weekData.assessment.problem!,
                                    submissionFormat: weekData.assessment.submissionFormat,
                                    timer: weekData.assessment.timer,
                                }).where(eq(assessment.id, existingAssessment.id));
                            } else {
                                // Create
                                await tx.insert(assessment).values({
                                    id: createId(),
                                    weekId: currentWeekId,
                                    title: weekData.assessment.title,
                                    topic: weekData.assessment.topic!,
                                    problem: weekData.assessment.problem!,
                                    submissionFormat: weekData.assessment.submissionFormat,
                                    timer: weekData.assessment.timer,
                                });
                            }
                        } else {
                            if (existingAssessment) {
                                await tx.delete(assessment).where(eq(assessment.id, existingAssessment.id));
                            }
                        }

                        // Sync Mentors
                        // Simple strategy: Delete all existing for week and insert new
                        if (currentWeekId) {
                            await tx.delete(weekMentor).where(eq(weekMentor.weekId, currentWeekId));

                            if (weekData.mentorIds && weekData.mentorIds.length > 0) {
                                const mentorValues = weekData.mentorIds.map(mentorId => ({
                                    id: createId(),
                                    weekId: currentWeekId!,
                                    mentorId: mentorId,
                                }));
                                await tx.insert(weekMentor).values(mentorValues);
                            }
                        }
                    }
                }
            }
        });

        revalidatePath("/dashboard/admin");
        return { success: true, message: "Course updated successfully" };
    } catch (error) {
        console.error("Error updating course:", error);
        return { success: false, error: "Failed to update course" };
    }
}

export async function updateCourseStatus(courseId: string, status: "published" | "unpublished") {
    try {
        await requireAdmin();
        await db.update(course).set({ status }).where(eq(course.id, courseId));
        revalidatePath("/dashboard/admin");
        return { success: true, message: "Course status updated" };
    } catch (error) {
        console.error("Error updating course status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

// --- DELETE ---

export async function deleteCourse(courseId: string) {
    try {
        await requireAdmin();
        await db.delete(course).where(eq(course.id, courseId));
        revalidatePath("/dashboard/admin");
        return { success: true, message: "Course deleted successfully" };
    } catch (error) {
        console.error("Error deleting course:", error);
        return { success: false, error: "Failed to delete course" };
    }
}


