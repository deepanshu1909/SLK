import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

export default function Login() {
  const [googleNote, setGoogleNote] = useState("");

  useEffect(() => {
    document.title = "Sign in — ZarkloAI";
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", "Sign in to your ZarkloAI dashboard.");
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleGoogleSignIn = () => {
    setGoogleNote("Google sign-in is not connected yet. Use email to continue for now.");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--background)]">
      <div className="hidden lg:block relative bg-[var(--card)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative h-full p-12 flex flex-col justify-between text-white">
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--primary)] text-white text-sm font-sans font-semibold">
              Z
            </span>
            ZarkloAI
          </Link>
          <div>
            <p className="font-display text-4xl leading-tight text-white">
              Growth infrastructure for salons, clinics, and diagnostic labs.
            </p>
            <div className="mt-6 text-sm text-white/60">
              Discovery · Conversion · Retention
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="zk-h2">Welcome back</h1>
          <p className="zk-caption mt-1">Sign in to your ZarkloAI dashboard.</p>

          <div className="mt-8">
            <GoogleAuthButton label="Continue with Google" onClick={handleGoogleSignIn} />
            {googleNote ? (
              <p className="mt-2 text-xs text-[var(--muted-ink)]">{googleNote}</p>
            ) : null}
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--hairline)]" />
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-ink)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--hairline)]" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@yourbusiness.com" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="h-11 rounded-lg" />
            </div>
            <button type="submit" className="zk-btn-primary w-full">
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-[var(--muted-ink)] mt-6 text-center">
            New here?{" "}
            <Link to="/signup" className="text-[var(--gold)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
