import { motion } from "framer-motion";
import { CalendarCheck, Link2, LineChart, Rocket } from "lucide-react";
import { howItWorksSteps } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const icons = [Link2, Rocket, CalendarCheck, LineChart];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-14">
            <div className="zk-kicker mb-4">How it works</div>
            <h2 className="zk-h2">
              From connect to <span className="italic">calendar.</span>
            </h2>
            <p className="mt-4 zk-muted">Four steps. You stay in control of results.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {howItWorksSteps.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="zk-card-white p-6 md:p-7"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[var(--gold-soft)] grid place-items-center">
                    <Icon className="w-5 h-5 text-[var(--gold)]" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-2xl text-[var(--hairline)]">
                    {String(s.step).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="zk-h3 mb-2">{s.title}</h3>
                <p className="zk-caption leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <FadeIn delay={0.15}>
          <p className="mt-10 max-w-2xl zk-caption leading-relaxed text-[0.9375rem]">
            We set up and run the full system for you — not just a dashboard you have to
            manage.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
