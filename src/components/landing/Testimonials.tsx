import { Star } from "lucide-react";
import { FadeIn } from "./motion-bits";

const logos = [
  "Maison Lumière",
  "Cole & Co.",
  "Lotus Spa",
  "Atelier 7",
  "North Star",
  "Velvet Room",
  "Bloom Beauty",
  "Halo Studio",
];

export function SocialProof() {
  return (
    <section className="py-20 border-y bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            Built for the next generation of salons, spas, and clinics
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-6 items-center opacity-60">
          {logos.map((l) => (
            <div
              key={l}
              className="font-display text-xl text-center text-muted-foreground/80"
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
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">
              Founding Partners
            </div>

            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1]">
              Every great case study starts with{" "}
              <span className="italic text-gradient-brand">
                the first success story.
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're partnering with a select group of salons, spas, med spas,
              and clinics to build the future of customer growth. If you're
              ambitious about growing your business, we'd love to build
              alongside you.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-3xl bg-card border p-10 md:p-14 shadow-card hover:shadow-elevated transition-all">
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <blockquote className="font-display text-2xl md:text-4xl text-center leading-relaxed">
              "We're not looking for customers. We're looking for partners.
              Businesses that want more bookings, stronger reviews, higher
              visibility, and measurable growth. If we can't create real
              results, we don't deserve your trust."
            </blockquote>

            <div className="mt-10 pt-8 border-t text-center">
              <div className="font-semibold text-lg">The Growth Team</div>

              <div className="text-sm text-muted-foreground mt-1">
                Building the AI-powered growth engine for local businesses
              </div>

              <div className="mt-4 inline-flex items-center rounded-full border px-4 py-2 text-sm text-brand font-medium">
                 Accepting Founding Partners
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}