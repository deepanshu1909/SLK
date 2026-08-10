export const verticals = [
  {
    key: "salons",
    name: "Salons & Spas",
    headline: "Missed calls empty chairs",
    desc: "Missed calls and no-shows quietly empty chairs. ZarkloAI is built to help you show up in local search, answer new inquiries when you can’t, capture bookings, and nudge clients back before they book elsewhere.",
    features: ["Catch inquiries when you’re busy", "Local search for salon & spa services", "Rebooking & no-show follow-up"],
    icon: "Scissors",
    accent: "from-rose-500/25 via-fuchsia-500/15 to-transparent",
    border: "group-hover:border-rose-400/40",
  },
  {
    key: "clinics",
    name: "Clinics",
    headline: "Inquiries go cold. Slots go empty.",
    desc: "Patient inquiries go cold when the front desk is full — and no-shows waste slots you already filled. ZarkloAI is designed to respond faster, confirm appointments, reduce empty chairs, and keep patients in your care cycle.",
    features: ["Faster patient inquiry response", "Appointment confirmation & no-show reduction", "Recall & care follow-ups"],
    icon: "Stethoscope",
    accent: "from-sky-500/25 via-cyan-500/15 to-transparent",
    border: "group-hover:border-sky-400/40",
  },
  {
    key: "path-labs",
    name: "Pathology Labs",
    headline: "Reports unread. Referrals drift.",
    desc: "Reports sit unread, repeat tests get delayed, and referring clinics drift to whoever follows up first. ZarkloAI is built to help with report-delivery follow-up, repeat-test booking, and referral retention — alongside the systems you already use.",
    features: ["Report-delivery follow-up", "Repeat-test booking nudges", "Referral retention"],
    icon: "FlaskConical",
    accent: "from-emerald-500/25 via-teal-500/15 to-transparent",
    border: "group-hover:border-emerald-400/40",
  },
] as const;

export const revenueData = [
  { month: "Jan", revenue: 18400, bookings: 142 },
  { month: "Feb", revenue: 22100, bookings: 168 },
  { month: "Mar", revenue: 28900, bookings: 201 },
  { month: "Apr", revenue: 34200, bookings: 240 },
  { month: "May", revenue: 41800, bookings: 287 },
  { month: "Jun", revenue: 52400, bookings: 341 },
  { month: "Jul", revenue: 61200, bookings: 392 },
  { month: "Aug", revenue: 68900, bookings: 428 },
];

export const trafficData = [
  { day: "Mon", views: 1240, clicks: 312 },
  { day: "Tue", views: 1480, clicks: 398 },
  { day: "Wed", views: 1820, clicks: 504 },
  { day: "Thu", views: 2140, clicks: 612 },
  { day: "Fri", views: 2680, clicks: 798 },
  { day: "Sat", views: 3120, clicks: 924 },
  { day: "Sun", views: 2840, clicks: 812 },
];

export const funnelData = [
  { stage: "Discovery", value: 4200 },
  { stage: "Engaged", value: 2100 },
  { stage: "Booked", value: 980 },
  { stage: "Returned", value: 612 },
];

export const upcomingAppointments = [
  { id: "1", client: "Ava Mitchell", service: "Balayage + Cut", time: "10:00 AM", staff: "Lena", status: "confirmed", vertical: "Salon" },
  { id: "2", client: "Raj Patel", service: "General Consultation", time: "11:30 AM", staff: "Dr. Mehta", status: "confirmed", vertical: "Clinic" },
  { id: "3", client: "Sofia Reyes", service: "CBC + Lipid Panel", time: "1:15 PM", staff: "Home visit", status: "pending", vertical: "Path Lab" },
  { id: "4", client: "Liam Chen", service: "Skin Check-up", time: "2:45 PM", staff: "Dr. Rao", status: "confirmed", vertical: "Clinic" },
  { id: "5", client: "Emma Park", service: "Thyroid Profile", time: "4:00 PM", staff: "Lab pickup", status: "confirmed", vertical: "Path Lab" },
];

export const conversations = [
  { id: "1", name: "Ava Mitchell", last: "Perfect — see you Saturday!", time: "2m", unread: 0 },
  { id: "2", name: "Raj Patel", last: "Can I reschedule my consult?", time: "12m", unread: 2 },
  { id: "3", name: "Sofia Reyes", last: "Is the report ready?", time: "1h", unread: 1 },
  { id: "4", name: "Liam Chen", last: "Thanks for the reminder", time: "3h", unread: 0 },
];

