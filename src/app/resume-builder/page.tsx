"use client";
import { useState } from "react";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";

export default function Create() {
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const translate = (key: "edit" | "preview") => {
    const translations = {
      edit: "Edit",
      preview: "Preview",
    };
    return translations[key] || key;
  };

  return (
<main className="relative min-h-screen overflow-hidden bg-gray-50">

      {/* Mobile tab switch */}
      <div className="md:hidden">
        <div className="flex border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
              activeTab === "form"
                ? "border-b-2 border-blue-600 bg-blue-50/80 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {translate("edit")}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors ${
              activeTab === "preview"
                ? "border-b-2 border-blue-600 bg-blue-50/80 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {translate("preview")}
          </button>
        </div>
        <div className="h-[calc(100vh-var(--top-nav-bar-height)-48px)] overflow-y-auto">
          {activeTab === "form" && (
            <div className="h-full overflow-y-auto">
              <ResumeForm />
            </div>
          )}
          {activeTab === "preview" && (
            <div className="h-full overflow-y-auto">
              <Resume />
            </div>
          )}
        </div>
      </div>

      {/* Desktop grid layout */}
      <div className="hidden min-h-screen h-full grid-cols-6 md:grid">
        <div className="col-span-3 h-full">
          <ResumeForm />
        </div>
        <div className="col-span-3 h-full">
          <Resume />
        </div>
      </div>
    </main>
  );
}