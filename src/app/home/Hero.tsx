"use client";
import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { ResumeCarousel } from "home/ResumeCarousel";
import { FadeIn } from "components/animations/FadeIn";

export const Hero = () => {
  const translate = (key: string): string => {
    const translations: Record<string, string> = {
      title: "Create a Professional Resume in Minutes",
      subtitle: "Effortlessly design, customize, and export polished resumes using our free and open-source builder.",
      createButton: "Build Your Resume",
    };

    return translations[key] || key;
  };

  return (
    <section className="relative overflow-hidden lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl px-4 pt-8 text-center lg:mx-0 lg:grow lg:px-0 lg:pt-32 lg:text-left">
        <FadeIn direction="up" duration={800}>
          <h1 className="text-white pb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {translate("title")}
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={200} duration={800}>
          <p className="text-white mt-3 text-base sm:text-lg lg:mt-5 lg:text-xl">
            {translate("subtitle")}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={400} duration={800}>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/resume-builder"
              className="btn-primary mt-6 inline-block transform transition-all duration-300 hover:scale-105 hover:shadow-lg lg:mt-14"
            >
              {translate("createButton")}
              <span
                aria-hidden="true"
                className="transition-all group-hover:ml-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
      <FlexboxSpacer maxWidth={50} minWidth={0} className="hidden lg:block" />
      <div className="hidden lg:mx-0 lg:mx-0 lg:block lg:w-4/12 lg:max-w-xl lg:px-0 lg:pt-10">
        <ResumeCarousel />
      </div>
    </section>
  );
};
