"use client";

import { useState, useEffect } from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { RecruiterSidebar } from "@/components/recruiter/layout/recruiter-sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ExternalLink, Github } from "lucide-react";
import { getRecruiterCandidates } from "@/actions/recruiter/dashboard";
import { toast } from "sonner";

interface RecruiterDashboardClientProps {
    // We can pass initial data if server fetched, but let's fetch in client for simplicity with interactive sidebar
    // Or just fetch initial data in server page and pass down?
    // Let's stick to client fetching for now to match pattern or pass data.
    // Better to pass data.
}

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
      <div className="flex min-h-screen w-full bg-black">
        <AnimatedBackground />
        
        <RecruiterSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <SidebarInset className="relative flex flex-col flex-1 overflow-y-auto bg-transparent z-10 w-full p-6">
           <header className="flex items-center gap-2 mb-6">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <h1 className="text-2xl font-bold font-mono text-white">
                 {activeSection.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </h1>
           </header>
           
           <div className="flex-1 w-full max-w-7xl mx-auto">
              {activeSection === "candidates" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Top Quality Candidates</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Students selected by administrators for their outstanding performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                        <div className="text-white font-mono">Loading candidates...</div>
                    ) : (
                       <Table>
                         <TableHeader className="bg-white/5">
                           <TableRow className="border-white/10 hover:bg-white/5">
                             <TableHead className="font-mono text-white">Student Badge</TableHead>
                             <TableHead className="font-mono text-white">Name</TableHead>
                             <TableHead className="font-mono text-white">Email</TableHead>
                             <TableHead className="font-mono text-white">Projects</TableHead>
                             <TableHead className="font-mono text-white text-right">Action</TableHead>
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {candidates && candidates.length > 0 ? (
                             candidates.map((candidate) => (
                               <TableRow key={candidate.id} className="border-white/10 hover:bg-white/5 font-mono">
                                 <TableCell>
                                   <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">Top Talent</Badge>
                                 </TableCell>
                                 <TableCell className="font-medium text-white">{candidate.name}</TableCell>
                                 <TableCell className="text-gray-300">{candidate.email}</TableCell>
                                 <TableCell>
                                   <div className="flex flex-wrap gap-2">
                                     {candidate.projects.map((p: any) => (
                                       <div key={p.id} className="flex flex-col text-xs bg-white/5 p-2 rounded border border-white/10">
                                         <span className="font-bold text-gray-200">{p.title}</span>
                                         <div className="flex gap-2 mt-1">
                                            {p.githubUrl && <Link href={p.githubUrl} target="_blank" className="text-gray-400 hover:text-white"><Github className="h-3 w-3" /></Link>}
                                            {p.liveUrl && <Link href={p.liveUrl} target="_blank" className="text-gray-400 hover:text-white"><ExternalLink className="h-3 w-3" /></Link>}
                                         </div>
                                       </div>
                                     ))}
                                     {candidate.projects.length === 0 && <span className="text-gray-500 text-xs">No projects</span>}
                                   </div>
                                 </TableCell>
                                 <TableCell className="text-right">
                                   <Link href={`/profile/${candidate.id}`} target="_blank">
                                     <Badge variant="secondary" className="cursor-pointer hover:bg-white/20">View Profile</Badge>
                                   </Link>
                                 </TableCell>
                               </TableRow>
                             ))
                           ) : (
                             <TableRow>
                               <TableCell colSpan={5} className="h-24 text-center font-mono text-gray-500">
                                 No candidates found.
                               </TableCell>
                             </TableRow>
                           )}
                         </TableBody>
                       </Table>
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
