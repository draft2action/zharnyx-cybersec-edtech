"use client";

import { useState, Suspense } from "react";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/shared/toast";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (password !== confirmPassword) {
        const errorMsg = "Passwords do not match";
        setError(errorMsg);
        toast.error("Validation failed", {
          description: errorMsg,
        });
        return;
      }

      if (password.length < 8) {
        const errorMsg = "Password must be at least 8 characters long";
        setError(errorMsg);
        toast.error("Validation failed", {
          description: errorMsg,
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === "signin") {
        await signIn.email({
          email,
          password,
        });

        toast.success("Signed in successfully!", {
          description: "Redirecting to dashboard...",
        });
      } else {
        await signUp.email({
          email,
          password,
          name,
        });

        toast.success("Account created successfully!", {
          description: "Welcome! Redirecting to dashboard...",
        });
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : mode === "signin"
          ? "Failed to sign in"
          : "Failed to create account";
      setError(errorMessage);
      toast.error(mode === "signin" ? "Sign in failed" : "Sign up failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pointer-events-none px-4 py-20">
      <Card className="w-full max-w-md pointer-events-auto bg-slate-900/90 backdrop-blur-md border-white/20 text-white font-mono">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {mode === "signin" ? "Login to your account" : "Create account"}
          </CardTitle>
          <CardDescription className="text-neutral-300">
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
          <div className="pt-2">
            <Button
              variant="link"
              className="text-white hover:text-white/80 p-0 h-auto font-mono"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
            >
              {mode === "signin"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {mode === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-800/50 border-white/20 text-white placeholder:text-neutral-500 focus:border-white/40"
                    style={{ borderRadius: "0px" }}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800/50 border-white/20 text-white placeholder:text-neutral-500 focus:border-white/40"
                  style={{ borderRadius: "0px" }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  {mode === "signin" && (
                    <a
                      href="#"
                      className="ml-auto inline-block text-xs underline-offset-4 hover:underline text-neutral-300"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder={
                    mode === "signup" ? "Min. 8 characters" : "••••••••"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800/50 border-white/20 text-white placeholder:text-neutral-500 focus:border-white/40"
                  style={{ borderRadius: "0px" }}
                />
              </div>
              {mode === "signup" && (
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password" className="text-white">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-slate-800/50 border-white/20 text-white placeholder:text-neutral-500 focus:border-white/40"
                    style={{ borderRadius: "0px" }}
                  />
                </div>
              )}
              {error && (
                <div className="rounded-md bg-red-900/50 border border-red-500/50 p-3">
                  <div className="text-sm text-red-200">{error}</div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-neutral-200 font-mono font-semibold"
            style={{ borderRadius: "0px" }}
          >
            {isLoading
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
              ? "Sign In"
              : "Sign Up"}
          </Button>
          {mode === "signup" && (
            <div className="text-xs text-neutral-400 text-center">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-white font-mono">
            Loading...
          </div>
        }
      >
        <AuthContent />
      </Suspense>
    </>
  );
}
