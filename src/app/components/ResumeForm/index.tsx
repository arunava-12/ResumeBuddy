"use client";
import { useState, useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
  useSetInitialStore,
} from "lib/redux/hooks";
import {
  ShowForm,
  selectFormsOrder,
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";
import { EditorInstructions } from "./EditorInstructions";
import { ProfileForm } from "components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "components/ResumeForm/EducationsForm";
import { ProjectsForm } from "components/ResumeForm/ProjectsForm";
import { SkillsForm } from "components/ResumeForm/SkillsForm";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { CustomForm } from "components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { cx } from "lib/cx";
import DotGrid from "../DotGrid/DotGrid";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const ResumeForm = () => {
  useSetInitialStore();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const translations: Record<ShowForm, string> = {
      workExperiences: "Work Experience",
      educations: "Education",
      projects: "Projects",
      skills: "Skills",
      custom: "Custom Section",
    };

    Object.entries(translations).forEach(([form, text]) => {
      dispatch(
        updateFormHeadingIfNotCustomized({
          field: form as ShowForm,
          value: text,
        }),
      );
    });
  }, [dispatch]);

  return (
    <div className="relative h-full w-full overflow-hidden md:h-[calc(100vh-var(--top-nav-bar-height))] bg-[#102617]">
      {/* ✅ DotGrid in Background */}
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

      {/* ✅ Foreground Scrollable Form */}
      <div
  className={cx(
    "relative z-10 flex h-full justify-center md:justify-end overflow-y-auto scroll-smooth hide-scrollbar",
    isHover ? "" : ""
  )}

        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
<section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)] pt-[var(--top-nav-bar-height)] rounded-2xl">
          <EditorInstructions />
          <ProfileForm />
          {formsOrder.map((form) => {
            const Component = formTypeToComponent[form];
            return <Component key={form} />;
          })}
          <ThemeForm />
          <br />
        </section>
        <FlexboxSpacer maxWidth={30} className="hidden md:block" />
      </div>
    </div>
  );
};
