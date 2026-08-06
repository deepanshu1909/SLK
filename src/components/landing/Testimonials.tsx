import { partnerLogos } from "@/lib/mock-data";

export function SocialProof() {
  if (partnerLogos.length === 0) {
    return (
      <section className="py-12 border-y border-[var(--hairline)] bg-white">
        <div className="zk-container text-center">
          <p className="zk-kicker">Built for salons, clinics, and pathology labs</p>
          <p className="mt-2 zk-caption">
            Partner logos coming soon — Founding Partner cohort in progress.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-y border-[var(--hairline)] bg-white">
      <div className="zk-container">
        <p className="text-center zk-kicker mb-10">
          Trusted by salons, clinics, and pathology labs
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center opacity-70">
          {partnerLogos.map((l) => (
            <div key={l} className="font-display text-lg text-center text-[var(--navy)]">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
