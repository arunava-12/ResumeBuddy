import { BaseForm } from "components/ResumeForm/Form";
import { InputGroupWrapper } from "components/ResumeForm/Form/InputGroup";
import { THEME_COLORS } from "components/ResumeForm/ThemeForm/constants";
import { InlineInput } from "components/ResumeForm/ThemeForm/InlineInput";
import {
  DocumentSizeSelections,
  FontFamilySelectionsCSR,
  FontSizeSelections,
  TemplateSelections,
} from "components/ResumeForm/ThemeForm/Selection";
import {
  changeSettings,
  DEFAULT_THEME_COLOR,
  selectSettings,
  type GeneralSetting,
} from "lib/redux/settingsSlice";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import type { FontFamily } from "components/fonts/constants";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings);
  const { fontSize, fontFamily, documentSize, template } = settings;
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR;
  const dispatch = useAppDispatch();

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }));
  };

  const translate = (key: string) => {
    const translations: Record<string, string> = {
      settings: "Resume Settings",
      template: "Template Style",
      themeColor: "Theme Color",
      fontFamily: "Font Family",
      fontSize: "Font Size",
      documentSize: "Document Size",
    };

    return translations[key] || key;
  };

  return (
    <BaseForm>
      <div className="flex flex-col gap-6 text-white">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 text-white" aria-hidden="true" />
          <h1 className="text-lg font-semibold tracking-wide">
            {translate("settings")}
          </h1>
        </div>

        <div>
          <InputGroupWrapper label={translate("template")} labelClassName="text-white" />
          <TemplateSelections
            themeColor={themeColor}
            selectedTemplate={template}
            handleSettingsChange={handleSettingsChange}
          />
        </div>

        <div>
          <InlineInput
            label={translate("themeColor")}
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            labelClassName="text-white"
            inputStyle={{ color: themeColor }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map((color, idx) => (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key))
                    handleSettingsChange("themeColor", color);
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "✓" : ""}
              </div>
            ))}
          </div>
        </div>

        <div>
          <InputGroupWrapper label={translate("fontFamily")} labelClassName="text-white" />
          <FontFamilySelectionsCSR
            selectedFontFamily={fontFamily}
            themeColor={themeColor}
            handleSettingsChange={handleSettingsChange}
          />
        </div>

        <div>
          <InlineInput
  label={translate("fontSize") + " (pt)"}
  name="fontSize"
  value={fontSize}
  placeholder="11"
  onChange={handleSettingsChange}
  labelClassName="text-white"
inputStyle={{
  backgroundColor: "white",
  color: "black",
  border: "1px solid #4b5563", // gray-600
  borderRadius: "0.375rem", // rounded-md
  padding: "0.25rem 0.5rem",
}}

/>

          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeColor}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>

        <div>
          <InputGroupWrapper label={translate("documentSize")} labelClassName="text-white" />
          <DocumentSizeSelections
            themeColor={themeColor}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
