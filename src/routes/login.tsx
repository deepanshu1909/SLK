import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  useEffect(() => {
    document.title = "Sign in — Zarklo";
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", "Sign in to your Zarklo dashboard.");
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      <div className="hidden lg:block relative bg-[var(--navy)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative h-full p-12 flex flex-col justify-between text-white">
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--gold)] text-[var(--navy)] text-sm font-sans font-semibold">
              Z
            </span>
            Zarklo
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
          <p className="zk-caption mt-1">Sign in to your Zarklo dashboard.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
            <Link to="/#pricing" className="text-[var(--gold)] hover:underline">
              Book a demo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
