import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Industries", href: "#verticals" },
  { label: "Modules", href: "#agents" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.96)"]);
  const border = useTransform(scrollY, [0, 60], ["rgba(217,214,207,0)", "rgba(217,214,207,1)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md"
    >
      <div className="zk-container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-2xl text-[var(--navy)] tracking-tight">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--navy)] text-white text-sm font-sans font-semibold">
            Z
          </span>
          Zarklo
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="zk-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm text-[var(--muted-ink)] hover:text-[var(--navy)] transition-colors">
            Login
          </Link>
          <a href="#pricing" className="zk-btn-primary !min-h-10 !px-4 !py-2 text-sm">
            Book a 15-min demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 min-h-11 min-w-11 text-[var(--navy)]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--hairline)] bg-white px-6 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-3 text-sm text-[var(--navy)] min-h-11"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#pricing" className="zk-btn-primary w-full mt-2" onClick={() => setOpen(false)}>
            Book a 15-min demo
          </a>
        </div>
      )}
    </motion.header>
  );
}
