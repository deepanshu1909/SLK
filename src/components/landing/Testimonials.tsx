import { Star } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

const logos = ["Maison Lumière", "Cole & Co.", "Lotus Spa", "Atelier 7", "North Star", "Velvet Room", "Bloom Beauty", "Halo Studio"];

export function SocialProof() {
  return (
    <section className="py-20 border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Trusted by 1,200+ salons, spas, and barbershops
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-6 items-center opacity-60">
          {logos.map((l) => (
            <div key={l} className="font-display text-xl text-center text-muted-foreground/80">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">Loved by owners</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1]">
              Real growth. <span className="italic text-gradient-brand">Real owners.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-card border p-8 shadow-card hover:shadow-elevated transition-all">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6 font-display">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-5 border-t">
                  <div>
                    <div className="font-medium text-sm">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="text-xs text-gradient-brand font-medium">{t.growth}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
