import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes - no authentication required
  const publicRoutes = ["/", "/sign-in", "/sign-up", "/about", "/courses"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow public routes and API routes to pass through
  if (isPublicRoute || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Protected routes - require authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Role-based route protection
  const userRole = session.user.role;

  // Admin-only routes
  if (pathname.startsWith("/dashboard/admin")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Mentor routes (accessible by mentors and admins)
  if (pathname.startsWith("/dashboard/mentor")) {
    if (userRole !== "mentor" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Student routes (accessible by all authenticated users)
  if (pathname.startsWith("/dashboard/student")) {
    if (
      userRole !== "student" &&
      userRole !== "mentor" &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};

export default proxy;
