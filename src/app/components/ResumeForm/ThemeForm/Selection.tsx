import type { GeneralSetting } from "lib/redux/settingsSlice";
import { PX_PER_PT } from "lib/constants";
import {
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
  FONT_FAMILY_TO_DISPLAY_NAME,
  type FontFamily,
} from "components/fonts/constants";
import { getAllFontFamiliesToLoad } from "components/fonts/lib";
import {
  getAllTemplates,
  type Template,
} from "components/Resume/ResumePDF/templates";
import dynamic from "next/dynamic";

const Selection = ({
  selectedColor,
  isSelected,
  style = {},
  onClick,
  children,
}: {
  selectedColor: string;
  isSelected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const selectedStyle = {
    color: "white",
    backgroundColor: selectedColor,
    borderColor: selectedColor,
    ...style,
  };

  return (
    <div
      className="flex w-[108px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
      onClick={onClick}
      style={isSelected ? selectedStyle : style}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const SelectionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2 flex flex-wrap gap-2">{children}</div>;
};

const FontFamilySelections = ({
  selectedFontFamily,
  themeColor,
  handleSettingsChange,
}: {
  selectedFontFamily: string;
  themeColor: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const allFontFamilies = getAllFontFamiliesToLoad();
  return (
    <SelectionsWrapper>
      {allFontFamilies.map((fontFamily, idx) => {
        const isSelected = selectedFontFamily === fontFamily;
        const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${standardSizePt * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontFamily", fontFamily)}
          >
            {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

export const FontFamilySelectionsCSR = dynamic(
  () => Promise.resolve(FontFamilySelections),
  {
    ssr: false,
  }
);

export const FontSizeSelections = ({
  selectedFontSize,
  fontFamily,
  themeColor,
  handleSettingsChange,
}: {
  fontFamily: FontFamily;
  themeColor: string;
  selectedFontSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
  const compactSizePt = standardSizePt - 1;

  const getSizeLabel = (idx: number) => {
    const labels = ["Compact", "Standard", "Large"];
    return labels[idx];
  };

  return (
    <SelectionsWrapper>
      {[0, 1, 2].map((idx) => {
        const fontSizePt = String(compactSizePt + idx);
        const isSelected = fontSizePt === selectedFontSize;
        return (
          <Selection
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${Number(fontSizePt) * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontSize", fontSizePt)}
          >
            {getSizeLabel(idx)}
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};

export const DocumentSizeSelections = ({
  selectedDocumentSize,
  themeColor,
  handleSettingsChange,
}: {
  themeColor: string;
  selectedDocumentSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const getDocSizeDescription = (type: string) => {
    return type === "Letter" ? "(US, Canada)" : "(Global Standard)";
  };

  return (
    <SelectionsWrapper>
      {["A4", "Letter"].map((type, idx) => (
        <Selection
          key={idx}
          selectedColor={themeColor}
          isSelected={type === selectedDocumentSize}
          onClick={() => handleSettingsChange("documentSize", type)}
        >
          <div className="flex flex-col items-center">
            <div>{type}</div>
            <div className="text-xs">{getDocSizeDescription(type)}</div>
          </div>
        </Selection>
      ))}
    </SelectionsWrapper>
  );
};

export const TemplateSelections = ({
  selectedTemplate,
  themeColor,
  handleSettingsChange,
}: {
  themeColor: string;
  selectedTemplate: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const templates = getAllTemplates();

  const translateTemplate = (template: Template) => {
    const translations: Record<
      string,
      { name: string; description: string }
    > = {
      classic: {
        name: "Classic",
        description: "Simple and clean traditional design",
      },
      professional: {
        name: "Professional",
        description: "Corporate style emphasizing professionalism",
      },
      modern: {
        name: "Modern",
        description: "Modern design with colored header",
      },
      elegant: {
        name: "Elegant",
        description: "Minimalist elegant premium design",
      },
      creative: {
        name: "Creative",
        description: "Modern style for creative industries",
      },
      tech: {
        name: "Tech",
        description: "Modern digital style for tech field",
      },
      minimal: {
        name: "Minimal",
        description: "Clean and crisp minimalist design",
      },
      compact: {
        name: "Compact",
        description: "For candidates with extensive content",
      },
    };

    return translations[template.id] || {
      name: template.name,
      description: template.description,
    };
  };

  return (
    <SelectionsWrapper>
      {templates.map((template) => {
        const isSelected = template.id === selectedTemplate;
        const translatedTemplate = translateTemplate(template);
        return (
          <Selection
            key={template.id}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{ width: "135px" }}
            onClick={() => handleSettingsChange("template", template.id)}
          >
            <div className="flex flex-col items-center">
              <div>{translatedTemplate.name}</div>
              <div className="text-center text-xs">
                {translatedTemplate.description}
              </div>
            </div>
          </Selection>
        );
      })}
    </SelectionsWrapper>
  );
};
