"use client";
import React, { useState } from "react";

export const EditorInstructions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const translations: Record<string, string> = {
    title: "Editor Instructions",
    toggle: isExpanded ? "Hide Instructions" : "Show Instructions",
    markdown: "Markdown Shortcuts",
    unorderedList: "Type '- ' or '* ' to create an unordered list (note the space after)",
    orderedList: "Type '1. ' to create an ordered list (note the space after)",
    boldText: "Type '**text**' or '__text__' to make text bold",
    hint: "These shortcuts help you format your resume content more efficiently.",
  };

  return (
  <div
    className={`rounded-2xl border border-white/20 bg-green-600/10 backdrop-blur-3xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-opacity duration-200 mb-3`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white">
        {translations.title}
      </h3>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-white underline hover:text-white"
      >
        {translations.toggle}
      </button>
    </div>

    {isExpanded && (
      <div className="mt-3">
        <h4 className="mb-2 font-medium text-white">
          {translations.markdown}
        </h4>
        <ul className="list-disc space-y-2 pl-5 text-white">
          <li>{translations.unorderedList}</li>
          <li>{translations.orderedList}</li>
          <li>{translations.boldText}</li>
        </ul>
        <p className="mt-3 text-sm text-white">{translations.hint}</p>
      </div>
    )}
  </div>
);

};
