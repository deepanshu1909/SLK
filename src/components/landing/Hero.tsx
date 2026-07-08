import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./DashboardPreview";
import { Counter } from "./motion-bits";

const rotatingVerticals = ["salon", "clinic", "path lab"];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % rotatingVerticals.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
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
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-8">
            {["Salons", "Clinics", "Path Labs"].map((label) => (
              <span
                key={label}
                className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80"
              >
                {label}
              </span>
            ))}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Hire an AI team that <br />
            grows your{" "}
            <span className="italic text-white inline-flex min-w-[5ch] justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingVerticals[index]}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block"
                >
                  {rotatingVerticals[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            More appointments, higher Google rankings, and loyal customers — with autonomous AI agents built for salons, clinics, and pathology labs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full bg-gradient-brand text-white border-0 shadow-glow h-12 px-7 text-base hover:opacity-95">
                Hire AI Team <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#verticals">
              <Button size="lg" variant="ghost" className="rounded-full h-12 px-6 text-base">
                See your industry
              </Button>
            </a>
          </div>
        </motion.div>

        <div className="mt-24 max-w-5xl mx-auto">
          <DashboardPreview />
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { v: 1200, suf: "%", label: "More profile views" },
            { v: 3, suf: "x", label: "More appointments" },
            { v: 85, suf: "%", label: "Customer retention" },
            { v: 42, suf: "M+", label: "Revenue generated", prefix: "$" },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-white">
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
