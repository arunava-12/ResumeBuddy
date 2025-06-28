import { Form } from "components/ResumeForm/Form";
import { BulletListTextarea } from "components/ResumeForm/Form/InputGroup";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCustom, selectCustom } from "lib/redux/resumeSlice";
import {
  changeFormHeading,
  updateFormHeadingIfNotCustomized,
} from "lib/redux/settingsSlice";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";

  const translate = useCallback(
    (key: string) => {
      const translations: Record<string, string> = {
        custom: "Custom Section",
        customContent: "Custom Content",
        addCustomContent: "Supports Markdown, see editor instructions for details",
      };

      return translations[key] || key;
    },
    []
  );

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  useEffect(() => {
    dispatch(
      updateFormHeadingIfNotCustomized({
        field: form,
        value: translate("custom"),
      })
    );
  }, [dispatch, form, translate]);

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="col-span-full">
          <BulletListTextarea
            label={translate("customContent")}
            labelClassName="col-span-full text-white"
            name="descriptions"
            placeholder={translate("addCustomContent")}
            value={descriptions}
            onChange={handleCustomChange}
          />
        </div>
      </div>
    </Form>
  );
};
