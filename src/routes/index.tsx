import { useEffect } from "react";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof, TestimonialsSection } from "@/components/landing/Testimonials";
import { VerticalsSection } from "@/components/landing/VerticalsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { FAQ } from "@/components/landing/FAQ";
import { CTA, Footer } from "@/components/landing/CTA";

const PAGE_TITLE = "ZarkloAI — AI growth for salons, clinics & path labs";
const PAGE_DESC =
  "Autonomous AI agents for salons, clinics, and pathology labs. More appointments, better SEO, higher retention — on autopilot.";

export default function Index() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    document.querySelector("meta[name='description']")?.setAttribute("content", PAGE_DESC);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <SocialProof />
      <VerticalsSection />
      <ServicesSection />
      <AgentsSection />
      <TestimonialsSection />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
