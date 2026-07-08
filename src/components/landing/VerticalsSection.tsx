import { motion } from "framer-motion";
import { FlaskConical, Scissors, Stethoscope } from "lucide-react";
import { verticals } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const iconMap = { Scissors, Stethoscope, FlaskConical };

export function VerticalsSection() {
  return (
    <section id="verticals" className="relative py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-40" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">Industries</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight text-foreground">
              One platform.{" "}
              <span className="italic text-white">Three verticals.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Whether you run a salon, a clinic, or a pathology lab — ZarkloAI agents are trained for your workflows, your customers, and your growth goals.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {verticals.map((v, i) => {
            const Icon = iconMap[v.icon as keyof typeof iconMap];
            return (
              <motion.article
                key={v.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl bg-card border border-white/10 p-8 shadow-card hover:shadow-elevated transition-all overflow-hidden ${v.border}`}
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-br ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-brand border border-white/10 grid place-items-center shadow-glow">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                      {v.name}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl mb-3 text-foreground">{v.headline}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{v.desc}</p>

                  <ul className="space-y-2.5">
                    {v.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
