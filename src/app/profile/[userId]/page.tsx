import { getUserProfile } from "@/actions/profile/action";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Linkedin, Globe, Mail, ExternalLink, Award, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const { userId } = await params;
  const result = await getUserProfile(userId);

  if (!result.success || !result.data) {
    notFound();
  }

  const user = result.data;

  return (
    <>
      <AnimatedBackground />
      <div className="relative min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 pointer-events-auto">
          
          {/* Header / Profile Info */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-shrink-0">
               <div className="h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white border-4 border-black/50 overflow-hidden">
                  {user.image ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : user.name.charAt(0)}
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div>
                  <h1 className="text-4xl font-bold text-white font-mono">{user.name}</h1>
                  <p className="text-xl text-gray-400 font-mono">{user.email}</p>
               </div>
               {user.bio && <p className="text-gray-300 max-w-2xl font-mono">{user.bio}</p>}
               
               <div className="flex gap-4">
                  {user.githubUrl && (
                    <Link href={user.githubUrl} target="_blank">
                      <Button variant="outline" size="icon" className="text-gray-400 border-gray-700 hover:text-white hover:bg-white/10">
                        <Github className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {user.linkedinUrl && (
                    <Link href={user.linkedinUrl} target="_blank">
                      <Button variant="outline" size="icon" className="text-gray-400 border-gray-700 hover:text-white hover:bg-white/10">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  {user.websiteUrl && (
                    <Link href={user.websiteUrl} target="_blank">
                       <Button variant="outline" size="icon" className="text-gray-400 border-gray-700 hover:text-white hover:bg-white/10">
                         <Globe className="h-5 w-5" />
                       </Button>
                    </Link>
                  )}
                  <Link href={`mailto:${user.email}`}>
                    <Button variant="outline" size="icon" className="text-gray-400 border-gray-700 hover:text-white hover:bg-white/10">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Projects Column */}
             <div className="md:col-span-2 space-y-8">
                <section>
                   <h2 className="text-2xl font-bold text-white mb-6 font-mono border-b border-white/10 pb-2 flex items-center gap-2">
                     <Award className="text-yellow-500" /> Projects
                   </h2>
                   <div className="grid grid-cols-1 gap-6">
                      {user.projectSubmissions.length > 0 ? (
                        user.projectSubmissions.map((project) => (
                           <Card key={project.id} className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                             <CardHeader>
                               <div className="flex justify-between items-start">
                                  <div>
                                     <CardTitle className="font-mono text-xl">{project.week.projectTitle || "Project"}</CardTitle>
                                     <CardDescription className="text-gray-400 font-mono text-xs mt-1">
                                        Week: {project.week.title}
                                     </CardDescription>
                                  </div>
                                  <div className="flex gap-2">
                                     {project.githubUrl && (
                                       <Link href={project.githubUrl} target="_blank" className="text-gray-400 hover:text-white">
                                          <Github className="h-5 w-5" />
                                       </Link>
                                     )}
                                     {project.liveUrl && (
                                       <Link href={project.liveUrl} target="_blank" className="text-gray-400 hover:text-white">
                                          <ExternalLink className="h-5 w-5" />
                                       </Link>
                                     )}
                                  </div>
                               </div>
                             </CardHeader>
                             <CardContent className="space-y-4">
                               <p className="text-gray-300 font-mono text-sm">{project.description || "No description provided."}</p>
                               {project.review && (
                                 <div className="bg-white/5 p-3 rounded-md border border-white/5">
                                    <p className="text-xs text-yellow-500 font-bold mb-1">MENTOR REVIEW</p>
                                    <p className="text-gray-400 text-sm italic">"{project.review}"</p>
                                 </div>
                               )}
                             </CardContent>
                           </Card>
                        ))
                      ) : (
                        <p className="text-gray-500 font-mono italic">No projects showcased yet.</p>
                      )}
                   </div>
                </section>
             </div>

             {/* Progress / Sidebar */}
             <div className="space-y-8">
                <section>
                   <h2 className="text-xl font-bold text-white mb-6 font-mono border-b border-white/10 pb-2 flex items-center gap-2">
                     <BookOpen className="text-blue-500" /> Learning Path
                   </h2>
                   <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                      <CardContent className="p-6 space-y-4">
                         {user.progress.length > 0 ? (
                            user.progress.map((prog) => (
                              <div key={prog.id} className="flex items-center gap-3">
                                 <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                 <span className="text-gray-300 font-mono text-sm">{prog.week.title}</span>
                              </div>
                            ))
                         ) : (
                            <p className="text-gray-500 font-mono italic text-sm">No progress recorded yet.</p>
                         )}
                      </CardContent>
                   </Card>
                </section>
             </div>
          </div>

        </div>
      </div>
    </>
  );
}
