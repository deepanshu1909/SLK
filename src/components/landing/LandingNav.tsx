import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Agents", href: "#agents" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export function LandingNav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,0.7)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(0,0,0,0.06)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-tight">
          <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-brand shadow-glow">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span>Zarklo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Login
          </Link>
          <Link to="/dashboard">
            <Button className="rounded-full bg-gradient-brand text-white shadow-glow hover:opacity-95 border-0 h-10 px-5">
              Hire AI Team
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link to="/dashboard" className="block">
            <Button className="w-full rounded-full bg-gradient-brand text-white border-0">Hire AI Team</Button>
          </Link>
        </div>
      )}
    </motion.header>
  );
}
