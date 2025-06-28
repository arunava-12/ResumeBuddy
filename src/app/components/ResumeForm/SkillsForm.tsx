import { Form } from "components/ResumeForm/Form";
import { InputGroupWrapper } from "components/ResumeForm/Form/InputGroup";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectSkills, changeSkills } from "lib/redux/resumeSlice";
import {
  selectThemeColor,
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";

const SKILL_CATEGORIES = [
  "Languages : ",
  "Frameworks : ",
  "Tools : ",
  "Libraries : ",
  "Soft Skills : ",
];

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";
  const form = "skills";

  const translate = useCallback(
    (key: string) => {
      const translations: Record<string, string> = {
        skills: "Skills",
        includeCategory: "Show this category on resume",
        categoryPlaceholder: "Add skills separated by commas (e.g. Python, C++, JavaScript)",
      };
      return translations[key] || key;
    },
    []
  );

  const handleCategoryToggle = (category: string, isChecked: boolean) => {
    const updatedCategories = {
      ...skills.selectedCategories,
      [category]: isChecked,
    };
    dispatch(changeSkills({ field: "selectedCategories", value: updatedCategories }));
  };

  const handleCategorySkillsChange = (category: string, value: string) => {
    const updatedCategorySkills = {
      ...skills.categorySkills,
      [category]: value,
    };
    dispatch(changeSkills({ field: "categorySkills", value: updatedCategorySkills }));
  };

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: form,
        value: translate("skills"),
      })
    );
  }, [dispatch, translate]);

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-4">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category} className="col-span-full border-b border-gray-200 pb-4 mb-4">
            <InputGroupWrapper label={category} labelClassName="text-white">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={skills.selectedCategories?.[category] ?? true}
                  onChange={(e) => handleCategoryToggle(category, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-white">
                  {translate("includeCategory")}
                </label>
              </div>
              <textarea
                placeholder={translate("categoryPlaceholder")}
                value={skills.categorySkills?.[category] || ""}
                onChange={(e) => handleCategorySkillsChange(category, e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
              />
            </InputGroupWrapper>
          </div>
        ))}
      </div>
    </Form>
  );
};
