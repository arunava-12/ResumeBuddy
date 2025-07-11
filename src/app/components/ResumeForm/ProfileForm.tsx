import { useRef } from "react";
import { BaseForm } from "components/ResumeForm/Form";
import {
  Input,
  Textarea,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { CameraIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { name, email, phone, url, summary, location, photoUrl } = profile;

  const translate = (key: string) => {
    const translations: Record<string, string> = {
      name: "Name",
      profile: "Profile",
      summary: "Summary",
      summaryPlaceholder:
        "Supports Markdown, see editor instructions for details",
      email: "Email",
      phone: "Phone",
      website: "Website",
      location: "Location",
      photo: "Photo",
      uploadProfessionalPhoto: "Upload a professional photo",
      checkCarefully: "Check carefully",
      websiteExample: "e.g.: GitHub, blog, etc.",
      personalPhoto: "Personal Photo",
    };

    return translations[key] || key;
  };

  const handleProfileChange = (
    field: keyof ResumeProfile,
    value: string | string[],
  ) => {
    dispatch(changeProfile({ field, value: value as any }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        handleProfileChange("photoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    handleProfileChange("photoUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <BaseForm>
      <div className="text-white">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-span-full">
            <label className="mb-1 block text-sm font-medium">
              {translate("photo")}
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      className="rounded-md object-cover"
                      alt={translate("personalPhoto")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <CameraIcon className="h-8 w-8" />
                  )}
                </label>
                {photoUrl && (
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 rounded-full bg-white text-gray-500 hover:text-gray-700"
                    onClick={handleRemovePhoto}
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="text-sm text-white">
                <p>{translate("uploadProfessionalPhoto")}</p>
              </div>
            </div>
          </div>
          <Input
            label={translate("name")}
            labelClassName="col-span-full text-white"
            name="name"
            placeholder=""
            value={name}
            onChange={handleProfileChange}
          />
          <div className="col-span-full">
            <BulletListTextarea
              label={translate("summary")}
              labelClassName="text-white"
              name="summary"
              placeholder={translate("summaryPlaceholder")}
              value={summary}
              onChange={handleProfileChange}
            />
          </div>
          <Input
            label={translate("email")}
            labelClassName="col-span-4 text-white"
            name="email"
            placeholder={translate("checkCarefully")}
            value={email}
            onChange={handleProfileChange}
          />
          <Input
            label={translate("phone")}
            labelClassName="col-span-2 text-white"
            name="phone"
            placeholder={translate("checkCarefully")}
            value={phone}
            onChange={handleProfileChange}
          />
          <Input
            label={translate("website")}
            labelClassName="col-span-4 text-white"
            name="url"
            placeholder={translate("websiteExample")}
            value={url}
            onChange={handleProfileChange}
          />
          <Input
            label={translate("location")}
            labelClassName="col-span-2 text-white"
            name="location"
            placeholder=""
            value={location}
            onChange={handleProfileChange}
          />
        </div>
      </div>
    </BaseForm>
  );
};
