import { useEffect } from "react";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof, TestimonialsSection } from "@/components/landing/Testimonials";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA, Footer } from "@/components/landing/CTA";

export default function Index() {
  useEffect(() => {
    document.title = "ZarkloAi — Hire an AI team that grows your salon";
    document.querySelector("meta[name='description']")?.setAttribute(
      "content",
      "Get more bookings, rank higher on Google, and turn one-time guests into regulars with autonomous AI agents built for salons, spas, and barbershops."
    );
  }, []);

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
