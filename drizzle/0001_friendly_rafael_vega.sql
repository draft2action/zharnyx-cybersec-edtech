CREATE TABLE "mentor_application" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"contact_no" text NOT NULL,
	"gender" text NOT NULL,
	"dob" timestamp NOT NULL,
	"address" text NOT NULL,
	"linkedin_url" text,
	"resume_url" text NOT NULL,
	"portfolio_url" text,
	"experience" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mentor_application" ADD CONSTRAINT "mentor_application_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mentor_application_userId_idx" ON "mentor_application" USING btree ("user_id");