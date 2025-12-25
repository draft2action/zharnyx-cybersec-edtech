import { AnimatedBackground } from "@/components/shared/animated-background";
import { MentorApplicationForm } from "@/components/mentor/application-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MentorApplyPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
         <div className="absolute top-8 left-8 z-10">
            <Link 
                href="/dashboard" 
                className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-2 font-mono"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
         </div>
        
        <MentorApplicationForm />
      </div>
    </>
  );
}
