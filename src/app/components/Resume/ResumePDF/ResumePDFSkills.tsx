import { Text, View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeSkills } from "lib/redux/types";
import type { TemplateStyles } from "components/Resume/ResumePDF/templates";

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  templateStyles,
}: {
  heading: string;
  skills: ResumeSkills;
  themeColor: string;
  templateStyles: TemplateStyles;
}) => {
  const { categorySkills, selectedCategories } = skills;

  // If no selected skill category has content, skip rendering
  const hasContent =
  categorySkills &&
  Object.entries(categorySkills).some(
    ([key, value]) => selectedCategories?.[key] && value.trim() !== ""
  );

  if (!hasContent) return null;

  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      style={templateStyles.section}
      titleStyle={templateStyles.sectionTitle}
    >
      <View style={{ ...styles.flexCol, gap: spacing["0.5"] }}>
        {Object.entries(categorySkills).map(([category, value]) => {
          const isVisible = selectedCategories?.[category];
          if (!isVisible || !value.trim()) return null;

          return (
            <View key={category} style={{ marginBottom: spacing["0.5"] }}>
              <Text style={templateStyles.subHeading || styles.subHeading}>
                {category}
              </Text>
              <Text style={styles.paragraph}>{value}</Text>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
