import { Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { pricingTiers } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <div className="zk-kicker mb-4">Pricing</div>
            <h2 className="zk-h2">
              Simple plans. <span className="italic">Clear scope.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Pick the modules you need. Upgrade when you want retention automation or a
              full client/patient system in one place.
            </p>

            <div className="mt-8 zk-tabs">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {pricingTiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={`relative flex flex-col p-7 md:p-8 rounded-xl ${
                t.popular
                  ? "bg-white border-2 border-[var(--gold)] shadow-[var(--shadow-elevated)] md:scale-[1.02] z-10"
                  : "zk-card-white"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-[var(--gold)] text-white text-[11px] font-medium tracking-wide uppercase">
                  Recommended
                </div>
              )}

              <div className="zk-kicker">{t.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl md:text-5xl text-[var(--navy)]">
                  ${yearly ? t.yearly : t.monthly}
                </span>
                <span className="text-[var(--muted-ink)] text-sm">/mo</span>
              </div>
              <p className="mt-2 zk-caption">{t.blurb}</p>

              <a href="#pricing" className={`mt-6 ${t.popular ? "zk-btn-primary" : "zk-btn-secondary"}`}>
                {t.cta}
              </a>

              <ul className="mt-7 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink)]">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--gold)]" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {t.note && (
                <p className="mt-6 pt-5 border-t border-[var(--hairline)] zk-caption leading-relaxed">
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
