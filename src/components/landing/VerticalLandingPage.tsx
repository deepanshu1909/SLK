import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { Footer } from "@/components/landing/CTA";
import { TrustBadges } from "@/components/landing/TrustBadges";
import { SiteChatWidget } from "@/components/landing/SiteChatWidget";
import { agents } from "@/lib/mock-data";
import {
  CONTACT_EMAIL,
  STARTING_PRICE_INR,
  STARTING_PRICE_USD,
  type VerticalPageKey,
  verticalPages,
} from "@/lib/site-content";

export function VerticalLandingPage({ pageKey }: { pageKey: VerticalPageKey }) {
  const page = verticalPages[pageKey];

  useEffect(() => {
    document.title = page.metaTitle;
    document.querySelector("meta[name='description']")?.setAttribute("content", page.metaDesc);
  }, [page]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingNav />

      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div aria-hidden className="absolute inset-0 bg-mesh" />
        <div className="relative zk-container max-w-3xl text-center">
          <div className="zk-kicker mb-4">{page.name}</div>
          <h1 className="zk-h1">{page.hero}</h1>
          <p className="mx-auto mt-6 max-w-2xl zk-muted text-lg">{page.sub}</p>
          <p className="mt-4 text-sm text-[var(--muted-ink)]">
            Starting at ${STARTING_PRICE_USD}/mo · ≈ ₹{STARTING_PRICE_INR.toLocaleString("en-IN")}/mo
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/dashboard" className="zk-btn-primary">
              Book a Success Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/#growth-calculator" className="zk-btn-secondary">
              {page.softCta}
            </Link>
          </div>
          <TrustBadges className="mt-6" />
        </div>
      </section>

      <section className="zk-section bg-[var(--cream)]">
        <div className="zk-container">
          <div className="zk-kicker mb-4">Pain points</div>
          <h2 className="zk-h2 mb-8">What owners in this vertical feel first</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {page.pains.map((pain) => (
              <article key={pain.title} className="zk-card-white p-6">
                <h3 className="zk-h3">{pain.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-ink)]">{pain.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="zk-section">
        <div className="zk-container">
          <div className="zk-kicker mb-4">Modules</div>
          <h2 className="zk-h2 mb-4">Discovery · Conversion · Retention</h2>
          <p className="mb-8 max-w-2xl zk-muted">
            Same three jobs as the rest of ZarkloAI — tuned to {page.name.toLowerCase()} language
            and workflows. Designed to sit alongside your existing tools.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {agents.map((a) => (
              <article key={a.key} className="zk-card p-6">
                <h3 className="zk-h3">{a.name}</h3>
                <p className="mt-3 text-sm text-[var(--muted-ink)]">{a.desc}</p>
                <ul className="mt-4 space-y-2">
                  {a.details.map((d) => (
                    <li key={d} className="flex gap-2 text-xs text-[var(--ink)]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <ul className="mt-8 space-y-2">
            {page.outcomes.map((o) => (
              <li key={o} className="flex gap-2 text-sm text-[var(--ink)]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="zk-section bg-[var(--cream)]">
        <div className="zk-container max-w-3xl text-center">
          <div className="zk-kicker mb-4">Local search examples</div>
          <h2 className="zk-h2">Queries your customers actually type</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {page.searchExamples.map((q) => (
              <span
                key={q}
                className="rounded-md border border-[var(--hairline)] bg-[var(--card)] px-3 py-1.5 text-sm text-[var(--muted-ink)]"
              >
                “{q}”
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/#ranking-tool" className="zk-btn-secondary">
              Check your ranking
            </Link>
            <Link to="/dashboard" className="zk-btn-primary">
              Book a Success Demo
            </Link>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm text-[var(--gold)]">
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>

      <Footer />
      <SiteChatWidget />
    </div>
  );
}
