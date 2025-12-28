"use client";

import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import { CometCard } from "@/components/ui/comet-card";

// Reusable card component based on user provided demo
function MentorCard({
  name,
  role,
  tags,
  image,
}: {
  name: string;
  role: string;
  tags: string;
  image: string;
}) {
  return (
    <CometCard>
      <div
        className="flex w-full cursor-pointer flex-col items-stretch rounded-[16px] border border-white/10 bg-[#1F2121]/50 backdrop-blur-md p-2 saturate-0 md:p-4 hover:saturate-100 transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-3/4 w-full overflow-hidden rounded-[16px]">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover contrast-75 hover:contrast-100 transition-all duration-500"
              alt={`Mentor ${name}`}
              src={image}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col p-4 font-mono text-white">
          <div className="flex justify-between items-center mb-1">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-xs text-gray-400 opacity-50">{tags}</div>
          </div>
          <div className="text-sm text-indigo-400">{role}</div>
        </div>
      </div>
    </CometCard>
  );
}

export default function MentorsPage() {
  const mentors = [
    {
      name: "Alex Rivera",
      role: "Lead Security Researcher",
      tags: "#REDTEAM",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    },
    {
      name: "Sarah Chen",
      role: "Senior SOC Analyst",
      tags: "#BLUETEAM",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    },
    {
      name: "Marcus Johnson",
      role: "Penetration Tester",
      tags: "#ETHICALHACKING",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    },
    {
      name: "Emily Davis",
      role: "Cryptography Expert",
      tags: "#CRYPTO",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1287&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
              Meet Our Mentors
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Learn from industry experts who have been in the field for years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="w-full max-w-sm"
              >
                <MentorCard {...mentor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
