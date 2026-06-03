import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-brand via-brand-deep to-foreground p-14 md:p-20 text-center">
          <div aria-hidden className="absolute inset-0 grid-bg opacity-20" />
          <div aria-hidden className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />

          <div className="relative">
            <h2 className="font-display text-5xl md:text-7xl text-white leading-[1] tracking-tight">
              Stop chasing clients. <br />
              <span className="italic">Start growing.</span>
            </h2>
            <p className="mt-6 text-white/80 text-lg max-w-xl mx-auto">
              Spin up your AI team in under 5 minutes. First 14 days are on us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full bg-white text-brand-deep hover:bg-white/90 border-0 h-12 px-7 text-base">
                  <Sparkles className="w-4 h-4 mr-1" /> Hire AI Team <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="ghost" className="rounded-full h-12 px-6 text-base text-white hover:bg-white/10 hover:text-white">
                  See pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "AI Agents", "Pricing", "Integrations", "Changelog"] },
    { title: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
    { title: "Resources", links: ["Blog", "Help center", "Guides", "Academy", "Status"] },
    { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
  ];
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-2xl">
              <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-brand shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              SLK
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The AI team for modern salons, spas, and barbershops. Built in California.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm hover:text-brand transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SLK Labs, Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
