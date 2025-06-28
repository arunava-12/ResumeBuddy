"use client";
import { useState, useEffect, useCallback } from "react";
import { ResumePDF } from "components/Resume/ResumePDF";
import { initialSettings } from "lib/redux/settingsSlice";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { getResumeByLang } from "home/constants";
import { getAllTemplates } from "components/Resume/ResumePDF/templates";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const ResumeCarousel = () => {
  const resume = getResumeByLang("en");

  const templates = getAllTemplates();
  const [templateIndex, setTemplateIndex] = useState(0);
  const [settings, setSettings] = useState({
    ...initialSettings,
    template: templates[0]?.id || "elegant",
    themeColor: "#0ea5e9",
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTemplate = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      const nextIndex = (templateIndex + 1) % templates.length;
      setTemplateIndex(nextIndex);
      setSettings((prevSettings) => ({
        ...prevSettings,
        template: templates[nextIndex]?.id || "elegant",
      }));

      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 350);
  }, [templateIndex, templates, isTransitioning]);

  const prevTemplate = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      const prevIndex =
        (templateIndex - 1 + templates.length) % templates.length;
      setTemplateIndex(prevIndex);
      setSettings((prevSettings) => ({
        ...prevSettings,
        template: templates[prevIndex]?.id || "elegant",
      }));

      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 350);
  }, [templateIndex, templates, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTemplate();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextTemplate]);

  const handleTemplateChange = useCallback(
    (templateId: string) => {
      if (isTransitioning) return;

      const index = templates.findIndex(
        (template) => template.id === templateId
      );

      if (index === templateIndex) return;

      if (index !== -1) {
        setIsTransitioning(true);

        setTimeout(() => {
          setTemplateIndex(index);
          setSettings((prevSettings) => ({
            ...prevSettings,
            template: templateId,
          }));

          setTimeout(() => {
            setIsTransitioning(false);
          }, 350);
        }, 350);
      }
    },
    [templates, templateIndex, isTransitioning]
  );

  const getScaleForScreen = () => {
    return 0.6;
  };

  return (
    <div className="relative -mt-2">
      <div className="relative mx-auto max-w-full">
        <div
          className={`transform transition-all duration-700 ease-in-out ${
            isTransitioning
              ? "scale-[0.98] opacity-80"
              : "scale-100 opacity-100"
          }`}
        >
          <ResumeIframeCSR
            documentSize="A4"
            scale={getScaleForScreen()}
            enablePDFViewer={false}
            showToolbar={false}
          >
            <ResumePDF resume={resume} settings={settings} isPDF={false} />
          </ResumeIframeCSR>
        </div>

        <div className="relative mt-4 flex w-full items-center justify-center">
          <button
            onClick={prevTemplate}
            disabled={isTransitioning}
            className="mr-4 rounded-full bg-white bg-opacity-70 p-1.5 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-90 hover:shadow-xl"
            aria-label="Previous template"
          >
            <ChevronLeftIcon className="h-4 w-4 text-sky-600" />
          </button>

          <div className="flex justify-center gap-2">
            {templates.map((template, index) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`h-2.5 transition-all duration-500 ease-out ${
                  index === templateIndex
                    ? "w-6 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 shadow-md shadow-sky-200"
                    : "w-2.5 rounded-full bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Switch to template ${template.name}`}
              />
            ))}
          </div>

          <button
            onClick={nextTemplate}
            disabled={isTransitioning}
            className="ml-4 rounded-full bg-white bg-opacity-70 p-1.5 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-90 hover:shadow-xl"
            aria-label="Next template"
          >
            <ChevronRightIcon className="h-4 w-4 text-sky-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