export const aiInsights = [
  { title: "Repeat visits up 18%", body: "Loyalty Agent's recall campaign drove 42 rebookings across salon & clinic this month.", tag: "Loyalty" },
  { title: "Rank #2 for 'clinic near me'", body: "Discovery Agent published 4 SEO posts. Profile clicks up 26%.", tag: "Discovery" },
  { title: "Saturday slots 92% full", body: "Suggest opening two evening lab collection windows on Thursday.", tag: "Bookings" },
];

export const leads = [
  { id: "1", name: "Maya Johnson", source: "Instagram", score: 92, stage: "Hot", value: "$480" },
  { id: "2", name: "Daniel Park", source: "Google", score: 78, stage: "Warm", value: "$220" },
  { id: "3", name: "Zoe Tan", source: "Referral", score: 88, stage: "Hot", value: "$640" },
  { id: "4", name: "Eli Martinez", source: "Walk-in", score: 64, stage: "Warm", value: "$180" },
  { id: "5", name: "Aria Singh", source: "TikTok", score: 71, stage: "New", value: "$300" },
  { id: "6", name: "Owen Reed", source: "Google", score: 55, stage: "New", value: "$120" },
];

export const reviews = [
  { id: "1", author: "Ava M.", stars: 5, body: "Booked my haircut in seconds. The reminders made rebooking effortless.", platform: "Google" },
  { id: "2", author: "Raj P.", stars: 5, body: "Clinic follow-ups feel personal. No more missed appointments.", platform: "Google" },
  { id: "3", author: "Sofia R.", stars: 4, body: "Home sample pickup was on time. Got my report the same evening.", platform: "Yelp" },
];

export const caseStudies = [
  {
    name: "[Business name]",
    location: "[City]",
    vertical: "Salon / Spa",
    result: "Fewer missed inquiries, steadier weekday bookings",
    href: "#",
  },
  {
    name: "[Business name]",
    location: "[City]",
    vertical: "Clinic",
    result: "Faster inquiry response, fewer empty appointment slots",
    href: "#",
  },
  {
    name: "[Business name]",
    location: "[City]",
    vertical: "Pathology Lab",
    result: "Stronger report follow-up and repeat-test bookings",
    href: "#",
  },
] as const;

/** @deprecated Use caseStudies — kept for any leftover imports */
export const testimonials = caseStudies.map((c) => ({
  quote: c.result,
  author: c.name,
  role: `${c.vertical} · ${c.location}`,
  growth: "Founding Partner",
}));

export const howItWorksSteps = [
  {
    step: 1,
    title: "Connect your profile & calendar",
    desc: "Link your Google Business Profile (or equivalent), calendar, and existing booking, practice, or lab tools where available.",
  },
  {
    step: 2,
    title: "ZarkloAI goes live",
    desc: "Discovery, Conversion, and (on Growth+) Retention start running for your vertical.",
  },
  {
    step: 3,
    title: "You get bookings and appointments",
    desc: "Inquiries get answered, slots get filled, follow-ups go out as configured.",
  },
  {
    step: 4,
    title: "You review results",
    desc: "See what’s working — visibility, conversions, rebooks — and adjust with us.",
  },
] as const;

export const comparisonRows = [
  {
    label: "Focus",
    zarklo: "Growth across discovery, conversion, and retention",
    booking: "Scheduling and payments",
    manual: "Staff time and memory",
  },
  {
    label: "Vertical fit",
    zarklo: "Salons & spas, clinics, and pathology labs",
    booking: "One-size-fits-most",
    manual: "Whatever someone remembers to do",
  },
  {
    label: "Works with existing tools",
    zarklo: "Built to sit alongside booking, EMR, and LIMS systems",
    booking: "Often is the booking system",
    manual: "N/A",
  },
  {
    label: "CRM",
    zarklo: "Included on Advanced — records, history, comms log, segmentation",
    booking: "Limited or add-on",
    manual: "Spreadsheets and inboxes",
  },
  {
    label: "Who runs it",
    zarklo: "End-to-end growth setup and operation",
    booking: "You configure the product",
    manual: "You do everything",
  },
  {
    label: "Local visibility",
    zarklo: "Core Discovery module",
    booking: "Rarely included",
    manual: "Ad hoc posts and hope",
  },
] as const;

