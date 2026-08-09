import { motion } from "framer-motion";
import { ArrowUpRight, Check, Heart, Sparkles, Target } from "lucide-react";
import { agents } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const iconMap = { Sparkles, Heart, Target };

export function AgentsSection() {
  return (
    <section id="agents" className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-14">
            <div className="zk-kicker mb-4">What runs for you</div>
            <h2 className="zk-h2">
              Three jobs. <span className="italic">Clear outcomes.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Discovery gets you found. Conversion turns interest into appointments.
              Retention brings people back — across salons, clinics, and labs.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={a.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="zk-card p-7 md:p-8"
              >
                <div className="w-10 h-10 rounded-lg border border-[var(--hairline)] bg-[var(--brand-soft)] grid place-items-center mb-5">
                  <Icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                </div>
                <h3 className="zk-h3 mb-2">{a.name}</h3>
                <p className="zk-caption text-[0.9375rem] leading-relaxed">
                  {a.desc}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {a.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-xs leading-relaxed text-[var(--muted-ink)]"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center gap-1.5 text-sm text-[var(--heading)] font-medium">
                  {a.metric}
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--gold)]" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
