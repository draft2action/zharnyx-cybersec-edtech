CREATE TABLE "recruiter_application" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"company_name" text NOT NULL,
	"position" text NOT NULL,
	"contact_no" text NOT NULL,
	"linkedin_url" text,
	"website_url" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "topic" text NOT NULL;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "problem" text NOT NULL;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "submission_format" text DEFAULT 'pdf' NOT NULL;--> statement-breakpoint
ALTER TABLE "assessment_response" ADD COLUMN "submission_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_recruiter_visible" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "github_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "linkedin_url" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "website_url" text;--> statement-breakpoint
ALTER TABLE "recruiter_application" ADD CONSTRAINT "recruiter_application_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "recruiter_application_userId_idx" ON "recruiter_application" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "assessment" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "assessment" DROP COLUMN "questions";--> statement-breakpoint
ALTER TABLE "assessment_response" DROP COLUMN "answers";