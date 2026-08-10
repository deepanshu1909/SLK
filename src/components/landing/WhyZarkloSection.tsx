import { comparisonRows } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

export function WhyZarkloSection() {
  return (
    <section id="why-zarklo" className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mb-10 max-w-2xl md:mb-12">
            <div className="zk-kicker mb-4">Why ZarkloAI</div>
            <h2 className="zk-h2">
              Not another <span className="italic">booking widget.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Built for three verticals, designed to work alongside tools you already
              trust. Multi-vertical expertise — salons, clinics, and labs — not a single
              niche bolt-on.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "vs Manual effort",
                text: "Staff time and memory don’t scale. ZarkloAI runs discovery, response, and follow-up as a system.",
              },
              {
                title: "vs Booking software only",
                text: "Schedulers take payments. They rarely own local visibility, inquiry speed, or retention.",
              },
              {
                title: "vs Rip-and-replace platforms",
                text: "ZarkloAI sits alongside booking, EMR, and LIMS tools — it doesn’t force a stack migration.",
              },
            ].map((card) => (
              <div key={card.title} className="zk-card p-5">
                <h3 className="text-sm font-semibold text-[var(--heading)]">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted-ink)]">{card.text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--card)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--hairline)] bg-[var(--cream)]">
                  <th className="w-[18%] px-5 py-4 font-medium text-[var(--muted-ink)]" />
                  <th className="px-5 py-4 font-display text-lg font-medium text-[var(--heading)]">
                    ZarkloAI
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--muted-ink)]">
                    Generic booking software
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--muted-ink)]">
                    Doing it manually
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-t border-[var(--hairline)] align-top">
                    <td className="px-5 py-4 font-medium text-[var(--heading)]">{row.label}</td>
                    <td className="px-5 py-4 text-[var(--ink)]">{row.zarklo}</td>
                    <td className="px-5 py-4 text-[var(--muted-ink)]">{row.booking}</td>
                    <td className="px-5 py-4 text-[var(--muted-ink)]">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
