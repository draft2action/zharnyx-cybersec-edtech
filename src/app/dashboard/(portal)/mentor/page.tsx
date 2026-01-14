import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireMentor } from "@/lib/auth/role-guard";
import { MentorDashboardShell } from "@/components/dashboard/mentor/mentor-dashboard-shell";
import { AnimatedBackground } from "@/components/shared/animated-background";

// Define props interface for Page in Next.js 13+
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MentorPage(props: PageProps) {
  const session = await requireMentor();
  const mentorId = session.user.id;

  const searchParams = await props.searchParams;
  const section =
    typeof searchParams.section === "string" ? searchParams.section : undefined;

  return (
    <>
      <AnimatedBackground />
      <div className="relative flex min-h-screen pointer-events-none">
        <main className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                Mentor Portal
              </h1>
              <p className="text-gray-400 font-mono mt-2 text-lg">
                Manage your courses and students
              </p>
            </div>
          </div>

          <MentorDashboardShell section={section} mentorId={mentorId} />
        </main>
      </div>
    </>
  );
}
