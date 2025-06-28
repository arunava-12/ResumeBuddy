"use client";
import { ReactNode } from "react";
import { FadeIn } from "components/animations/FadeIn";
import { StaggeredFadeIn } from "components/animations/StaggeredFadeIn";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const getFeatures = (): Feature[] => {
  return [
    {
      icon: <span className="text-3xl">🧠</span>,
      title: "Resume Parsing",
      description:
        "We can parse your PDF resume, making it easier to create and edit your resume content (feature coming soon)",
    },
    {
      icon: <span className="text-3xl">🎨</span>,
      title: "Multiple Templates",
      description:
        "Offering various professionally designed templates to meet different industry standards and job application requirements",
    },
    {
      icon: <span className="text-3xl">📱</span>,
      title: "Responsive Design",
      description:
        "Works smoothly on any device, from mobile phones to tablets and desktop computers, with optimized interface",
    },
    {
      icon: <span className="text-3xl">🔒</span>,
      title: "Local Data Security",
      description:
        "Your resume data is stored entirely in your local browser and is never uploaded to external servers, ensuring complete privacy",
    },
    {
      icon: <span className="text-3xl">🚀</span>,
      title: "Quick Export",
      description:
        "Export professional high-quality PDF files with just one click, ready to submit your job application anytime",
    },
    {
      icon: <span className="text-3xl">💯</span>,
      title: "ATS-Friendly Format",
      description:
        "Optimize resume structure and formatting to ensure Applicant Tracking Systems can correctly parse all your information",
    },
  ];
};

export const Features = () => {
  const translate = (key: string) => {
    const translations: Record<string, string> = {
      title: "All-in-one Resume Builder",
      subtitle: "Packed with powerful features to help you create a professional resume and win interview opportunities",
    };

    return translations[key] || key;
  };

  return (
    <section className="mx-auto mt-12 max-w-6xl px-4 pb-12 sm:mt-16 sm:px-8 sm:pb-16">
      <FadeIn direction="up">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          {translate("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-white sm:mt-4 sm:text-lg">
          {translate("subtitle")}
        </p>
      </FadeIn>
      <StaggeredFadeIn
        as="div"
        className="mt-10 grid auto-rows-fr grid-cols-1 gap-x-6 gap-y-8 sm:mt-14 sm:gap-x-8 sm:gap-y-10 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={100}
      >
        {getFeatures().map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="group relative flex h-full flex-col rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-6"

          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-100 sm:h-12 sm:w-12">
                {icon}
              </div>
              <h3 className="text-base font-semibold text-gray-100 sm:text-lg">
                {title}
              </h3>
            </div>
            <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-100 sm:mt-3 sm:text-base">
              {description}
            </p>
          </div>
        ))}
      </StaggeredFadeIn>
    </section>
  );
};
