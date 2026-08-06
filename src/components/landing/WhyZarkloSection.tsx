import { comparisonRows } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

export function WhyZarkloSection() {
  return (
    <section id="why-zarklo" className="zk-section bg-white">
      <div className="zk-container">
        <FadeIn>
          <div className="max-w-2xl mb-10 md:mb-12">
            <div className="zk-kicker mb-4">Why Zarklo</div>
            <h2 className="zk-h2">
              Not another <span className="italic">booking widget.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Built for three verticals, designed to work alongside tools you already
              trust.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="overflow-x-auto rounded-xl border border-[var(--hairline)] bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="bg-[var(--cream)] border-b border-[var(--hairline)]">
                  <th className="px-5 py-4 font-medium text-[var(--muted-ink)] w-[18%]" />
                  <th className="px-5 py-4 font-display text-lg text-[var(--navy)] font-medium">
                    Zarklo
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
                    <td className="px-5 py-4 font-medium text-[var(--navy)]">{row.label}</td>
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
