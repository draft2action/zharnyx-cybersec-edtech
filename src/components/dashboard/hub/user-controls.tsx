"use client";

import { signOut } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HubUserControls() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="flex flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
      <Link href="/" passHref>
        <Button
          variant="outline"
          className="border-white/20 text-gray-400 hover:text-white hover:bg-white/10 font-mono flex flex-1 md:flex-initial h-9 md:h-10 text-xs md:text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <Button
        onClick={handleSignOut}
        variant="destructive"
        className="bg-red-900/20 text-red-500 border border-red-900/50 hover:bg-red-900/40 font-mono ml-2 md:ml-4 flex-1 md:flex-initial h-9 md:h-10 text-xs md:text-sm"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
