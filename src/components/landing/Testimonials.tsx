import { Star } from "lucide-react";
import { partnerLogos, testimonials } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

export function SocialProof() {
  return (
    <section className="py-20 border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Trusted by salons, clinics, and pathology labs
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-6 items-center opacity-60">
          {partnerLogos.map((l) => (
            <div
              key={l}
              className="font-display text-lg sm:text-xl text-center text-muted-foreground/80"
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">
              Founding Partners
            </div>

            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1]">
              Built with leaders in{" "}
              <span className="italic text-white">
                every vertical.
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're partnering with ambitious salons, clinics, and path labs to build the future of local growth. Real results across every industry we serve.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-card border p-8 shadow-card hover:shadow-elevated transition-all flex flex-col">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-foreground/90 flex-1">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 pt-5 border-t">
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{t.role}</div>
                  <div className="mt-3 inline-flex text-xs font-medium text-brand">{t.growth}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm text-brand font-medium">
              Accepting Founding Partners — Salons · Clinics · Path Labs
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
