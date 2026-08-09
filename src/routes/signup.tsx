import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create account — Zarklo";
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", "Create your Zarklo account.");
  }, []);

  const completeDemoSignup = (provider: "google" | "email") => {
    window.localStorage.setItem("zarklo-demo-auth", provider);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid bg-[var(--background)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[var(--card)] lg:block">
        <div aria-hidden className="absolute inset-0 bg-mesh opacity-80" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--primary)] text-sm font-semibold text-white shadow-glow">
              Z
            </span>
            Zarklo
          </Link>

          <div className="max-w-lg">
            <div className="zk-kicker mb-4">One connected growth system</div>
            <p className="font-display text-4xl leading-tight text-white">
              Bring visibility, inquiries, follow-ups, and CRM context into one
              workspace.
            </p>
            <div className="mt-6 text-sm leading-relaxed text-white/60">
              Built for salons & spas, clinics, and pathology labs.
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 py-12 sm:p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 flex items-center gap-2 font-display text-xl lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--primary)] text-sm font-semibold text-white">
              Z
            </span>
            Zarklo
          </Link>

          <h1 className="zk-h2">Create your account</h1>
          <p className="zk-caption mt-1">
            Start with your business details. You can configure workflows later.
          </p>

          <div className="mt-8">
            <GoogleAuthButton
              label="Sign up with Google"
              onClick={() => completeDemoSignup("google")}
            />
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--hairline)]" />
            <span className="text-xs uppercase tracking-[0.08em] text-[var(--muted-ink)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--hairline)]" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              completeDemoSignup("email");
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                placeholder="Your name"
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="business-email">Business email</Label>
              <Input
                id="business-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@yourbusiness.com"
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="vertical">Business type</Label>
              <select
                id="vertical"
                name="vertical"
                required
                defaultValue=""
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="" disabled>
                  Select your business type
                </option>
                <option>Salon & Spa</option>
                <option>Clinic</option>
                <option>Pathology Lab</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className="h-11 rounded-lg"
              />
              <p className="text-xs text-[var(--muted-ink)]">
                Use at least 8 characters.
              </p>
            </div>

            <button type="submit" className="zk-btn-primary w-full">
              Create account <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-xs leading-relaxed text-[var(--muted-ink)]">
            By creating an account, you agree to Zarklo’s Terms and Privacy Policy.
          </p>

          <p className="mt-6 text-center text-xs text-[var(--muted-ink)]">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--gold)] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
