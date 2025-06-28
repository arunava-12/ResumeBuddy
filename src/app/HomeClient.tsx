// src/app/HomeClient.tsx
"use client";

import { Hero } from "home/Hero";
import { Features } from "home/Features";
import { FAQ } from "home/FAQ";
import { CTA } from "home/CTA";
import Aurora from "./Aurora"; // or "@/components/Aurora"

export default function HomeClient() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Aurora
          colorStops={["#3300FF", "#00FF2A", "#FEA00"]}
          blend={1.0}
          amplitude={0.6}
          speed={0.5}
        />
      </div>

      {/* ✅ Padding added here to avoid overlap with fixed TopNavBar */}
      <main className="relative z-10 pt-[var(--top-nav-bar-height)]">
        <Hero />
        <Features />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
}
