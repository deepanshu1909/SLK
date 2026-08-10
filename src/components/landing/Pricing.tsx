import { Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pricingTiers } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";
import { TrustBadges } from "./TrustBadges";
import { STARTING_PRICE_INR, STARTING_PRICE_USD } from "@/lib/site-content";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <div className="mb-4 inline-flex rounded-md border border-[var(--hairline)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--gold)]">
              Now onboarding our first Founding Partners
            </div>
            <div className="zk-kicker mb-4">Pricing</div>
            <h2 className="zk-h2">
              Simple plans. <span className="italic">Clear scope.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Starting at ${STARTING_PRICE_USD}/mo · ≈ ₹
              {STARTING_PRICE_INR.toLocaleString("en-IN")}/mo. Pick the modules you need —
              no form required to see prices.
            </p>

            <TrustBadges className="mt-6" />

            <div className="zk-tabs mt-8">
              <button
                type="button"
                className={`zk-tab ${!yearly ? "is-active" : ""}`}
                aria-selected={!yearly}
                onClick={() => setYearly(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`zk-tab ${yearly ? "is-active" : ""}`}
                aria-selected={yearly}
                onClick={() => setYearly(true)}
              >
                Yearly
                <span className="ml-1.5 text-[11px] text-[var(--gold)]">−20%</span>
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5">
          {pricingTiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={`relative flex flex-col rounded-xl p-7 md:p-8 ${
                t.popular
                  ? "z-10 border-2 border-[var(--gold)] bg-[var(--card)] shadow-[var(--shadow-elevated)] md:scale-[1.02]"
                  : "zk-card-white"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[var(--gold)] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                  Recommended
                </div>
              )}

              <div className="zk-kicker">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl text-[var(--heading)] md:text-5xl">
                  ${yearly ? t.yearly : t.monthly}
                </span>
                <span className="text-sm text-[var(--muted-ink)]">/mo</span>
              </div>
              <p className="mt-2 zk-caption">{t.blurb}</p>

              <Link
                to="/dashboard"
                className={`mt-6 ${t.popular ? "zk-btn-primary" : "zk-btn-secondary"}`}
              >
                {t.cta}
              </Link>
              <a
                href="#growth-calculator"
                className="mt-2 text-center text-xs text-[var(--gold)] hover:underline"
              >
                Or see a free growth estimate
              </a>

              <ul className="mt-7 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {t.note && (
                <p className="mt-6 border-t border-[var(--hairline)] pt-5 zk-caption leading-relaxed">
                  {t.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
