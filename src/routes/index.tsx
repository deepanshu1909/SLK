import { createFileRoute } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof, TestimonialsSection } from "@/components/landing/Testimonials";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA, Footer } from "@/components/landing/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SLK — Hire an AI team that grows your salon" },
      { name: "description", content: "Get more bookings, rank higher on Google, and turn one-time guests into regulars with autonomous AI agents built for salons, spas, and barbershops." },
      { property: "og:title", content: "SLK — Hire an AI team that grows your salon" },
      { property: "og:description", content: "Autonomous AI agents for salons, spas, and barbershops. More bookings, better SEO, higher retention." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <SocialProof />
      <section id="features" />
      <AgentsSection />
      <TestimonialsSection />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
