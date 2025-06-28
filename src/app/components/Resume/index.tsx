"use client";
import { useState, useMemo, useEffect } from "react";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { useAppSelector } from "lib/redux/hooks";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import DotGrid from "../DotGrid/DotGrid";

export const Resume = () => {
  const getInitialScale = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 0.5 : 0.8;
    }
    return 0.8;
  };

  const [scale, setScale] = useState(getInitialScale);

  useEffect(() => {
    const handleResize = () => {
      const newScale = window.innerWidth < 768 ? 0.5 : 0.8;
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);

  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
<div className="relative flex justify-center md:justify-start w-full h-full pt-[var(--top-nav-bar-height)]">
      {/* ✅ DotGrid background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={12}
          baseColor="#CDEDB3"
          activeColor="#022212"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <FlexboxSpacer maxWidth={30} className="hidden md:block" />

      {/* ✅ Foreground content */}
      <div className="relative z-10">
<section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-auto md:p-[var(--resume-padding)] hide-scrollbar">
          <ResumeIframeCSR
            documentSize={settings.documentSize}
            scale={scale}
            enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
          >
            <ResumePDF
              resume={resume}
              settings={settings}
              isPDF={DEBUG_RESUME_PDF_FLAG}
            />
          </ResumeIframeCSR>
        </section>
        <ResumeControlBarCSR
          scale={scale}
          setScale={setScale}
          documentSize={settings.documentSize}
          document={document}
          fileName={resume.profile.name + " - Resume"}
        />
      </div>

      <ResumeControlBarBorder />
    </div>
  );
};
