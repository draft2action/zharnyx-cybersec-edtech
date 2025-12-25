# RBAC Setup

## Setup Instructions

1. **Push database schema:**

   ```bash
   pnpm db:push
   ```

2. **Start the development server:**

   ```bash
   pnpm dev
   ```

3. **Create your first user:**

   - Go to `/sign-up`
   - Create an account (defaults to student role)

4. **Promote user to admin (in PostgreSQL):**
   ```sql
   UPDATE "user" SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## Roles

- **admin** - Full system access, manage users and roles
- **mentor** - Create and manage courses, view students
- **student** - Enroll in courses, submit assignments

## Routes

- `/sign-in` - Sign in (public)
- `/sign-up` - Sign up (public)
- `/dashboard` - Main dashboard (authenticated)
- `/dashboard/admin` - Admin panel (admin only)
- `/dashboard/mentor` - Mentor portal (mentor + admin)
- `/dashboard/student` - Student dashboard (all authenticated)

## Using Role Guards in Server Actions

```typescript
import {
  requireAdmin,
  requireMentor,
  requireStudent,
} from "@/lib/auth/role-guard";

// Admin only
export async function adminAction() {
  await requireAdmin();
  // Your logic
}

// Mentor + Admin
export async function mentorAction() {
  await requireMentor();
  // Your logic
}

// All authenticated users
export async function studentAction() {
  await requireStudent();
  // Your logic
}
```

## Server Actions

- `/src/lib/actions/admin.ts` - Admin actions
- `/src/lib/actions/mentor.ts` - Mentor actions
- `/src/lib/actions/student.ts` - Student actions
