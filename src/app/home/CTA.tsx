"use client";

import Link from "next/link";
import { FadeIn } from "components/animations/FadeIn";
import SpotlightCard from "./SpotlightCard"; // ✅ Make sure this path is correct

export const CTA = () => {
  const translate = (key: string): string => {
    const translations: Record<string, string> = {
      title: "Ready to Create Your Resume?",
      subtitle: "Easily create, edit and download beautiful professional resumes to improve your job application success rate",
      button: "Get Started",
    };

    return translations[key] || key;
  };

  return (
    <section className="mx-auto mt-10 max-w-3xl px-4 pb-8 sm:px-6 sm:pb-8">
      <FadeIn direction="up">
        <SpotlightCard
          className="rounded-2xl border border-white/20 bg-white/10 px-6 py-10 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          spotlightColor="rgba(255, 255, 255, 0.2)" // 💡 Custom color
        >
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              {translate("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:mt-6 sm:text-lg">
              {translate("subtitle")}
            </p>
            <div className="mt-8 flex justify-center sm:mt-10">
              <Link
                href="/resume-builder"
                className="inline-block rounded-full bg-white px-6 py-2.5 text-base font-medium text-sky-700 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-lg sm:px-8 sm:py-3 sm:text-lg"
              >
                {translate("button")}
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </FadeIn>
    </section>
  );
};
