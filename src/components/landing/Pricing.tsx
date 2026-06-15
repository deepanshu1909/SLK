import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { pricingTiers } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";
import { motion } from "framer-motion";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-32 relative">
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">
              Pricing
            </div>

            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1]">
              Simple, <span className="italic text-gradient-brand">honest pricing</span>
            </h2>

            <p className="mt-5 text-lg text-black">
              14-day free trial on every plan. Cancel anytime.
            </p>

            <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full glass border">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-2 text-sm rounded-full transition-all ${
                  !yearly
                    ? "bg-foreground text-background"
                    : "text-black"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-2 text-sm rounded-full transition-all flex items-center gap-2 ${
                  yearly
                    ? "bg-foreground text-background"
                    : "text-black"
                }`}
              >
                Yearly
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700">
                  −20%
                </span>
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {pricingTiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative rounded-3xl border p-8 ${
                t.popular
                  ? "bg-gradient-to-b from-brand to-brand-deep text-white border-transparent shadow-glow scale-[1.02]"
                  : "bg-card shadow-card"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-brand-deep text-[11px] font-medium tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`text-xs uppercase tracking-wider ${
                  t.popular ? "text-white/70" : "text-black"
                }`}
              >
                {t.name}
              </div>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-5xl">
                  ${yearly ? t.yearly : t.monthly}
                </span>

                <span className={t.popular ? "text-white/70" : "text-black"}>
                  /mo
                </span>
              </div>

              <p
                className={`mt-2 text-sm ${
                  t.popular ? "text-white/80" : "text-black"
                }`}
              >
                {t.blurb}
              </p>

              <Link to="/dashboard" className="block mt-6">
                <Button
                  className={`w-full rounded-full h-11 border-0 ${
                    t.popular
                      ? "bg-white text-brand-deep hover:bg-white/90"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {t.cta}
                </Button>
              </Link>

              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        t.popular ? "text-white" : "text-brand"
                      }`}
                    />
                    <span className={t.popular ? "text-white/90" : "text-black"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}