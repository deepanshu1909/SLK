import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";

export function FAQ() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand mb-4">FAQ</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1]">
              Questions, <span className="italic text-gradient-brand">answered.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border bg-card px-6 shadow-card data-[state=open]:shadow-elevated transition-shadow">
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
