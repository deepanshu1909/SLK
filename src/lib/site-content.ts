import { agents, pricingTiers } from "@/lib/mock-data";

export const CONTACT_EMAIL = "ceo@zarklo.com";
export const STARTING_PRICE_USD = pricingTiers[0].monthly;
/** Display-only INR floor for Indian visitors; mirrors Starter USD list price. */
export const STARTING_PRICE_INR = 9999;

export const trustBadges = [
  "No long-term contract",
  "No setup fee",
  "Cancel anytime",
] as const;

export const teamMembers = [
  {
    name: "ZarkloAI founding team",
    role: "Product & customer success",
    bio: "We set up and run growth systems for salons, clinics, and labs — so owners aren’t left managing another dashboard alone. Photos and individual bios will be published as the Founding Partner cohort goes live.",
    initials: "ZK",
  },
] as const;

export type VerticalPageKey = "salons" | "clinics" | "pathology-labs";

export const verticalPages: Record<
  VerticalPageKey,
  {
    path: string;
    name: string;
    shortName: string;
    metaTitle: string;
    metaDesc: string;
    hero: string;
    sub: string;
    pains: { title: string; text: string }[];
    outcomes: string[];
    searchExamples: string[];
    softCta: string;
  }
> = {
  salons: {
    path: "/salons",
    name: "Salons & Spas",
    shortName: "salon",
    metaTitle: "ZarkloAI for Salons & Spas — AI growth for bookings & rebooking",
    metaDesc:
      "Grow salon and spa bookings with local visibility, instant inquiry response, and rebooking follow-ups — alongside your existing booking software.",
    hero: "Fill more chairs — without adding front-desk hours.",
    sub: "ZarkloAI is designed to help salons and spas show up in local search, catch missed inquiries, reduce no-shows, and bring clients back before they book elsewhere.",
    pains: [
      {
        title: "Missed calls empty chairs",
        text: "When stylists are busy, new inquiries go to voicemail — and many never call back.",
      },
      {
        title: "No-shows and last-minute gaps",
        text: "Empty slots cost revenue even when demand exists elsewhere in the week.",
      },
      {
        title: "Clients quietly drift away",
        text: "Colour and cut cycles get forgotten without a calm rebooking nudge.",
      },
    ],
    outcomes: [
      "Stronger local visibility for salon and spa searches",
      "Faster response when someone asks to book",
      "Rebooking and review follow-ups after a good visit",
    ],
    searchExamples: ["hair salon near me", "balayage near me", "spa near me"],
    softCta: "See a free growth estimate for your salon",
  },
  clinics: {
    path: "/clinics",
    name: "Clinics",
    shortName: "clinic",
    metaTitle: "ZarkloAI for Clinics — fewer no-shows, faster patient response",
    metaDesc:
      "Help your clinic respond to inquiries faster, reduce empty appointment slots, and keep patients in the care cycle — alongside your EMR or booking tools.",
    hero: "More confirmed appointments. Fewer empty slots.",
    sub: "ZarkloAI is designed for clinics that need faster inquiry response, clearer confirmation, and recall follow-ups — without replacing the systems you already use for care.",
    pains: [
      {
        title: "Inquiries go cold",
        text: "When the front desk is full, new patient messages wait — and competitors answer first.",
      },
      {
        title: "No-shows waste booked time",
        text: "Unconfirmed appointments turn into empty chairs and delayed care.",
      },
      {
        title: "Recall falls through",
        text: "Follow-up visits and care plans stall without a consistent outreach rhythm.",
      },
    ],
    outcomes: [
      "Faster response to new patient inquiries",
      "Confirmation and reminder workflows that reduce empty slots",
      "Recall and follow-up nudges that keep patients in care",
    ],
    searchExamples: ["clinic near me", "dermatologist near me", "dentist near me"],
    softCta: "See a free growth estimate for your clinic",
  },
  "pathology-labs": {
    path: "/pathology-labs",
    name: "Pathology Labs",
    shortName: "lab",
    metaTitle: "ZarkloAI for Pathology Labs — report follow-up & repeat bookings",
    metaDesc:
      "Improve report-delivery follow-up, repeat-test bookings, and referral retention for diagnostic labs — alongside your LIMS and booking tools.",
    hero: "Reports delivered. Patients retained. Referrals protected.",
    sub: "ZarkloAI is built to help pathology and diagnostic labs follow up after reports, book repeat tests, and keep referring clinics close — without ripping out your LIMS.",
    pains: [
      {
        title: "Reports sit unread",
        text: "Patients don’t always open results — and questions pile up without a clear next step.",
      },
      {
        title: "Repeat tests get delayed",
        text: "Follow-up panels and monitoring tests slip when no one nudges at the right time.",
      },
      {
        title: "Referrals drift",
        text: "Clinics send samples to whoever communicates fastest and most clearly.",
      },
    ],
    outcomes: [
      "Report-ready follow-up that keeps patients informed",
      "Repeat-test booking nudges timed to clinical cycles",
      "Referral retention support alongside your existing lab systems",
    ],
    searchExamples: ["pathology lab near me", "blood test near me", "diagnostic lab near me"],
    softCta: "See a free growth estimate for your lab",
  },
};

