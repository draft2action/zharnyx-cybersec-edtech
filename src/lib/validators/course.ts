import { z } from "zod";

// --- Sub-Schemas ---

export const AssessmentQuestionSchema = z.object({
    id: z.string(),
    type: z.enum(["mcq", "text"]),
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string()).optional(), // Only for MCQ
    correctAnswer: z.string().optional(), // For automated grading
});

export const WeekResourceSchema = z.object({
    title: z.string().min(1, "Resource title is required"),
    link: z.string().url("Invalid URL"),
});

// --- Main Schemas ---

export const AssessmentSchema = z.object({
    title: z.string().min(1, "Assessment title is required"),
    timer: z.number().min(0, "Timer must be positive").default(60), // In minutes
    questions: z.array(AssessmentQuestionSchema),
});

export const CourseWeekSchema = z.object({
    id: z.string().optional(), // Optional for new weeks
    title: z.string().min(1, "Week title is required"),
    order: z.number().int(),
    team: z.enum(["red", "blue"]).optional().nullable(),
    isProject: z.boolean().default(false),
    content: z.string().optional(), // Rich text or description
    resources: z.array(WeekResourceSchema).optional(),
    assessment: AssessmentSchema.optional().nullable(),
    // Mentors will be array of user IDs
    mentorIds: z.array(z.string()).optional(),
});

export const CourseMonthSchema = z.object({
    id: z.string().optional(), // Optional for new months
    title: z.string().min(1, "Month title is required"),
    type: z.enum(["common", "team"]),
    order: z.number().int(),
    weeks: z.array(CourseWeekSchema),
});

export const CourseFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.string().url("Invalid Image URL").optional().or(z.literal("")),
    status: z.enum(["published", "unpublished"]).default("unpublished"),
    months: z.array(CourseMonthSchema),
});

export type CourseFormValues = z.infer<typeof CourseFormSchema>;
