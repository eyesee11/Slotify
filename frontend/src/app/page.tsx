"use client";
import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/Hero";
import { TabsSection } from "@/components/landing/TabsSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { FooterCTA } from "@/components/landing/FooterCTA";

export default function SlotifyLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200">
      <Navbar />
      <main>
        <HeroSection />
        <TabsSection />
        <StepsSection />
        <IntegrationsSection />
      </main>
      <FooterCTA />
    </div>
  );
}
