import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./DashboardPreview";
import { Counter } from "./motion-bits";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-70" />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
      <div aria-hidden className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-accent-cyan/25 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            New — Loyalty Agent v2 is live
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Hire an AI team that <br />
            <span className="text-gradient-brand italic">grows your salon</span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get more bookings, rank higher on Google, and turn one-time guests into regulars — with autonomous AI agents built for salons, spas, and barbershops.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full bg-gradient-brand text-white border-0 shadow-glow h-12 px-7 text-base hover:opacity-95">
                Hire AI Team <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#agents">
              <Button size="lg" variant="ghost" className="rounded-full h-12 px-6 text-base">
                See the agents
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-day free trial</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</div>
            <div className="flex items-center gap-1.5">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
              4.9 from 1,200+ owners
            </div>
          </div>
        </motion.div>

        <div className="mt-24 max-w-5xl mx-auto">
          <DashboardPreview />
        </div>

        {/* Metric strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { v: 1200, suf: "%", label: "More profile views" },
            { v: 3, suf: "x", label: "More bookings" },
            { v: 85, suf: "%", label: "Client retention" },
            { v: 42, suf: "M+", label: "Revenue generated", prefix: "$" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-gradient-brand">
                <Counter to={m.v} suffix={m.suf} prefix={m.prefix} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
