import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site-content";

const navLinks = [
  { label: "Industries", href: "#verticals" },
  { label: "Calculator", href: "#growth-calculator" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "/resources", isRoute: true },
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
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="zk-container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-2xl tracking-tight text-[var(--heading)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--primary)] text-sm font-sans font-semibold text-white shadow-glow">
            Z
          </span>
          Zarklo
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} to={l.href} className="zk-nav-link">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href.startsWith("#") ? `/${l.href}` : l.href} className="zk-nav-link">
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-xs text-[var(--muted-ink)] hover:text-[var(--heading)]"
          >
            {CONTACT_EMAIL}
          </a>
          <Link to="/login" className="text-sm text-[var(--muted-ink)] hover:text-[var(--heading)]">
            Login
          </Link>
          <Link to="/success-demo" className="zk-btn-primary !min-h-10 !px-4 !py-2 text-sm">
            Success Demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="min-h-11 min-w-11 p-2 text-[var(--heading)] md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <div className="space-y-1 border-t border-[var(--hairline)] bg-[var(--background)] px-6 py-4 md:hidden">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link
                key={l.label}
                to={l.href}
                className="block min-h-11 py-3 text-sm text-[var(--heading)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={`/${l.href}`}
                className="block min-h-11 py-3 text-sm text-[var(--heading)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ),
          )}
          <a href={`mailto:${CONTACT_EMAIL}`} className="block py-2 text-sm text-[var(--gold)]">
            {CONTACT_EMAIL}
          </a>
          <Link
            to="/success-demo"
            className="zk-btn-primary mt-2 w-full"
            onClick={() => setOpen(false)}
          >
            Success Demo
          </Link>
        </div>
      ) : null}
    </motion.header>
  );
}
