import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Industries", href: "#verticals" },
  { label: "Modules", href: "#agents" },
  { label: "CRM Demo", href: "#success-demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(8,4,15,0)", "rgba(8,4,15,0.94)"]);
  const border = useTransform(scrollY, [0, 60], ["rgba(196,181,253,0)", "rgba(196,181,253,0.16)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md"
    >
      <div className="zk-container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-2xl text-[var(--heading)] tracking-tight">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--primary)] text-white text-sm font-sans font-semibold shadow-glow">
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
          <Link to="/login" className="text-sm text-[var(--muted-ink)] hover:text-[var(--heading)] transition-colors">
            Login
          </Link>
          <Link to="/success-demo" className="zk-btn-primary !min-h-10 !px-4 !py-2 text-sm">
            Success Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 min-h-11 min-w-11 text-[var(--heading)]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--hairline)] bg-[var(--background)] px-6 py-4 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-3 text-sm text-[var(--heading)] min-h-11"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link to="/success-demo" className="zk-btn-primary w-full mt-2" onClick={() => setOpen(false)}>
            Success Demo
          </Link>
        </div>
      )}
    </motion.header>
  );
}