export const agents = [
  {
    key: "discovery",
    name: "Discovery",
    desc: "Built to improve how you show up when people search nearby — “salon near me,” “clinic near me,” “blood test near me,” and related local terms. Profile clarity, listings hygiene, and ranking work so new clients and patients can find you.",
    metric: "Local SEO & visibility",
    details: [
      "Google Business Profile and listing consistency",
      "Local service and search-intent coverage",
      "Visibility reporting by location",
    ],
    icon: "Sparkles",
  },
  {
    key: "conversion",
    name: "Conversion",
    desc: "When someone inquires, speed matters. Instant responses and booking capture are designed to turn website, Maps, and message inquiries into confirmed appointments, consults, or collection slots — before they move on.",
    metric: "Lead response & booking capture",
    details: [
      "Immediate response to new inquiries",
      "Booking, consultation, or collection capture",
      "Configured handoff for questions that need staff",
    ],
    icon: "Target",
  },
  {
    key: "retention",
    name: "Retention",
    desc: "Rebooking and follow-up nudges, plus review requests after a good visit or report. Built to reduce silent churn: clients who forget, patients who skip recalls, and lab customers who don’t book the next test.",
    metric: "Rebooking & review requests",
    details: [
      "Rebooking and recall reminders",
      "Post-visit or report follow-up",
      "Review requests and inactive-customer segments",
    ],
    icon: "Heart",
  },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    monthly: 120,
    yearly: 104,
    blurb: "Discovery + Conversion for a single location.",
    features: [
      "Discovery module — core local SEO & visibility",
      "Conversion module — lead response & booking capture",
      "1 location",
      "Email support",
    ],
    note: null as string | null,
    cta: "Success Demo",
    popular: false,
  },
  {
    name: "Growth",
    monthly: 199,
    yearly: 159,
    blurb: "Adds Retention so growth compounds.",
    features: [
      "Everything in Starter",
      "Retention / rebooking automation",
      "Review request management",
      "Up to 3 locations",
      "Priority support",
    ],
    note: null as string | null,
    cta: "Success Demo",
    popular: true,
  },
  {
    name: "Advanced",
    monthly: 499,
    yearly: 399,
    blurb: "Full CRM + priority support for teams and multi-location.",
    features: [
      "Everything in Growth",
      "Full CRM — records, booking history, communication log, segmentation",
      "Multi-location support",
      "Priority support",
      "Dedicated success contact",
    ],
    note: "Best for businesses managing multiple staff or locations — or wanting a single system for client and patient relationships end to end.",
    cta: "Success Demo",
    popular: false,
  },
];

export const faqs = [
  {
    q: "What does ZarkloAI do?",
    a: "ZarkloAI is an AI growth platform for salons & spas, clinics, and pathology labs. It helps you get found locally, convert inquiries into bookings or appointments, and bring clients and patients back — with modules for Discovery, Conversion, and Retention.",
  },
  {
    q: "Do I need technical experience?",
    a: "No. You connect your profile and calendar; we help get the system live and keep it running. You review results — you don’t need to learn prompts or build automations yourself.",
  },
  {
    q: "Does the Advanced plan include CRM?",
    a: "Yes. Advanced includes a full CRM: centralized client/patient records, booking history, communication log, and segmentation for targeted campaigns — plus priority support and multi-location support where needed.",
  },
  {
    q: "How fast will I see results?",
    a: "It varies by vertical, market, and starting point. Visibility work and lead response can show movement in the first weeks; retention and ranking usually compound over time. We’ll share honest ranges once we have verified data from our Founding Partner cohort.",
  },
  {
    q: "Does it replace my existing booking, POS, EMR, or LIMS system?",
    a: "No. ZarkloAI is designed to work alongside the tools you already use for booking, practice management, or lab operations — not rip them out.",
  },
  {
    q: "Is there a contract?",
    a: "Monthly plans can be canceled anytime. Yearly plans are available at a lower monthly rate; ask us about pause or change options on a call.",
  },
];

export const seoKeywords = [
  { kw: "clinic near me", rank: 2, change: "+5" },
  { kw: "salon near me", rank: 3, change: "+4" },
  { kw: "blood test at home", rank: 1, change: "+8" },
  { kw: "dermatologist [city]", rank: 4, change: "+3" },
  { kw: "pathology lab near me", rank: 2, change: "+6" },
];

export const partnerLogos: string[] = [];
