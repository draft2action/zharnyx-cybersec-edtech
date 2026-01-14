"use client";

import { useState, useEffect } from "react";
import { RecruiterSidebar } from "@/components/recruiter/layout/recruiter-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink, Github, Briefcase, Terminal } from "lucide-react";
import { getRecruiterCandidates } from "@/actions/recruiter/dashboard";
import { toast } from "sonner";

export default function RecruiterDashboardClient() {
  const [activeSection, setActiveSection] = useState("candidates");
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const result = await getRecruiterCandidates();
      if (result.success && result.data) {
        setCandidates(result.data);
      } else {
        toast.error("Failed to load candidates");
      }
      setLoading(false);
    };

    if (activeSection === "candidates") {
      fetchCandidates();
    }
  }, [activeSection]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black font-sans">
        <RecruiterSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <SidebarInset className="relative flex flex-col flex-1 overflow-y-auto bg-transparent z-10 w-full pl-6 pr-6 pb-6 pt-4">
          {/* Header - Neo Brutalist */}
          <header className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-white/20">
            <SidebarTrigger className="text-white hover:bg-white/10 md:hidden border-2 border-white/20 rounded-none h-10 w-10" />

            <div className="flex flex-col">
              <h1 className="text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
                {activeSection.replace(/-/g, " ")}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-yellow-500 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                  Recruiter Zone
                </span>
                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                  // Talent Acquisition
                </span>
              </div>
            </div>
          </header>

          <div className="flex-1 w-full max-w-auto mx-auto">
            {activeSection === "candidates" && (
              <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
                <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-yellow-500" />
                    <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                      Top Quality Candidates
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                    Students selected by administrators for their outstanding
                    performance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-6 text-white font-mono flex items-center gap-2">
                      <Terminal className="w-4 h-4 animate-spin" />
                      Loading candidates...
                    </div>
                  ) : (
                    <div className="p-6">
                      <Table>
                        <TableHeader className="bg-white/5 border-b-2 border-white/20">
                          <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="font-mono text-white font-bold uppercase text-xs tracking-wider">
                              Student Badge
                            </TableHead>
                            <TableHead className="font-mono text-white font-bold uppercase text-xs tracking-wider">
                              Name
                            </TableHead>
                            <TableHead className="font-mono text-white font-bold uppercase text-xs tracking-wider">
                              Email
                            </TableHead>
                            <TableHead className="font-mono text-white font-bold uppercase text-xs tracking-wider">
                              Projects
                            </TableHead>
                            <TableHead className="font-mono text-white font-bold uppercase text-xs tracking-wider text-right">
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {candidates && candidates.length > 0 ? (
                            candidates.map((candidate) => (
                              <TableRow
                                key={candidate.id}
                                className="border-b border-white/10 hover:bg-white/5 font-mono group transition-colors"
                              >
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10 rounded-none uppercase text-[10px] tracking-wider"
                                  >
                                    Top Talent
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                                  {candidate.name}
                                </TableCell>
                                <TableCell className="text-gray-400 text-xs">
                                  {candidate.email}
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-2">
                                    {candidate.projects.map((p: any) => (
                                      <div
                                        key={p.id}
                                        className="flex flex-col text-[10px] bg-white/5 p-2 border border-white/10 w-32"
                                      >
                                        <span className="font-bold text-gray-200 truncate">
                                          {p.title}
                                        </span>
                                        <div className="flex gap-2 mt-1 pt-1 border-t border-white/10">
                                          {p.githubUrl && (
                                            <Link
                                              href={p.githubUrl}
                                              target="_blank"
                                              className="text-gray-500 hover:text-white transition-colors"
                                            >
                                              <Github className="h-3 w-3" />
                                            </Link>
                                          )}
                                          {p.liveUrl && (
                                            <Link
                                              href={p.liveUrl}
                                              target="_blank"
                                              className="text-gray-500 hover:text-white transition-colors"
                                            >
                                              <ExternalLink className="h-3 w-3" />
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                    {candidate.projects.length === 0 && (
                                      <span className="text-gray-600 text-xs italic">
                                        // No projects
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    href={`/profile/${candidate.id}`}
                                    target="_blank"
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="cursor-pointer hover:bg-white hover:text-black transition-colors rounded-none border border-white/20 bg-transparent text-white uppercase text-[10px] tracking-wider"
                                    >
                                      View Profile
                                    </Badge>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="h-24 text-center font-mono text-gray-500 border-white/10"
                              >
                                // No candidates found.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
