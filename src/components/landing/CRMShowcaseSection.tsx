import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MessageSquareText,
  Search,
  Tags,
  Users,
} from "lucide-react";
import { FadeIn } from "./motion-bits";

const crmViews = [
  {
    label: "Salons & Spas",
    record: "Client 0182",
    status: "Rebooking due",
    activity: "Balayage appointment completed",
    next: "Send a rebooking reminder",
    segment: "Colour clients · 6–8 week cycle",
  },
  {
    label: "Clinics",
    record: "Patient 0314",
    status: "Follow-up due",
    activity: "Consultation completed",
    next: "Confirm follow-up appointment",
    segment: "Active care · Follow-up requested",
  },
  {
    label: "Pathology Labs",
    record: "Patient 0276",
    status: "Report ready",
    activity: "Diagnostic report delivered",
    next: "Send report acknowledgement",
    segment: "Repeat testing · Referral source tracked",
  },
] as const;

const crmDetails = [
  {
    icon: Users,
    title: "One customer record",
    text: "Keep contact details, preferences, consent notes, and relationship context together.",
  },
  {
    icon: CalendarDays,
    title: "Complete booking history",
    text: "See past and upcoming visits, services, tests, cancellations, and rebooking status.",
  },
  {
    icon: MessageSquareText,
    title: "Communication timeline",
    text: "Review inquiry responses, reminders, follow-ups, and review requests in one log.",
  },
  {
    icon: Tags,
    title: "Useful segmentation",
    text: "Group clients or patients by service, visit cycle, location, status, or campaign eligibility.",
  },
] as const;

export function CRMShowcaseSection() {
  const [active, setActive] = useState(0);
  const view = crmViews[active];

  return (
    <section id="success-demo" className="zk-section bg-[var(--background)]">
      <div className="zk-container">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end mb-12">
            <div>
              <div className="zk-kicker mb-4">CRM + Success Demo</div>
              <h2 className="zk-h2">
                See the full customer journey, not scattered conversations.
              </h2>
            </div>
            <div>
              <p className="zk-muted">
                Zarklo’s Advanced CRM brings records, booking history, communication,
                and segmentation into one operating view. Your Success Demo includes a
                walkthrough tailored to your salon, clinic, or diagnostic lab.
              </p>
              <Link to="/success-demo" className="zk-btn-primary mt-6">
                Open the Success Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-[var(--hairline)] bg-[var(--card)] shadow-[var(--shadow-elevated)]">
              <div className="flex flex-col gap-3 border-b border-[var(--hairline)] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--heading)]">
                    Relationship workspace
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--muted-ink)]">
                    Illustrative CRM view
                  </div>
                </div>
                <div className="zk-tabs" role="tablist" aria-label="CRM vertical preview">
                  {crmViews.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      role="tab"
                      aria-selected={active === index}
                      className={`zk-tab !min-h-9 !px-3 !py-1.5 text-xs ${
                        active === index ? "is-active" : ""
                      }`}
                      onClick={() => setActive(index)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid min-h-[390px] md:grid-cols-[190px_1fr]">
                <aside className="border-b border-[var(--hairline)] bg-[#0d0617] p-4 md:border-b-0 md:border-r">
                  <div className="flex min-h-10 items-center gap-2 rounded-lg border border-[var(--hairline)] bg-[var(--card)] px-3 text-xs text-[var(--muted-ink)]">
                    <Search className="h-3.5 w-3.5" />
                    Search records
                  </div>
                  <div className="mt-4 space-y-2">
                    {[view.record, "Recent inquiries", "Follow-ups due", "Segments"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className={`rounded-lg px-3 py-2.5 text-xs ${
                            index === 0
                              ? "bg-[var(--brand-soft)] text-[var(--heading)]"
                              : "text-[var(--muted-ink)]"
                          }`}
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </aside>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.08em] text-[var(--gold)]">
                        {view.label}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-[var(--heading)]">
                        {view.record}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--muted-ink)]">
                        Central record · Booking and communication history
                      </p>
                    </div>
                    <span className="inline-flex min-h-8 items-center rounded-md border border-[var(--hairline)] bg-[var(--brand-soft)] px-3 text-xs text-[var(--accent-cyan)]">
                      {view.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[var(--hairline)] bg-[#0d0617] p-4">
                      <div className="text-xs text-[var(--muted-ink)]">Latest activity</div>
                      <div className="mt-2 text-sm text-[var(--ink)]">{view.activity}</div>
                    </div>
                    <div className="rounded-lg border border-[var(--hairline)] bg-[#0d0617] p-4">
                      <div className="text-xs text-[var(--muted-ink)]">Recommended next step</div>
                      <div className="mt-2 text-sm text-[var(--ink)]">{view.next}</div>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-[var(--hairline)] bg-[#0d0617] p-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-ink)]">
                      <Tags className="h-3.5 w-3.5 text-[var(--gold)]" />
                      Segment
                    </div>
                    <div className="mt-2 text-sm text-[var(--ink)]">{view.segment}</div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-[var(--muted-ink)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--gold)]" />
                    Actions remain configurable and reviewable by your team.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {crmDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.1 + index * 0.04}>
                  <article className="zk-card h-full p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--brand-soft)]">
                        <Icon className="h-4 w-4 text-[var(--gold)]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--heading)]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-ink)]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[var(--muted-ink)]">
          CRM availability depends on plan and integration scope. Clinical and lab
          workflows should be configured around your privacy, consent, and compliance
          requirements.
        </p>
      </div>
    </section>
  );
}
