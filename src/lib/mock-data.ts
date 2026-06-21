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
  { id: "1", client: "Ava Mitchell", service: "Balayage + Cut", time: "10:00 AM", staff: "Lena", status: "confirmed" },
  { id: "2", client: "Noah Bennett", service: "Beard Sculpt", time: "11:30 AM", staff: "Marco", status: "confirmed" },
  { id: "3", client: "Sofia Reyes", service: "Hydrafacial", time: "1:15 PM", staff: "Iris", status: "pending" },
  { id: "4", client: "Liam Chen", service: "Hot Towel Shave", time: "2:45 PM", staff: "Marco", status: "confirmed" },
  { id: "5", client: "Emma Park", service: "Lash Lift", time: "4:00 PM", staff: "Iris", status: "confirmed" },
];

export const conversations = [
  { id: "1", name: "Ava Mitchell", last: "Perfect — see you Saturday!", time: "2m", unread: 0 },
  { id: "2", name: "Noah Bennett", last: "Can I move my appointment?", time: "12m", unread: 2 },
  { id: "3", name: "Sofia Reyes", last: "Do you offer gift cards?", time: "1h", unread: 1 },
  { id: "4", name: "Liam Chen", last: "Thanks for the reminder", time: "3h", unread: 0 },
];

export const aiInsights = [
  { title: "Repeat clients up 18%", body: "Loyalty Agent's birthday campaign drove 42 rebookings this month.", tag: "Loyalty" },
  { title: "Rank #2 for 'salon near me'", body: "Discovery Agent published 4 SEO posts. CTR up 26%.", tag: "Discovery" },
  { title: "Saturdays are 92% booked", body: "Suggest adding a stylist or extending hours.", tag: "Bookings" },
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
  { id: "1", author: "Ava M.", stars: 5, body: "Best balayage I've ever had. The AI reminders made rebooking so easy.", platform: "Google" },
  { id: "2", author: "Noah B.", stars: 5, body: "The team remembers everything about my cut. Feels concierge.", platform: "Google" },
  { id: "3", author: "Sofia R.", stars: 4, body: "Loved the hydrafacial. Booking flow was instant.", platform: "Yelp" },
];

export const testimonials = [
  { quote: "We went from fully manual scheduling to a 6-figure month in 90 days. ZarkloAI runs the back office.", author: "Camille Vasquez", role: "Owner, Maison Lumière Salon", growth: "+312% bookings" },
  { quote: "The Discovery Agent put us at the top of Google for our city. Walk-ins doubled.", author: "Marcus Cole", role: "Founder, Cole & Co. Barber", growth: "+1,840 profile views" },
  { quote: "Our retention used to be 41%. After ZarkloAI's loyalty agent, we're sitting at 87%.", author: "Priya Anand", role: "Director, Lotus Spa & Wellness", growth: "87% retention" },
];

export const services = [
  { key: "guaranteed-bookings", name: "Guaranteed bookings", desc: "100% more bookings. Guaranteed.", icon: "ShieldCheck" },
  { key: "ai-agents", name: "AI Agents", desc: "Works 24/7 to get you customers on autopilot.", icon: "Bot" },
  { key: "local-domination", name: "Local Domination", desc: "Show up first when customers search locally.", icon: "MapPin" },
  { key: "booking-machine", name: "Booking Machine", desc: "Turn your website into a 24/7 booking engine.", icon: "Calendar" },
] as const;

export const agents = [
  { key: "discovery", name: "Discovery Agent", desc: "For guaranteed ranking and bookings.", metric: "Guaranteed visibility", icon: "Sparkles" },
  { key: "loyalty", name: "Loyalty Agent", desc: "Bring happy clients back again and again.", metric: "Higher retention", icon: "Heart" },
  { key: "win", name: "Win Agent", desc: "Turn every enquiry into a confirmed appointment.", metric: "More confirmed bookings", icon: "Target" },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    monthly: 120,
    yearly: 104,
    blurb: "For solo stylists and small chairs.",
    features: ["1 location", "Booking Agent", "Review Agent", "Up to 500 clients", "Email support"],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Growth",
    monthly: 199,
    yearly: 159,
    blurb: "For salons ready to scale.",
    features: ["3 locations", "All 3 AI Agents", "SEO + Social Agent", "Up to 5,000 clients", "Priority support", "Custom integrations"],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: 499,
    yearly: 399,
    blurb: "For multi-location groups.",
    features: ["Unlimited locations", "Dedicated AI training", "Multi-brand dashboards", "Unlimited clients", "Dedicated CSM", "API access"],
    cta: "Talk to sales",
    popular: false,
  },
];

export const faqs = [
  { q: "How long until I see results?", a: "Most salons see a 20–40% lift in bookings within the first 30 days as the Discovery and Booking agents go live." },
  { q: "Do I need to change my booking system?", a: "No. ZarkloAI integrates with Square, Vagaro, Booksy, Fresha, and Google Calendar out of the box." },
  { q: "Will the AI sound like a robot to my clients?", a: "We train each agent on your brand voice, services, and past conversations. Clients consistently can't tell." },
  { q: "Is my client data safe?", a: "Yes. Bank-grade encryption, SOC 2 in progress, and zero data sold or shared. Ever." },
  { q: "Can I cancel anytime?", a: "Yes — monthly plans cancel anytime, no contracts. Yearly plans can be paused." },
];
