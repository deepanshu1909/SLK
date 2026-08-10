import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Scissors, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { verticals } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const iconMap = { Scissors, Stethoscope, FlaskConical };
const pageLinks = ["/salons", "/clinics", "/pathology-labs"] as const;

export function VerticalsSection() {
  const [active, setActive] = useState(0);
  const v = verticals[active];
  const Icon = iconMap[v.icon as keyof typeof iconMap];

  return (
    <section id="verticals" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <div className="zk-kicker mb-4">Built for your industry</div>
            <h2 className="zk-h2">
              Same growth system. <span className="italic">Different workflows.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Choose your vertical below — or open a dedicated page for deeper detail.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link to="/salons" className="zk-btn-secondary !min-h-9 !px-3 !py-1.5 text-xs">
                Salons page
              </Link>
              <Link to="/clinics" className="zk-btn-secondary !min-h-9 !px-3 !py-1.5 text-xs">
                Clinics page
              </Link>
              <Link
                to="/pathology-labs"
                className="zk-btn-secondary !min-h-9 !px-3 !py-1.5 text-xs"
              >
                Pathology labs page
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="mb-10 flex justify-center">
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
            className="zk-card-white mx-auto max-w-3xl p-8 md:p-10"
            role="tabpanel"
          >
            <div className="mb-5 flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--hairline)] bg-[var(--gold-soft)]">
                <Icon className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="zk-kicker mb-1">{v.name}</div>
                <h3 className="zk-h3">{v.headline}</h3>
              </div>
            </div>
            <p className="mb-6 zk-muted">{v.desc}</p>
            <ul className="space-y-3">
              {v.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-[var(--ink)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to={pageLinks[active]} className="zk-link-gold mt-6 inline-flex">
              Open full {v.name} page →
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
