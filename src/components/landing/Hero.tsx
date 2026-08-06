import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";

const stats = [
  { value: "3", label: "Verticals served" },
  { value: "3", label: "Growth modules" },
  { value: "1", label: "End-to-end system" },
];

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-[var(--gold-soft)] blur-3xl opacity-70"
      />

      <div className="relative zk-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="zk-kicker mb-5">Salons & spas · Clinics · Pathology labs</div>

          <h1 className="zk-h1">
            Your AI growth team — for salons, clinics, and diagnostic labs
          </h1>

          <p className="mt-6 zk-muted max-w-2xl mx-auto text-lg">
            More bookings and appointments, stronger local search rankings, and higher
            retention — designed to run day to day without adding headcount.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#pricing" className="zk-btn-primary">
              Book a 15-min demo <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#how-it-works" className="zk-btn-secondary">
              See how it works
            </a>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="zk-stat">
              <div className="zk-stat-value">{s.value}</div>
              <div className="zk-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
