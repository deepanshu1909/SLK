export const verticals = [
  {
    key: "salons",
    name: "Salons",
    headline: "Fill every chair",
    desc: "AI agents that rank you on Google, book appointments 24/7, and bring clients back before they drift to a competitor.",
    features: ["24/7 booking & rebooking", "Local SEO for 'salon near me'", "Review & loyalty campaigns"],
    icon: "Scissors",
    accent: "from-rose-500/25 via-fuchsia-500/15 to-transparent",
    border: "group-hover:border-rose-400/40",
  },
  {
    key: "clinics",
    name: "Clinics",
    headline: "More patients, fewer no-shows",
    desc: "Automate appointment reminders, follow-ups, and discovery so your practice stays full — without adding front-desk headcount.",
    features: ["Patient intake & reminders", "Google Maps & health SEO", "Recall & care campaigns"],
    icon: "Stethoscope",
    accent: "from-sky-500/25 via-cyan-500/15 to-transparent",
    border: "group-hover:border-sky-400/40",
  },
  {
    key: "path-labs",
    name: "Path Labs",
    headline: "Book collections. Deliver reports.",
    desc: "Home sample pickups, test bookings, and report notifications on autopilot — so patients choose you over the lab down the street.",
    features: ["Home collection booking", "Report-ready SMS alerts", "Diagnostic SEO & listings"],
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

export const testimonials = [
  { quote: "We went from manual scheduling to a 6-figure month in 90 days. ZarkloAI runs the back office.", author: "Camille Vasquez", role: "Owner, Maison Lumière Salon", growth: "+312% bookings" },
  { quote: "Patient no-shows dropped 40%. The Win Agent fills our calendar while we focus on care.", author: "Dr. Ananya Mehta", role: "Director, Northside Family Clinic", growth: "−40% no-shows" },
  { quote: "Home collections doubled after ZarkloAI ranked us for 'blood test near me'. Game changer.", author: "Vikram Shah", role: "Founder, PrecisionPath Labs", growth: "+2× collections" },
];

export const services = [
  { key: "guaranteed-bookings", name: "Guaranteed appointments", desc: "More bookings across salons, clinics, and path labs — with AI that never sleeps.", icon: "ShieldCheck" },
  { key: "ai-agents", name: "AI Agents", desc: "Discovery, loyalty, and conversion — three specialists working 24/7 for your business.", icon: "Bot" },
  { key: "local-domination", name: "Local Domination", desc: "Own the map pack when patients and clients search for services near them.", icon: "MapPin" },
  { key: "booking-machine", name: "Booking Machine", desc: "Turn your website into a 24/7 engine for cuts, consults, and lab collections.", icon: "Calendar" },
] as const;

export const agents = [
  { key: "discovery", name: "Discovery Agent", desc: "Ranks you on Google for 'salon near me', 'clinic near me', and 'blood test near me'.", metric: "Guaranteed visibility", icon: "Sparkles" },
  { key: "loyalty", name: "Loyalty Agent", desc: "Brings clients, patients, and test-takers back with smart recall and follow-ups.", metric: "Higher retention", icon: "Heart" },
  { key: "win", name: "Win Agent", desc: "Turns every enquiry into a confirmed appointment, consult, or collection slot.", metric: "More confirmed bookings", icon: "Target" },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    monthly: 120,
    yearly: 104,
    blurb: "For single-location salons, clinics, or labs.",
    features: ["1 location", "Booking Agent", "Review Agent", "Up to 500 clients", "Email support"],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    monthly: 199,
    yearly: 159,
    blurb: "For growing practices and multi-service businesses.",
    features: ["3 locations", "All 3 AI Agents", "SEO + Social Agent", "Up to 5,000 clients", "Priority support", "Custom integrations"],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 499,
    yearly: 399,
    blurb: "For multi-location groups and diagnostic chains.",
    features: ["Unlimited locations", "Dedicated AI training", "Multi-brand dashboards", "Unlimited clients", "Dedicated CSM", "API access"],
    cta: "Talk to sales",
    popular: false,
  },
];

export const faqs = [
  { q: "Does ZarkloAI work for salons, clinics, and path labs?", a: "Yes. ZarkloAI is built for all three. Each vertical gets tailored booking flows, SEO keywords, and agent training — whether you're filling chairs, patient slots, or home collection windows." },
  { q: "How long until I see results?", a: "Most businesses see a 20–40% lift in appointments within the first 30 days as the Discovery and Win agents go live." },
  { q: "Do I need to change my booking system?", a: "No. ZarkloAI integrates with Square, Vagaro, Practo, Cliniko, Fresha, Google Calendar, and custom lab booking systems out of the box." },
  { q: "Will the AI sound robotic to my clients?", a: "We train each agent on your brand voice, services, and past conversations. Patients and clients consistently can't tell." },
  { q: "Is my data safe?", a: "Yes. Bank-grade encryption, SOC 2 in progress, and zero data sold or shared. HIPAA-aware workflows for clinics and labs." },
  { q: "Can I cancel anytime?", a: "Yes — monthly plans cancel anytime, no contracts. Yearly plans can be paused." },
];

export const seoKeywords = [
  { kw: "clinic near me", rank: 2, change: "+5" },
  { kw: "salon near me", rank: 3, change: "+4" },
  { kw: "blood test at home", rank: 1, change: "+8" },
  { kw: "dermatologist [city]", rank: 4, change: "+3" },
  { kw: "pathology lab near me", rank: 2, change: "+6" },
];

export const partnerLogos = [
  "Maison Lumière",
  "Northside Clinic",
  "PrecisionPath",
  "Lotus Spa",
  "CareFirst MD",
  "Metro Diagnostics",
  "Bloom Beauty",
  "Halo Studio",
];
