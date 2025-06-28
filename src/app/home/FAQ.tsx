"use client";

import { useState } from "react";
import { FadeIn } from "components/animations/FadeIn";
import { StaggeredFadeIn } from "components/animations/StaggeredFadeIn";

const getFAQItems = () => [
  {
    question: "Is this resume builder completely free?",
    answer:
      "Yes, ResumeBuddy is completely free to use. No registration required, no hidden fees, you can use all features freely.",
  },
  {
    question: "Where is my resume data stored?",
    answer:
      "Your resume data is only saved in your browser's local storage and is not uploaded to any server. This means your data is private and secure, but it also means clearing browser data will result in information loss.",
  },
  {
    question: "Origin of this project",
    answer:
      "This is a secondary development project based on open-resume. Open-resume is an excellent open-source project, but I discovered it lacked some needed features during use, such as personal photo display and theme switching. So I developed this project based on open-resume and shared it on GitHub.",
  },
  {
    question: "Can I customize resume templates?",
    answer:
      "Of course. Contributions of resume templates on GitHub are welcome.",
  },
  {
    question: "Why is my exported resume showing garbled characters?",
    answer:
      "This is usually because you haven't selected the correct font or the fonts haven't loaded properly due to slow network speeds. Please ensure the fonts have loaded completely before exporting your resume.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const translate = (key: string) => {
    const translations: Record<string, string> = {
      title: "Frequently Asked Questions",
      subtitle: "Everything you want to know about ResumeBuddy",
    };

    return translations[key] || key;
  };

  const faqItems = getFAQItems();

  return (
    <section className="relative z-10 mx-auto mt-12 max-w-3xl px-4 pb-16 sm:mt-16 sm:px-8 sm:pb-20">
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
        className="mt-8 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl transition-all sm:mt-10 divide-y divide-white/10"
        staggerDelay={50}
      >
        {faqItems.map((item, idx) => (
          <div key={idx} className="px-3 sm:px-5">
            <button
              className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-white transition-colors hover:text-sky-300 sm:text-lg"
              onClick={() => toggleFAQ(idx)}
            >
              <span className="pr-4">{item.question}</span>
              <span className="ml-4 flex-shrink-0 transition-transform duration-300 ease-in-out sm:ml-6">
                {openIndex === idx ? (
                  <MinusIcon className="h-5 w-5 text-white/60" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-white/60" />
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden text-white/80 transition-all duration-300 ease-in-out ${
                openIndex === idx ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm leading-relaxed sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </StaggeredFadeIn>
    </section>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);
