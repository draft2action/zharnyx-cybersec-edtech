import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  Terminal,
  User,
  Mail,
  Fingerprint,
} from "lucide-react";
import { HubUserControls } from "@/components/dashboard/hub/user-controls";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const userRole = session.user.role;
  const userName = session.user.name;
  const userEmail = session.user.email;
  const userId = session.user.id;

  return (
    <div className="flex min-h-screen w-full bg-black font-sans">
      <div className="relative flex flex-col flex-1 z-10 w-full pl-6 pr-6 pb-6 pt-4">
        {/* Header - Hub Style */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
              Command Center
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                {userRole} Mode
              </span>
              <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                {"// Welcome, "}
                {userName}
              </span>
            </div>
          </div>

          <HubUserControls />
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Navigation Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
            {/* Admin Link - Only for Admin */}
            {userRole === "admin" && (
              <Link href="/dashboard/admin" className="block group">
                <Card className="h-full bg-zinc-950 border-2 border-white/20 text-white rounded-none transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_0px_0px_#ef4444]">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-5 h-5 text-red-500" />
                      <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                        Admin Console
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                      Complete system control.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 font-mono">
                      Manage users, courses, mentors, and platform settings.
                    </p>
                    <div className="mt-4 flex items-center text-red-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Mentor Link - For Admin and Mentor */}
            {(userRole === "admin" || userRole === "mentor") && (
              <Link href="/dashboard/mentor" className="block group">
                <Card className="h-full bg-zinc-950 border-2 border-white/20 text-white rounded-none transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_0px_0px_#a855f7]">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-purple-500" />
                      <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                        Mentor Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                      Student management & grading.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 font-mono">
                      Track student progress, grade assignments, and clear
                      doubts.
                    </p>
                    <div className="mt-4 flex items-center text-purple-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Student Link - For Everyone */}
            <Link href="/dashboard/student" className="block group">
              <Card className="h-full bg-zinc-950 border-2 border-white/20 text-white rounded-none transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_0px_0px_#3b82f6]">
                <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                      Student Portal
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                    Learning & submissions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400 font-mono">
                    Access course materials, submit work, and view progress.
                  </p>
                  <div className="mt-4 flex items-center text-blue-500 font-bold text-xs uppercase tracking-widest">
                    <Terminal className="w-3 h-3 mr-2" /> Access Granted
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Recruiter Link - For Admin and Recruiter */}
            {(userRole === "admin" || userRole === "recruiter") && (
              <Link href="/dashboard/recruiter" className="block group">
                <Card className="h-full bg-zinc-950 border-2 border-white/20 text-white rounded-none transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_0px_0px_#eab308]">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-5 h-5 text-yellow-500" />
                      <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                        Recruiter Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                      Talent acquisition.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 font-mono">
                      Search for candidates and manage job postings.
                    </p>
                    <div className="mt-4 flex items-center text-yellow-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}

            {/* Partner Agency Link - For Admin and Partner Agency */}
            {(userRole === "admin" || userRole === "partner_agency") && (
              <Link href="/dashboard/partner" className="block group">
                <Card className="h-full bg-zinc-950 border-2 border-white/20 text-white rounded-none transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[4px_4px_0px_0px_#22c55e]">
                  <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-5 h-5 text-green-500" />
                      <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                        Partner Portal
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                      Agency Stats & Revenue.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-400 font-mono">
                      Track coupon usage and revenue share.
                    </p>
                    <div className="mt-4 flex items-center text-green-500 font-bold text-xs uppercase tracking-widest">
                      <Terminal className="w-3 h-3 mr-2" /> Access Granted
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>

          {/* User Details Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
              <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-5 h-5 text-gray-400" />
                  <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                    Identity
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                  Current Session Details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">
                    Full Name
                  </label>
                  <div className="font-mono text-sm break-all">{userName}</div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <div className="font-mono text-sm break-all text-gray-300">
                    {userEmail}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-1">
                    <Fingerprint className="w-3 h-3" /> User ID
                  </label>
                  <div className="font-mono text-xs break-all py-2 px-3 bg-white/5 border border-white/10 rounded-sm text-gray-400">
                    {userId}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-500 uppercase tracking-widest">
                      Session Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
