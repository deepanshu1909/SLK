import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LandingNav } from "@/components/landing/LandingNav";
import { Footer } from "@/components/landing/CTA";
import { SiteChatWidget } from "@/components/landing/SiteChatWidget";
import { blogPosts } from "@/lib/site-content";
import { ArrowRight } from "lucide-react";

const bodies: Record<string, string[]> = {
  "rank-higher-for-service-near-me": [
    "Local pack rankings are driven less by “SEO tricks” and more by clarity: the right categories, complete services, consistent name/address/phone, and reviews that mention what people actually search for.",
    "Start with your Google Business Profile. Confirm primary and secondary categories match how customers phrase demand — “hair salon,” “dermatologist,” “pathology lab,” not internal brand jargon.",
    "Then fix consistency. If your Maps listing, website footer, and directories disagree on phone or address, Google trusts you less. Photos, hours, and weekly posts help, but they don’t replace accuracy.",
    "Reviews matter most when they’re recent and specific. After a good visit or clear report delivery, ask once — calmly. Reply to every review; it signals you’re active.",
    "Finally, speed-to-lead. Ranking gets the click; response gets the booking. Pair Discovery work with Conversion so inquiries don’t go cold while you’re with a client or patient.",
  ],
  "reducing-clinic-no-shows": [
    "No-shows are rarely just “patients being careless.” They’re often confirmation gaps, unclear instructions, transport friction, or reminders that arrive at the wrong time.",
    "Send a confirmation when the appointment is booked, then a reminder 24–48 hours out, and a same-day nudge if that fits your practice. Keep language clinical and respectful — short, clear, one action.",
    "Offer an easy reschedule path. Blocking cancellations without a next step often creates silent no-shows. A simple “need to move this?” link protects both sides.",
    "Watch which appointment types no-show most. First visits and long procedures usually need more context in the reminder than routine follow-ups.",
    "Zarklo’s Conversion and Retention modules are designed to help with these rhythms alongside your existing booking or EMR tools — not replace them.",
  ],
  "lab-patient-retention": [
    "Lab retention is different from salon rebooking. Patients often return for timed panels, monitoring, or physician-ordered follow-ups — and referring clinics care about communication quality.",
    "When a report is ready, make the next step obvious: open results, ask a question, or book a repeat draw. Silence after delivery is where patients and referrals drift.",
    "Segment by test type and interval. Thyroid follow-ups and chronic monitoring have different cadences than one-off wellness panels. Generic blasts feel spammy; timed nudges feel useful.",
    "Protect referral relationships with clear status updates and predictable turnaround communication. Clinics send volume to labs that reduce their admin load.",
    "Zarklo is built to sit beside LIMS and collection booking — focusing on follow-up and retention, not ripping out your lab stack.",
  ],
  "salon-rebooking-without-pressure": [
    "The best rebooking message feels like a helpful reminder of a cycle the client already chose — not a sales pitch. Colour and cut intervals are predictable; use that.",
    "Time the nudge a few days before the typical revisit window. Mention the last service lightly (“your balayage is usually ready around now”) and offer two concrete slots if you can.",
    "Ask for reviews only after a clearly good visit, once. Stacking review requests with hard sells trains clients to ignore you.",
    "If someone goes quiet, one soft check-in beats three aggressive ones. Preserve the relationship; volume comes back when trust stays intact.",
    "When you’re ready, try Zarklo’s Growth Calculator for a free estimate, or open the Success Demo to see how Retention workflows look in practice.",
  ],
};

export default function ResourceArticlePage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const paragraphs = slug ? bodies[slug] : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Zarklo Resources`;
  }, [post]);

  if (!post || !paragraphs) {
    return (
      <div className="min-h-screen bg-[var(--background)] px-6 py-24 text-center">
        <h1 className="zk-h2">Article not found</h1>
        <Link to="/resources" className="zk-link-gold mt-4 inline-flex">
          Back to resources
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingNav />
      <article className="zk-container max-w-3xl pb-20 pt-28">
        <div className="zk-kicker mb-3">{post.vertical}</div>
        <h1 className="zk-h1 !text-[clamp(2rem,3vw,2.75rem)]">{post.title}</h1>
        <p className="mt-4 text-sm text-[var(--muted-ink)]">
          {post.readMins} min read · {post.date}
        </p>
        <p className="mt-6 text-lg text-[var(--muted-ink)]">{post.excerpt}</p>
        <div className="mt-10 space-y-5">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed text-[var(--ink)]">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-[var(--hairline)] bg-[var(--card)] p-6">
          <h2 className="zk-h3">Want this applied to your business?</h2>
          <p className="mt-2 text-sm text-[var(--muted-ink)]">
            Get a free growth estimate or open the Success Demo — no long-term contract.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link to="/#growth-calculator" className="zk-btn-primary">
              See your free growth estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/success-demo" className="zk-btn-secondary">
              Open Success Demo
            </Link>
          </div>
        </div>
      </article>
      <Footer />
      <SiteChatWidget />
    </div>
  );
}

export function ResourcesIndexPage() {
  useEffect(() => {
    document.title = "Resources — Zarklo";
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingNav />
      <section className="zk-container pb-20 pt-28">
        <div className="zk-kicker mb-4">Resources</div>
        <h1 className="zk-h1 !text-[clamp(2rem,3vw,2.75rem)]">Guides for salons, clinics & labs</h1>
        <p className="mt-4 max-w-2xl zk-muted">
          Practical articles on local ranking, no-shows, and retention — written for owners,
          not generic SaaS readers.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/resources/${post.slug}`}
              className="zk-card-white p-6 transition hover:border-[var(--gold)]"
            >
              <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--gold)]">
                {post.vertical}
              </div>
              <h2 className="mt-3 text-xl text-[var(--heading)]">{post.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted-ink)]">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
      <SiteChatWidget />
    </div>
  );
}
