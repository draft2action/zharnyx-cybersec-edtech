"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  ExternalLink,
  Award,
  Twitter,
  Terminal,
  Calendar,
  User,
  MapPin,
  Code,
} from "lucide-react";

interface ProfileContentProps {
  user: {
    name: string;
    email: string;
    role: string;
    bio: string | null;
    image: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    websiteUrl: string | null;
    contactEmail: string | null;
    createdAt: Date;
    projectSubmissions: Array<{
      id: string;
      description: string | null;
      githubUrl: string | null;
      liveUrl: string | null;
      review: string | null;
      week: {
        title: string;
        projectTitle: string | null;
      };
    }>;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const roleColors: Record<string, string> = {
    student: "text-white border-white bg-white/10",
    mentor: "text-purple-400 border-purple-400 bg-purple-400/10",
    admin: "text-red-500 border-red-500 bg-red-500/10",
    recruiter: "text-blue-400 border-blue-400 bg-blue-400/10",
  };

  const roleColorClass =
    roleColors[user.role] || "text-zinc-400 border-zinc-400 bg-zinc-400/10";

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-x-hidden p-6 md:p-12">
      {/* Background Grid - Professional & Minimal */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative max-w-5xl mx-auto space-y-12 pointer-events-auto mt-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="border border-zinc-800 bg-black p-8 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 text-xs uppercase tracking-wider rounded-none font-bold border ${roleColorClass}`}
                  >
                    {user.role}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider font-bold">
                    <Calendar size={12} className="text-zinc-600" />
                    Joined {formatDate(user.createdAt)}
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">
                  {user.name}
                </h1>

                <div className="flex flex-wrap gap-3 pt-2">
                  {user.githubUrl && (
                    <SocialLink
                      href={user.githubUrl}
                      icon={<Github size={18} />}
                      label="GitHub"
                    />
                  )}
                  {user.linkedinUrl && (
                    <SocialLink
                      href={user.linkedinUrl}
                      icon={<Linkedin size={18} />}
                      label="LinkedIn"
                    />
                  )}
                  {user.twitterUrl && (
                    <SocialLink
                      href={user.twitterUrl}
                      icon={<Twitter size={18} />}
                      label="Twitter"
                    />
                  )}
                  {user.websiteUrl && (
                    <SocialLink
                      href={user.websiteUrl}
                      icon={<Globe size={18} />}
                      label="Website"
                    />
                  )}
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col items-end gap-3">
                {/* Only showing Contact Email if available */}
                {user.contactEmail && (
                  <a
                    href={`mailto:${user.contactEmail}`}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all border border-transparent hover:border-white"
                  >
                    <Mail size={16} strokeWidth={2} />
                    Contact Me
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <User size={14} /> About
              </h3>
              <div className="border-l-2 border-zinc-700 pl-4 py-1">
                {user.bio ? (
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {user.bio}
                  </p>
                ) : (
                  <p className="text-zinc-600 text-sm italic">
                    No bio information provided.
                  </p>
                )}
              </div>
            </div>

            {/* Only show Public Email in details if it exists */}
            {user.contactEmail && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={14} /> Contact
                </h3>
                <div className="p-4 bg-zinc-900/30 border border-zinc-800">
                  <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                    Public Email
                  </span>
                  <span className="text-zinc-100 font-mono text-sm break-all">
                    {user.contactEmail}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div variants={itemVariants} className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-bold uppercase tracking-wide flex items-center gap-2">
              <Code size={20} className="text-zinc-500" />
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.projectSubmissions.length > 0 ? (
              user.projectSubmissions.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full bg-black border border-zinc-800 text-white rounded-none hover:border-zinc-500 transition-all duration-300 group">
                    <CardHeader className="p-5 pb-4 border-b border-zinc-900">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <CardTitle className="font-sans text-base font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                            {project.week.projectTitle || "Untitled Project"}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="rounded-none border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-wider"
                          >
                            {project.week.title}
                          </Badge>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {project.githubUrl && (
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              className="text-zinc-500 hover:text-white transition-colors"
                            >
                              <Github size={16} />
                            </Link>
                          )}
                          {project.liveUrl && (
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              className="text-zinc-500 hover:text-white transition-colors"
                            >
                              <ExternalLink size={16} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-4 space-y-4 flex flex-col h-[calc(100%-100px)]">
                      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                        {project.description ||
                          "No description provided for this project."}
                      </p>

                      {project.review && (
                        <div className="mt-auto pt-4 border-t border-zinc-900">
                          <div className="flex gap-2 items-start">
                            <Terminal
                              size={12}
                              className="text-zinc-500 mt-1 shrink-0"
                            />
                            <p className="text-zinc-500 text-[10px] font-mono italic leading-normal line-clamp-2">
                              "{project.review}"
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 border border-dashed border-zinc-800 text-center bg-zinc-900/10">
                <p className="text-zinc-600 text-sm font-mono uppercase tracking-widest">
                  No projects visible.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 px-3 py-1.5 bg-black border border-zinc-800 text-zinc-400 text-xs hover:text-white hover:border-zinc-500 transition-all font-mono uppercase tracking-wider"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
