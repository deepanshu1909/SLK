import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TrustBadges } from "./TrustBadges";
import { CONTACT_EMAIL, STARTING_PRICE_INR, STARTING_PRICE_USD } from "@/lib/site-content";

export function CTA() {
  return (
    <section className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <div className="relative overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--card)] px-8 py-14 text-center shadow-[var(--shadow-elevated)] md:px-16 md:py-20">
          <div aria-hidden className="absolute inset-0 bg-mesh opacity-80" />
          <div className="relative">
            <h2 className="font-display text-4xl leading-tight tracking-tight text-white md:text-5xl">
              Ready for a demo — or just an estimate?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted-ink)]">
              High commitment: Success Demo. Low commitment: free growth estimate or
              ranking check. Plans start at ${STARTING_PRICE_USD}/mo (≈ ₹
              {STARTING_PRICE_INR.toLocaleString("en-IN")}/mo).
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/success-demo" className="zk-btn-primary">
                Book a Success Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#growth-calculator" className="zk-btn-secondary">
                See your free growth estimate
              </a>
            </div>
            <TrustBadges className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Growth calculator", href: "/#growth-calculator" },
        { label: "Ranking check", href: "/#ranking-tool" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Salons & Spas", href: "/salons" },
        { label: "Clinics", href: "/clinics" },
        { label: "Pathology Labs", href: "/pathology-labs" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Resources", href: "/resources" },
        { label: "Team", href: "/#team" },
        { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[var(--hairline)] bg-[#05020a] text-white">
      <div className="zk-container py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 font-display text-2xl">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--primary)] text-sm font-sans font-semibold text-white">
                Z
              </span>
              Zarklo
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              The AI growth platform for salons, clinics, and pathology labs.
            </p>
            <p className="mt-3 text-xs text-white/45">
              Starting at ${STARTING_PRICE_USD}/mo · ≈ ₹
              {STARTING_PRICE_INR.toLocaleString("en-IN")}/mo
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm text-[var(--gold)] hover:text-[#c4b5fd]"
            >
              {CONTACT_EMAIL}
            </a>
            <TrustBadges className="mt-5 !justify-start" />
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="mb-3 text-[11px] uppercase tracking-[0.08em] text-white/45">
                {c.title}
              </div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/70 transition-colors hover:text-[var(--gold)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <div>© {new Date().getFullYear()} Zarklo. All rights reserved.</div>
          <div className="flex gap-5">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="hover:text-[var(--gold)]">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
