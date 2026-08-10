import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";
import { FadeIn } from "./motion-bits";
import { estimateGrowth, STARTING_PRICE_INR, STARTING_PRICE_USD } from "@/lib/site-content";

type Vertical = "salon" | "clinic" | "lab";

export function GrowthCalculatorSection() {
  const [vertical, setVertical] = useState<Vertical>("salon");
  const [bookings, setBookings] = useState("120");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    const monthly = Number(bookings) || 0;
    return estimateGrowth({ vertical, monthlyBookings: monthly });
  }, [vertical, bookings]);

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    const leads = JSON.parse(window.localStorage.getItem("zarklo-leads") || "[]");
    leads.push({
      type: "growth-calculator",
      email: email.trim(),
      vertical,
      bookings: Number(bookings) || 0,
      location: location.trim(),
      at: new Date().toISOString(),
    });
    window.localStorage.setItem("zarklo-leads", JSON.stringify(leads));
    setUnlocked(true);
    setSubmitted(true);
  };

  return (
    <section id="growth-calculator" className="zk-section bg-[var(--cream)]">
      <div className="zk-container">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="zk-kicker mb-4">Free growth estimate</div>
            <h2 className="zk-h2">
              See a projected range for your <span className="italic">bookings.</span>
            </h2>
            <p className="mt-4 zk-muted">
              Enter your business type and current monthly volume. We’ll show an
              illustrative range — clearly labeled as an estimate, not a guarantee.
              Plans start at ${STARTING_PRICE_USD}/mo (≈ ₹{STARTING_PRICE_INR.toLocaleString("en-IN")}).
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <form
              onSubmit={unlock}
              className="zk-card-white space-y-4 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
                <Calculator className="h-4 w-4 text-[var(--gold)]" />
                Growth Calculator
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">Business type</span>
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value as Vertical)}
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                >
                  <option value="salon">Salon & Spa</option>
                  <option value="clinic">Clinic</option>
                  <option value="lab">Pathology / diagnostic lab</option>
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">
                  Current monthly bookings / appointments
                </span>
                <input
                  type="number"
                  min={0}
                  max={5000}
                  value={bookings}
                  onChange={(e) => setBookings(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                  required
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs text-[var(--muted-ink)]">City / location</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru"
                  className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                  required
                />
              </label>

              {!unlocked ? (
                <label className="block space-y-1.5">
                  <span className="text-xs text-[var(--muted-ink)]">
                    Email to unlock full estimate
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className="h-11 w-full rounded-lg border border-[var(--hairline)] bg-[var(--background)] px-3 text-sm"
                    required
                  />
                </label>
              ) : null}

              <button type="submit" className="zk-btn-primary w-full">
                {unlocked ? "Refresh estimate" : "See your free growth estimate"}
              </button>
              <p className="text-xs text-[var(--muted-ink)]">
                We’ll only use your email to send this estimate and relevant Zarklo
                updates. No spam.
              </p>
            </form>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="zk-card relative h-full overflow-hidden p-6 md:p-8">
              {!unlocked ? (
                <div className="flex h-full min-h-[280px] flex-col justify-center">
                  <p className="text-sm text-[var(--muted-ink)]">
                    Preview (blurred until email unlock)
                  </p>
                  <div className="mt-4 select-none blur-sm">
                    <div className="font-display text-4xl text-[var(--heading)]">+12–28</div>
                    <p className="mt-2 text-sm text-[var(--muted-ink)]">
                      Additional monthly bookings (illustrative)
                    </p>
                  </div>
                  <p className="mt-8 text-sm text-[var(--ink)]">
                    Enter your details and email to reveal a personalized range for{" "}
                    {location || "your market"}.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="zk-kicker mb-2">Illustrative estimate</div>
                  <h3 className="zk-h3">
                    Additional monthly volume: {estimate.additionalLow}–
                    {estimate.additionalHigh}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--muted-ink)]">
                    If you currently run ~{Number(bookings) || 0} bookings/appointments
                    per month{location ? ` in ${location}` : ""}, a combined visibility +
                    response + follow-up system is designed to help you move toward roughly{" "}
                    <strong className="text-[var(--heading)]">
                      {estimate.projectedLow}–{estimate.projectedHigh}
                    </strong>{" "}
                    total monthly volume over time.
                  </p>
                  <p className="mt-4 rounded-lg border border-[var(--hairline)] bg-[var(--background)] p-3 text-xs leading-relaxed text-[var(--muted-ink)]">
                    {estimate.note}
                  </p>
                  {submitted ? (
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                      <Link to="/success-demo" className="zk-btn-primary">
                        Open Success Demo <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a href="#ranking-tool" className="zk-btn-secondary">
                        Check your ranking
                      </a>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
