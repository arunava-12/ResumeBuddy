"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
  showToolbar = true,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
  showToolbar?: boolean;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const translate = (key: string) => {
    const translations: Record<string, string> = {
      autoscale: "Autoscale",
      download: "Download Resume",
    };

    return translations[key] || key;
  };

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update();
  }, [update, document]);

  if (!showToolbar) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-white lg:justify-between">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
          className="accent-white"
        />
        <div className="w-10 text-white">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 text-white lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-white"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">{translate("autoscale")}</span>
        </label>
      </div>
      <a
        className="ml-1 flex items-center gap-2 rounded-md bg-gradient-to-r from-green-500 to-green-800 px-4 py-1 text-white shadow-md transition-transform duration-200 hover:scale-105 hover:from-green-400 hover:to-green-700 lg:ml-8"
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className="h-4 w-4 text-white" />
        <span className="whitespace-nowrap">{translate("download")}</span>
      </a>
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-transparent" />
);
