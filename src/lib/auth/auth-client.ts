import { createAuthClient } from "better-auth/react";
import type { Session } from "./auth";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;

export type { Session };
