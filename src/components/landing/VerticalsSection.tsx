import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Scissors, Stethoscope } from "lucide-react";
import { verticals } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const iconMap = { Scissors, Stethoscope, FlaskConical };

export function VerticalsSection() {
  const [active, setActive] = useState(0);
  const v = verticals[active];
  const Icon = iconMap[v.icon as keyof typeof iconMap];

  return (
    <section id="verticals" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
            <div className="zk-kicker mb-4">Built for your industry</div>
            <h2 className="zk-h2">
              Same growth system. <span className="italic">Different workflows.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Choose your vertical to see how Zarklo fits — we speak your language, not
              generic “local business” copy.
            </p>
          </div>
        </FadeIn>

        <div className="flex justify-center mb-10">
          <div className="zk-tabs" role="tablist" aria-label="Industry verticals">
            {verticals.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`zk-tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={v.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="zk-card-white max-w-3xl mx-auto p-8 md:p-10"
            role="tabpanel"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[var(--gold-soft)] border border-[var(--hairline)] grid place-items-center shrink-0">
                <Icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="zk-kicker mb-1">{v.name}</div>
                <h3 className="zk-h3">{v.headline}</h3>
              </div>
            </div>
            <p className="zk-muted mb-6">{v.desc}</p>
            <ul className="space-y-3">
              {v.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[var(--ink)] text-[0.9375rem]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
