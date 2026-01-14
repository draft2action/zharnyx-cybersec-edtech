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
    <div className="flex items-centergap-4">
      <Link href="/" passHref>
        <Button
          variant="outline"
          className="border-white/20 text-gray-400 hover:text-white hover:bg-white/10 font-mono hidden md:flex"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <Button
        onClick={handleSignOut}
        variant="destructive"
        className="bg-red-900/20 text-red-500 border border-red-900/50 hover:bg-red-900/40 font-mono ml-4"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
