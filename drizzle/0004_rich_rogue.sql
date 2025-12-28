CREATE TABLE "enrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"course_id" text NOT NULL,
	"enrolled_at" timestamp DEFAULT now() NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"amount" integer,
	"currency" text DEFAULT 'USD'
);
--> statement-breakpoint
CREATE TABLE "student_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"week_id" text NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"is_unlocked" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_progress" ADD CONSTRAINT "student_progress_week_id_course_week_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."course_week"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "enrollment_studentId_idx" ON "enrollment" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "enrollment_courseId_idx" ON "enrollment" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "student_progress_studentId_idx" ON "student_progress" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_progress_weekId_idx" ON "student_progress" USING btree ("week_id");