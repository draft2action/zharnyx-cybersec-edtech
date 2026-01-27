"use server";

import { headers } from "next/headers";
import { auth, type Role } from "./auth";
import { redirect, RedirectType } from "next/navigation";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth", RedirectType.replace);
  }

  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();

  const userRole = session.user.role as Role;

  if (!allowedRoles.includes(userRole)) {
    redirect("/dashboard", RedirectType.replace);
  }

  return session;
}

export async function requireAdmin() {
  return requireRole(["admin"]);
}

export async function requireMentor() {
  return requireRole(["admin", "mentor"]);
}

export async function requireStudent() {
  return requireRole(["admin", "mentor", "student", "recruiter", "partner_agency"]);
}

export async function requireRecruiter() {
  return requireRole(["admin", "recruiter"]);
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

export async function getCurrentSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