export const blogPosts = [
  {
    slug: "rank-higher-for-service-near-me",
    title: "How to rank higher for “[service] near me” on Google",
    excerpt:
      "A practical checklist for salons, clinics, and labs: profile completeness, reviews, categories, and consistency — without buying fake links.",
    vertical: "All verticals",
    readMins: 7,
    date: "2026-08-01",
  },
  {
    slug: "reducing-clinic-no-shows",
    title: "Reducing no-shows at your clinic",
    excerpt:
      "Why confirmations fail, which reminder timings usually help, and how to keep the tone clinical — not spammy.",
    vertical: "Clinics",
    readMins: 6,
    date: "2026-08-01",
  },
  {
    slug: "lab-patient-retention",
    title: "How diagnostic labs can improve patient retention",
    excerpt:
      "Report follow-up, repeat-test timing, and referral communication that keep patients and clinics coming back.",
    vertical: "Pathology Labs",
    readMins: 6,
    date: "2026-08-01",
  },
  {
    slug: "salon-rebooking-without-pressure",
    title: "Salon rebooking that feels helpful, not pushy",
    excerpt:
      "How to time colour and cut reminders, what to say after a great visit, and when to ask for a review.",
    vertical: "Salons & Spas",
    readMins: 5,
    date: "2026-08-01",
  },
] as const;

export function estimateGrowth(input: {
  vertical: "salon" | "clinic" | "lab";
  monthlyBookings: number;
}) {
  const { vertical, monthlyBookings } = input;
  const safe = Math.max(0, Math.min(monthlyBookings || 0, 5000));

  // Conservative illustrative ranges — labeled as estimates, not guarantees.
  const rates =
    vertical === "salon"
      ? { low: 0.08, high: 0.18 }
      : vertical === "clinic"
        ? { low: 0.07, high: 0.16 }
        : { low: 0.06, high: 0.15 };

  const low = Math.max(2, Math.round(safe * rates.low));
  const high = Math.max(low + 2, Math.round(safe * rates.high));

  return {
    additionalLow: low,
    additionalHigh: high,
    projectedLow: safe + low,
    projectedHigh: safe + high,
    note: "Illustrative estimate based on your inputs and typical local-growth levers (visibility + response speed + follow-up). Not a guarantee.",
  };
}

export function simulateRanking(input: {
  businessName: string;
  service: string;
  location: string;
}) {
  const seed = `${input.businessName}|${input.service}|${input.location}`
    .toLowerCase()
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const band = seed % 5;
  const position =
    band === 0 ? "Not clearly visible in the top local results" :
    band === 1 ? "Roughly positions 11–20 (below the map pack)" :
    band === 2 ? "Around positions 7–10" :
    band === 3 ? "Around positions 4–6" :
    "Possibly in or near the top 3 map results";

  return {
    query: `${input.service} near ${input.location}`,
    position,
    confidence: "Illustrative snapshot for demo purposes — not a live Google scrape.",
    nextSteps: [
      "Confirm Google Business Profile categories and services match how people search",
      "Check name/address/phone consistency across listings",
      "Review response speed on new inquiries from Maps and your website",
    ],
  };
}

export const chatReplies: { match: RegExp; reply: string }[] = [
  {
    match: /price|pricing|cost|plan|₹|\$|rupee/i,
    reply: `Plans start at $${STARTING_PRICE_USD}/mo (Starter). Growth adds retention automation; Advanced adds full CRM. Monthly plans can be canceled anytime — no long-term contract and no setup fee. Want a Success Demo walkthrough?`,
  },
  {
    match: /salon|spa|chair|hair/i,
    reply:
      "For salons & spas we focus on local visibility, catching missed inquiries, and rebooking after cuts/colour. Explore /salons or try the Growth Calculator for a free estimate.",
  },
  {
    match: /clinic|patient|no-?show|doctor/i,
    reply:
      "For clinics we help with faster inquiry response, confirmation reminders, and recall follow-ups — alongside your existing booking/EMR tools. See /clinics or run a growth estimate.",
  },
  {
    match: /lab|patholog|diagnos|report|blood/i,
    reply:
      "For pathology labs we support report follow-up, repeat-test booking, and referral retention next to your LIMS. Visit /pathology-labs or check your ranking for a local lab query.",
  },
  {
    match: /crm|demo|success/i,
    reply:
      "Open the Success Demo at /dashboard to explore Analytics, CRM, bookings, and agents — or email ceo@zarklo.com.",
  },
  {
    match: /contract|cancel|setup fee|fee/i,
    reply:
      "No long-term contract, no setup fee, cancel anytime on monthly plans. Ask us about yearly pause options if you need flexibility.",
  },
  {
    match: /replace|emr|lims|booking software|vagaro|fresha/i,
    reply:
      "ZarkloAI is designed to work alongside booking, EMR, and LIMS systems — not rip them out. We connect into your calendar and profiles where available.",
  },
];

export function replyAsZarkloAgent(message: string): string {
  const hit = chatReplies.find((r) => r.match.test(message));
  if (hit) return hit.reply;
  return `I can help with Discovery, Conversion, Retention, pricing, or which vertical page fits you (salons, clinics, labs). Plans start at $${STARTING_PRICE_USD}/mo. Ask about pricing, no-shows, ranking, or CRM — or email ${CONTACT_EMAIL}.`;
}

export { agents };
