import { z } from "zod";

export const WeekResourceSchema = z.object({
  title: z.string().min(1, "Resource title is required"),
  link: z.string().url("Invalid URL"),
});

export const WeekResourceDraftSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
});

export const AssessmentSchema = z.object({
  title: z.string().min(1, "Assessment title is required"),
  topic: z.string().min(1, "Assessment topic is required"),
  problem: z.string().min(1, "Problem statement is required"),
  submissionFormat: z.string().default("pdf"),
  timer: z.number().min(0, "Timer must be positive").default(60), // In minutes
});

export const AssessmentDraftSchema = z.object({
  title: z.string().optional(),
  topic: z.string().optional(),
  problem: z.string().optional(),
  submissionFormat: z.string().optional().default("pdf"),
  timer: z.number().optional(),
});

export const CourseWeekSchema = z.object({
  id: z.string().optional(), // Optional for new weeks
  title: z.string().min(1, "Week title is required"),
  order: z.number().int(),
  team: z.enum(["red", "blue"]).optional().nullable(),
  isProject: z.boolean().default(false),
  projectTitle: z.string().optional(),
  projectDescription: z.string().optional(),
  content: z.string().optional(), // Rich text or description
  resources: z.array(WeekResourceSchema).optional(),
  assessment: AssessmentSchema.optional().nullable(),
  // Mentors will be array of user IDs
  mentorIds: z.array(z.string()).optional(),
});

export const CourseWeekDraftSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  order: z.number().int().optional().default(0),
  team: z.enum(["red", "blue"]).optional().nullable(),
  isProject: z.boolean().optional().default(false),
  projectTitle: z.string().optional(),
  projectDescription: z.string().optional(),
  content: z.string().optional(),
  resources: z.array(WeekResourceDraftSchema).optional(),
  assessment: AssessmentDraftSchema.optional().nullable(),
  mentorIds: z.array(z.string()).optional(),
});

export const CourseMonthSchema = z.object({
  id: z.string().optional(), // Optional for new months
  title: z.string().min(1, "Month title is required"),
  type: z.enum(["common", "team"]),
  order: z.number().int(),
  weeks: z.array(CourseWeekSchema),
});

export const CourseMonthDraftSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  type: z.enum(["common", "team"]).optional().default("common"),
  order: z.number().int().optional().default(0),
  weeks: z.array(CourseWeekDraftSchema).optional().default([]),
});

export const CourseFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // image: z.string().url("Invalid Image URL").optional().or(z.literal("")), // Removed as per request
  image: z.string().optional().nullable(), // Keeping as optional/nullable for DB compatibility if needed, but not validated/used in UI
  status: z.enum(["published", "unpublished"]).default("unpublished"),
  months: z.array(CourseMonthSchema),
});

// Draft schema with relaxed validation for saving incomplete courses
export const CourseFormDraftSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
  status: z.enum(["published", "unpublished"]).default("unpublished"),
  months: z.array(CourseMonthDraftSchema).optional().default([]),
});

export type CourseFormValues = z.infer<typeof CourseFormSchema>;
export type CourseFormDraftValues = z.infer<typeof CourseFormDraftSchema>;
