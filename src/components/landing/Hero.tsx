import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardPreview } from "./DashboardPreview";
import { TrustBadges } from "./TrustBadges";
import { STARTING_PRICE_INR, STARTING_PRICE_USD } from "@/lib/site-content";

const stats = [
  { value: "3", label: "Verticals served" },
  { value: "3", label: "Growth modules" },
  { value: "1", label: "End-to-end system" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] pb-16 pt-28 md:pb-24 md:pt-36">
      <div aria-hidden className="absolute inset-0 bg-mesh" />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-70" />
      <div
        aria-hidden
        className="absolute -top-40 right-0 h-[40rem] w-[40rem] rounded-full bg-[var(--gold-soft)] opacity-80 blur-3xl"
      />

      <div className="relative zk-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center rounded-md border border-[var(--hairline)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--gold)]">
            Now onboarding our first Founding Partners
          </div>

          <div className="zk-kicker mb-5">Salons & spas · Clinics · Pathology labs</div>

          <h1 className="zk-h1">
            Your AI growth team — for salons, clinics, and diagnostic labs
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg zk-muted">
            Zarklo connects local visibility, instant inquiry response, booking
            follow-up, retention, and CRM context into one growth system — tailored to
            salons, clinics, and diagnostic labs.
          </p>

          <p className="mt-4 text-sm text-[var(--muted-ink)]">
            Starting at ${STARTING_PRICE_USD}/mo · ≈ ₹
            {STARTING_PRICE_INR.toLocaleString("en-IN")}/mo — visible without a form
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/success-demo" className="zk-btn-primary">
              Book a Success Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#growth-calculator" className="zk-btn-secondary">
              See your free growth estimate
            </a>
          </div>

          <TrustBadges className="mt-6" />
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="zk-stat">
              <div className="zk-stat-value">{s.value}</div>
              <div className="zk-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-5xl md:mt-20">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
