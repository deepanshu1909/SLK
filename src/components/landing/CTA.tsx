import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="zk-section bg-white">
      <div className="zk-container">
        <div className="rounded-xl bg-[var(--navy)] px-8 py-14 md:px-16 md:py-20 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight">
            Ready when you are.
          </h2>
          <p className="mt-5 text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
            See how Discovery, Conversion, and Retention fit your salon, clinic, or lab —
            in a short walkthrough.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-lg bg-white text-[var(--navy)] font-medium text-[0.9375rem] hover:bg-[var(--cream)] transition-colors"
            >
              Book a 15-min demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-lg border border-white/30 text-white font-medium text-[0.9375rem] hover:bg-white/10 transition-colors"
            >
              See how it works
            </a>
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
        { label: "How it works", href: "#how-it-works" },
        { label: "Modules", href: "#agents" },
        { label: "Pricing", href: "#pricing" },
        { label: "Industries", href: "#verticals" },
      ],
    },
    {
      title: "Agents",
      links: [
        { label: "Discovery", href: "#agents" },
        { label: "Conversion", href: "#agents" },
        { label: "Retention", href: "#agents" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact", href: "mailto:hello@zarklo.com" },
        { label: "FAQ", href: "#faq" },
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
    <footer className="bg-[var(--navy)] text-white">
      <div className="zk-container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 font-display text-2xl">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--gold)] text-[var(--navy)] text-sm font-sans font-semibold">
                Z
              </span>
              Zarklo
            </div>
            <p className="mt-4 text-sm text-white/65 max-w-xs leading-relaxed">
              The AI growth platform for salons, clinics, and pathology labs.
            </p>
            <a
              href="mailto:hello@zarklo.com"
              className="mt-4 inline-block text-sm text-[var(--gold)] hover:text-[#d4b57a] transition-colors"
            >
              hello@zarklo.com
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/45 mb-3">
                {c.title}
              </div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/70 hover:text-[var(--gold)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} Zarklo. All rights reserved.</div>
          <div className="flex gap-5">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="hover:text-[var(--gold)] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
