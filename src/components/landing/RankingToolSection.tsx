import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { FadeIn } from "./motion-bits";
import { simulateRanking } from "@/lib/site-content";

export function RankingToolSection() {
  const [businessName, setBusinessName] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState<ReturnType<typeof simulateRanking> | null>(null);
  const [loading, setLoading] = useState(false);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      const snapshot = simulateRanking({ businessName, service, location });
      setResult(snapshot);
      const leads = JSON.parse(window.localStorage.getItem("zarklo-leads") || "[]");
      leads.push({
        type: "ranking-check",
        businessName,
        service,
        location,
        at: new Date().toISOString(),
      });
      window.localStorage.setItem("zarklo-leads", JSON.stringify(leads));
      setLoading(false);
    }, 700);
  };

  return (
    <section id="ranking-tool" className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="zk-kicker mb-4">Free ranking check</div>
            <h2 className="zk-h2">
              Check your Google ranking for a <span className="italic">local query.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Enter your business, service, and city. You’ll get an immediate,
              personalized snapshot that makes the visibility problem concrete —
              labeled clearly as an illustrative demo, not a live Google scrape.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
          <FadeIn>
            <form onSubmit={run} className="zk-card-white space-y-4 p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
                <Search className="h-4 w-4 text-[var(--gold)]" />
                Check Your Google Ranking
              </div>
              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">Business name</span>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                  required
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">Service people search</span>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. hair salon / clinic / blood test"
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                  required
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">Location</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or neighbourhood"
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                  required
                />
              </label>
              <button type="submit" className="zk-btn-primary w-full" disabled={loading}>
                {loading ? "Checking…" : "Get your free ranking report"}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="zk-card flex h-full min-h-[280px] flex-col p-6 md:p-8">
              {!result ? (
                <div className="flex flex-1 flex-col justify-center text-sm text-[var(--muted-ink)]">
                  <MapPin className="mb-3 h-5 w-5 text-[var(--gold)]" />
                  Your local query snapshot will appear here.
                </div>
              ) : (
                <div>
                  <div className="zk-kicker mb-2">Query</div>
                  <p className="font-medium text-[var(--heading)]">“{result.query}”</p>
                  <div className="mt-5 rounded-lg border border-[var(--hairline)] bg-[var(--background)] p-4">
                    <div className="text-xs uppercase tracking-[0.06em] text-[var(--muted-ink)]">
                      Illustrative position band
                    </div>
                    <p className="mt-2 text-lg text-[var(--heading)]">{result.position}</p>
                  </div>
                  <p className="mt-3 text-xs text-[var(--muted-ink)]">{result.confidence}</p>
                  <ul className="mt-5 space-y-2">
                    {result.nextSteps.map((step) => (
                      <li key={step} className="flex gap-2 text-sm text-[var(--ink)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                        {step}
                      </li>
                    ))}
                  </ul>
                  <Link to="/success-demo" className="zk-btn-secondary mt-6 inline-flex">
                    See how Discovery improves visibility
                  </Link>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
