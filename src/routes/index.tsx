import { useEffect } from "react";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/Testimonials";
import { VerticalsSection } from "@/components/landing/VerticalsSection";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { CRMShowcaseSection } from "@/components/landing/CRMShowcaseSection";
import { GrowthCalculatorSection } from "@/components/landing/GrowthCalculatorSection";
import { RankingToolSection } from "@/components/landing/RankingToolSection";
import { Pricing } from "@/components/landing/Pricing";
import { TeamSection } from "@/components/landing/TeamSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { WhyZarkloSection } from "@/components/landing/WhyZarkloSection";
import { ResourcesTeaser } from "@/components/landing/ResourcesTeaser";
import { FAQ } from "@/components/landing/FAQ";
import { CTA, Footer } from "@/components/landing/CTA";
import { SiteChatWidget } from "@/components/landing/SiteChatWidget";
import { ExitIntentCTA } from "@/components/landing/ExitIntentCTA";

const PAGE_TITLE = "ZarkloAI — AI growth for salons, clinics & diagnostic labs";
const PAGE_DESC =
  "AI growth platform for salons & spas, clinics, and pathology labs. More bookings and appointments, stronger local search, higher retention.";

export default function Index() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    document.querySelector("meta[name='description']")?.setAttribute("content", PAGE_DESC);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <LandingNav />
      <Hero />
      <SocialProof />
      <VerticalsSection />
      <AgentsSection />
      <CRMShowcaseSection />
      <GrowthCalculatorSection />
      <RankingToolSection />
      <Pricing />
      <TeamSection />
      <HowItWorksSection />
      <WhyZarkloSection />
      <ResourcesTeaser />
      <FAQ />
      <CTA />
      <Footer />
      <SiteChatWidget />
      <ExitIntentCTA />
    </div>
  );
}
