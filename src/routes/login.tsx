import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  useEffect(() => {
    document.title = "Sign in — ZarkloAi";
    document.querySelector("meta[name='description']")?.setAttribute(
      "content",
      "Sign in to your ZarkloAi dashboard."
    );
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-to-br from-brand via-brand-deep to-foreground overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
        <div aria-hidden className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="relative h-full p-12 flex flex-col justify-between text-white">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl">
            <span className="grid place-items-center w-8 h-8 rounded-xl bg-white/15"><Sparkles className="w-4 h-4" /></span>
            ZarkloAi
          </Link>
          <div>
            <p className="font-display text-4xl leading-tight">"We went from manual scheduling to a 6-figure month in 90 days."</p>
            <div className="mt-6 text-sm text-white/70">Camille Vasquez — Maison Lumière Salon</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl">Welcome back</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to your ZarkloAi dashboard.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@salon.com" className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="h-11 rounded-xl" />
            </div>
            <Button type="submit" className="w-full h-11 rounded-full bg-gradient-brand border-0 text-white shadow-glow">
              Sign in <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-6 text-center">
            New here? <Link to="/dashboard" className="text-brand hover:underline">Start free trial</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
