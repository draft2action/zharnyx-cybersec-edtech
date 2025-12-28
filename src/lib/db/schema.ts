import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, integer, json } from "drizzle-orm/pg-core";

// ===============USERS=================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role", { enum: ["admin", "mentor", "student"] })
    .default("student")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// ===============MENTOR APPLICATION=================

export const mentorApplication = pgTable(
  "mentor_application",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    contactNo: text("contact_no").notNull(),
    gender: text("gender").notNull(),
    dob: timestamp("dob").notNull(),
    address: text("address").notNull(),
    linkedinUrl: text("linkedin_url"),
    resumeUrl: text("resume_url").notNull(),
    portfolioUrl: text("portfolio_url"),
    experience: text("experience"), // Storing JSON string of experience array
    status: text("status", { enum: ["pending", "approved", "rejected"] })
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("mentor_application_userId_idx").on(table.userId)]
);

export const mentorApplicationRelations = relations(mentorApplication, ({ one }) => ({
  user: one(user, {
    fields: [mentorApplication.userId],
    references: [user.id],
  }),
}));


// ===============COURSES=================

export const course = pgTable("course", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  status: text("status", { enum: ["published", "unpublished"] })
    .default("unpublished")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const courseMonth = pgTable("course_month", {
  id: text("id").primaryKey(),
  courseId: text("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: text("type", { enum: ["common", "team"] })
    .default("common")
    .notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("course_month_courseId_idx").on(table.courseId)
]);

export const courseWeek = pgTable("course_week", {
  id: text("id").primaryKey(),
  monthId: text("month_id")
    .notNull()
    .references(() => courseMonth.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  team: text("team", { enum: ["red", "blue"] }), // Nullable, only relevant if month type is 'team'
  isProject: boolean("is_project").default(false).notNull(),
  projectTitle: text("project_title"),
  projectDescription: text("project_description"),
  content: text("content"), // Description or learning content
  resources: json("resources"), // Array of { title, link }
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("course_week_monthId_idx").on(table.monthId)
]);

export const weekMentor = pgTable("week_mentor", {
  id: text("id").primaryKey(),
  weekId: text("week_id")
    .notNull()
    .references(() => courseWeek.id, { onDelete: "cascade" }),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
}, (table) => [
  index("week_mentor_weekId_idx").on(table.weekId),
  index("week_mentor_mentorId_idx").on(table.mentorId)
]);

export const assessment = pgTable("assessment", {
  id: text("id").primaryKey(),
  weekId: text("week_id")
    .notNull()
    .references(() => courseWeek.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"), // Problem statement
  timer: integer("timer"), // Duration in minutes
  questions: json("questions").notNull().default([]), // Keeping for backward compatibility but defaulting to empty
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("assessment_weekId_idx").on(table.weekId)
]);

export const projectSubmission = pgTable("project_submission", {
  id: text("id").primaryKey(),
  weekId: text("week_id")
    .notNull()
    .references(() => courseWeek.id, { onDelete: "cascade" }),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  demoUrl: text("demo_url"),
  description: text("description"),
  score: integer("score"), // 1-10
  review: text("review"),
  status: text("status", { enum: ["pending", "graded"] })
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (table) => [
  index("project_submission_weekId_idx").on(table.weekId),
  index("project_submission_studentId_idx").on(table.studentId)
]);

export const assessmentResponse = pgTable("assessment_response", {
  id: text("id").primaryKey(),
  assessmentId: text("assessment_id")
    .notNull()
    .references(() => assessment.id, { onDelete: "cascade" }),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  answers: json("answers").notNull(), // Student answers
  score: integer("score"),
  status: text("status", { enum: ["pending", "completed"] })
    .default("pending")
    .notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
}, (table) => [
  index("assessment_response_assessmentId_idx").on(table.assessmentId),
  index("assessment_response_studentId_idx").on(table.studentId)
]);

export const courseRelations = relations(course, ({ many }) => ({
  months: many(courseMonth),
}));

export const courseMonthRelations = relations(courseMonth, ({ one, many }) => ({
  course: one(course, {
    fields: [courseMonth.courseId],
    references: [course.id],
  }),
  weeks: many(courseWeek),
}));

export const courseWeekRelations = relations(courseWeek, ({ one, many }) => ({
  month: one(courseMonth, {
    fields: [courseWeek.monthId],
    references: [courseMonth.id],
  }),
  mentors: many(weekMentor),
  assessments: many(assessment),
  projectSubmissions: many(projectSubmission),
}));

export const weekMentorRelations = relations(weekMentor, ({ one }) => ({
  week: one(courseWeek, {
    fields: [weekMentor.weekId],
    references: [courseWeek.id],
  }),
  mentor: one(user, {
    fields: [weekMentor.mentorId],
    references: [user.id],
  }),
}));

export const assessmentRelations = relations(assessment, ({ one, many }) => ({
  week: one(courseWeek, {
    fields: [assessment.weekId],
    references: [courseWeek.id],
  }),
  responses: many(assessmentResponse),
}));

export const assessmentResponseRelations = relations(assessmentResponse, ({ one }) => ({
  assessment: one(assessment, {
    fields: [assessmentResponse.assessmentId],
    references: [assessment.id],
  }),
  student: one(user, {
    fields: [assessmentResponse.studentId],
    references: [user.id],
  }),
}));

export const projectSubmissionRelations = relations(projectSubmission, ({ one }) => ({
  week: one(courseWeek, {
    fields: [projectSubmission.weekId],
    references: [courseWeek.id],
  }),
  student: one(user, {
    fields: [projectSubmission.studentId],
    references: [user.id],
  }),
}));


