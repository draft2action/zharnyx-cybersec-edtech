import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export type Role = "admin" | "mentor" | "student" | "recruiter";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: false, // Don't allow setting role during signup
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session.session & {
  user: typeof auth.$Infer.Session.user & {
    role: Role;
  };
};
