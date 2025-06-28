import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeEducations, selectEducations } from "lib/redux/resumeSlice";
import type { ResumeEducation } from "lib/redux/types";
import {
  changeFormHeading,
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";

export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations);
  const dispatch = useAppDispatch();
  const showDelete = educations.length > 1;
  const form = "educations";

  const translate = useCallback(
    (key: string) => {
      const translations: Record<string, string> = {
        educations: "Education",
        addEducation: "Add Education",
        deleteEducation: "Delete Education",
        school: "School",
        degree: "Degree",
        gpa: "GPA",
        date: "Date",
        descriptions: "Descriptions",
        showBulletPoints: "Show bullet points",
      };

      return translations[key] || key;
    },
    []
  );

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: form,
        value: translate("educations"),
      })
    );
  }, [dispatch, form, translate]);

  return (
    <Form form={form} addButtonText={translate("addEducation")}>
      {educations.map(
        ({ id, school, degree, gpa, date, descriptions }, idx) => {
          const handleEducationChange = (
            ...[field, value]: CreateHandleChangeArgsWithDescriptions<ResumeEducation>
          ) => {
            dispatch(changeEducations({ idx, field, value } as any));
          };

          const showMoveUp = idx !== 0;
          const showMoveDown = idx !== educations.length - 1;

          return (
            <FormSection
              key={id || `education-${idx}`}
              form="educations"
              idx={idx}
              showMoveUp={showMoveUp}
              showMoveDown={showMoveDown}
              showDelete={showDelete}
              deleteButtonTooltipText={translate("deleteEducation")}
            >
              <Input
  label={translate("school")}
  labelClassName="col-span-4 text-white"
  name="school"
  placeholder=""
  value={school}
  onChange={handleEducationChange}
/>
<Input
  label={translate("date")}
  labelClassName="col-span-2 text-white"
  name="date"
  placeholder=""
  value={date}
  onChange={handleEducationChange}
/>
<Input
  label={translate("degree")}
  labelClassName="col-span-4 text-white"
  name="degree"
  placeholder=""
  value={degree}
  onChange={handleEducationChange}
/>
<Input
  label={translate("gpa")}
  labelClassName="col-span-2 text-white"
  name="gpa"
  placeholder=""
  value={gpa}
  onChange={handleEducationChange}
/>
<div className="col-span-full">
  <BulletListTextarea
    label="Additional Information (Optional)"
    labelClassName="col-span-full text-white"
    name="descriptions"
    placeholder="Supports Markdown, see editor instructions for details"
    value={descriptions}
    onChange={handleEducationChange}
  />
</div>

            </FormSection>
          );
        }
      )}
    </Form>
  );
};
