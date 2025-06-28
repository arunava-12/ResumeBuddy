"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import logoSrc from "public/logo-500.png";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const translate = (key: string) => {
    const translations: Record<string, string> = {
      build: "Create Resume",
      menu: "Menu",
      bugReport: "Bug Report",
      communityHelp: "Community Help",
    };

    return translations[key] || key;
  };

  const handleBugReportClick = () => {
    const message =
      "If you find bugs or things you think are not good, please report issues in GitHub Issues.\n\nClick OK to jump to the GitHub Issues page.";

    if (confirm(message)) {
      window.open("https://github.com/arunava-12/ResumeBuddy/issues", "_blank");
    }
  };

  const handleCommunityHelpClick = () => {
    const message =
      "You can showcase your resume in GitHub Discussions (don't forget to hide personal information), and the community will provide help.\n\nClick OK to jump to the GitHub Discussions page.";

    if (confirm(message)) {
      window.open(
        "https://github.com/arunava-12/ResumeBuddy/discussions/categories/resume-help",
        "_blank"
      );
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "fixed top-0 left-0 right-0 z-50 flex h-[var(--top-nav-bar-height)] items-center bg-black/0 text-white px-3 lg:px-12 shadow-md backdrop-blur-sm"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="sr-only">ResumeBuddy</span>
          <img src={logoSrc.src} alt="Logo" className="h-8 w-auto" />
          <span className="text-white text-lg font-semibold text-gray-800">
            ResumeBuddy
          </span>
        </Link>

        <nav
          aria-label="Site Nav Bar"
          className="hidden items-center gap-2 text-sm font-medium md:flex"
        >
          <button
            onClick={handleBugReportClick}
            className="rounded-md px-1.5 py-2 text-white hover:bg-white/10 focus-visible:bg-white/10 lg:px-4"
          >
            {translate("bugReport")}
          </button>
          <button
            onClick={handleCommunityHelpClick}
            className="rounded-md px-1.5 py-2 text-white hover:bg-white/10 focus-visible:bg-white/10 lg:px-4"
          >
            {translate("communityHelp")}
          </button>
          {[["/resume-builder", translate("build")]].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-white hover:bg-white/10 focus-visible:bg-white/10 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
          <div className="ml-1 mt-1 hidden sm:block">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=arunava-12&repo=ResumeBuddy&type=star&count=true"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div>
        </nav>

        <button
          className="rounded-md p-2 hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-[var(--top-nav-bar-height)] z-50 bg-black/80 backdrop-blur-md shadow-lg md:hidden">
            <div className="flex flex-col py-2">
              <button
                onClick={() => {
                  handleBugReportClick();
                  closeMenu();
                }}
                className="px-4 py-3 text-left text-white hover:bg-white/10"
              >
                {translate("bugReport")}
              </button>
              <button
                onClick={() => {
                  handleCommunityHelpClick();
                  closeMenu();
                }}
                className="px-4 py-3 text-left text-white hover:bg-white/10"
              >
                {translate("communityHelp")}
              </button>
              {[["/resume-builder", translate("build")]].map(
                ([href, text]) => (
                  <Link
                    key={text}
                    onClick={closeMenu}
                    className="px-4 py-3 text-white hover:bg-white/10"
                    href={href}
                  >
                    {text}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
