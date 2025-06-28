export function getMetadata() {
  return {
    metadataBase: new URL("https://ResumeBuddy.ltlyl.fun/"),
    title: "ResumeBuddy - Free Open-Source Resume Builder",
    description:
      "ResumeBuddy is a free and open-source resume builder that helps you create professional resumes quickly with multiple templates and customization options.",
    keywords:
      "Resume, Resume Builder, Open Source, Job, Template, Customization, Free, Professional, Career, CV, Multi-language",
    openGraph: {
      title: "ResumeBuddy - Free Open-Source Resume Builder",
      description:
        "ResumeBuddy is a free and open-source resume builder that helps you create professional resumes quickly with multiple templates and customization options.",
      url: "https://ResumeBuddy.ltlyl.fun/",
      siteName: "ResumeBuddy",
      images: [
        {
          url: "/logo-500.png",
          width: 500,
          height: 500,
          alt: "ResumeBuddy Logo",
        },
      ],
      locale: "en_US",
      alternateLocales: [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ResumeBuddy - Free Open-Source Resume Builder",
      description:
        "ResumeBuddy is a free and open-source resume builder that helps you create professional resumes quickly with multiple templates and customization options.",
      images: ["/logo-500.png"],
      site: "@ResumeBuddy",
    },
    robots: "index, follow",
  };
}
