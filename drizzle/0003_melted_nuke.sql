ALTER TABLE "assessment" ALTER COLUMN "questions" SET DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "course_week" ADD COLUMN "project_title" text;--> statement-breakpoint
ALTER TABLE "course_week" ADD COLUMN "project_description" text;