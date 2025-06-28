import { useEffect, useCallback } from "react";
import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeSlice";
import type { ResumeWorkExperience } from "lib/redux/types";
import { updateFormHeadingIfNotCustomized } from "lib/redux/settingsSlice";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const dispatch = useAppDispatch();

  const translate = useCallback(
    (key: string) => {
      const translations: Record<string, string> = {
        workExperiences: "Work Experience",
        addWork: "Add Work Experience",
        deleteWork: "Delete Work Experience",
        company: "Company",
        position: "Position",
        date: "Date",
        responsibilities: "Responsibilities",
      };

      return translations[key] || key;
    },
    []
  );

  const showDelete = workExperiences.length > 1;

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: "workExperiences",
        value: translate("workExperiences"),
      })
    );
  }, [dispatch, translate]);

  return (
    <Form form="workExperiences" addButtonText={translate("addWork")}>
      {workExperiences.map(
        ({ id, company, jobTitle, date, descriptions }, idx) => {
          const handleWorkExperienceChange = (
            ...[field, value]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
          ) => {
            dispatch(changeWorkExperiences({ idx, field, value } as any));
          };

          const showMoveUp = idx !== 0;
          const showMoveDown = idx !== workExperiences.length - 1;

          return (
            <FormSection
              key={id || `work-${idx}`}
              form="workExperiences"
              idx={idx}
              showMoveUp={showMoveUp}
              showMoveDown={showMoveDown}
              showDelete={showDelete}
              deleteButtonTooltipText={translate("deleteWork")}
            >
              <Input
                label={translate("company")}
                labelClassName="col-span-full text-white"
                name="company"
                placeholder=""
                value={company}
                onChange={handleWorkExperienceChange}
              />
              <Input
                label={translate("position")}
                labelClassName="col-span-4 text-white"
                name="jobTitle"
                placeholder=""
                value={jobTitle}
                onChange={handleWorkExperienceChange}
              />
              <Input
                label={translate("date")}
                labelClassName="col-span-2 text-white"
                name="date"
                placeholder=""
                value={date}
                onChange={handleWorkExperienceChange}
              />
              <BulletListTextarea
                label={translate("responsibilities")}
                labelClassName="col-span-full text-white"
                name="descriptions"
                placeholder="Supports Markdown, see editor instructions for details"
                value={descriptions}
                onChange={handleWorkExperienceChange}
              />
            </FormSection>
          );
        }
      )}
    </Form>
  );
};
