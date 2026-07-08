import { motion } from "framer-motion";
import { Bot, Calendar, MapPin, ShieldCheck } from "lucide-react";
import { services } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const iconMap = { ShieldCheck, Bot, MapPin, Calendar };

export function ServicesSection() {
  return (
    <section id="features" className="relative py-32">
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">Services</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] tracking-tight text-foreground">
              Everything you need to{" "}
              <span className="italic text-white">grow locally.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Four core services that power growth for salons, clinics, and path labs — visibility, conversion, retention, and bookings on autopilot.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-card border border-white/10 p-8 shadow-card hover:shadow-elevated transition-shadow overflow-hidden"
              >
                <div aria-hidden className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-brand opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-brand border border-white/10 grid place-items-center mb-6">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="font-display text-2xl mb-2 text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
