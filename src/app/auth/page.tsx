"use client";

import { useState, Suspense } from "react";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/shared/toast";
import { motion } from "motion/react";
import {
  Terminal,
  User,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
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
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Top Badge - Neo Brutalist */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 px-4 py-1.5 bg-red-600 text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white]">
            <Terminal size={14} strokeWidth={3} />
            <span>Zharnyx 2.0 // Cyber-Agency</span>
          </div>
        </div>

        <div className="bg-black border-2 border-white/20 p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] backdrop-blur-sm">
          <div className="flex flex-col items-center text-center space-y-2 mb-8">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              {mode === "signin" ? "Operator Login" : "New Recruit"}
            </h1>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
              {mode === "signin"
                ? "Identify yourself to access the mainframe."
                : "Begin your initialization sequence."}
            </p>
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                  fetchOptions: {
                    onError: (ctx) => {
                      toast.error("Sign in failed", {
                        description: ctx.error.message,
                      });
                    }
                  }
                });
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm border-2 border-white hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-black px-2 text-zinc-500 font-mono tracking-widest">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div className="space-y-1">
                <Label
                  htmlFor="name"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Codename
                </Label>
                <div className="relative group">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                    size={16}
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="ENTER CODENAME"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-white text-xs font-bold uppercase tracking-wider"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                  size={16}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="OPERATOR@ZHARNYX.COM"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Password
                </Label>
                {mode === "signin" && (
                  <a
                    href="#"
                    className="text-[10px] text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors font-bold"
                  >
                    Difficulties?
                  </a>
                )}
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                  size={16}
                />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1">
                <Label
                  htmlFor="confirm-password"
                  className="text-white text-xs font-bold uppercase tracking-wider"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
                    size={16}
                  />
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-white/5 border-2 border-white/20 text-white placeholder:text-gray-500 focus:border-red-600 focus:ring-0 rounded-none h-12 font-mono text-sm transition-colors"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-950/30 border border-red-500/50 p-3 flex items-start gap-3">
                <AlertCircle
                  className="text-red-500 shrink-0 mt-0.5"
                  size={16}
                />
                <div className="text-sm text-red-200 font-mono">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:translate-x-1 hover:translate-y-1 transition-transform disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
              <span className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 -z-10 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === "signin" ? "Establish Link" : "Initialize"}{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
              }}
            >
              {mode === "signin"
                ? "No credentials? Request Access"
                : "Already active? Operator Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        }
      >
        <AuthContent />
      </Suspense>
    </>
  );
}
