import { Minus, Plus } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef } from "react";
import { faqs } from "@/lib/mock-data";
import { FadeIn } from "./motion-bits";
import { cn } from "@/lib/utils";

function FaqTrigger({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 min-h-11 text-left font-display text-lg text-[var(--navy)] transition-colors hover:no-underline",
          className,
        )}
        {...props}
      >
        {children}
        <span className="shrink-0 text-[var(--gold)]">
          <Plus className="h-5 w-5 group-data-[state=open]:hidden" strokeWidth={1.5} />
          <Minus className="h-5 w-5 hidden group-data-[state=open]:block" strokeWidth={1.5} />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="zk-section bg-[var(--cream)]">
      <div className="zk-container max-w-3xl">
        <FadeIn>
          <div className="text-center mb-10 md:mb-12">
            <div className="zk-kicker mb-4">FAQ</div>
            <h2 className="zk-h2">
              Questions, <span className="italic">answered.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {faqs.map((f, i) => (
              <AccordionPrimitive.Item key={i} value={`item-${i}`} className="border-0">
                <FaqTrigger>{f.q}</FaqTrigger>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-5 zk-muted text-[0.9375rem]">{f.a}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </FadeIn>
      </div>
    </section>
  );
}
