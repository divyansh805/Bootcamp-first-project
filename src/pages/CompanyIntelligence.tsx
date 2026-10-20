import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import {
  Globe,
  Linkedin,
  ExternalLink,
  Star,
  Play
} from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { CompanyLogo } from "../components/CompanyLogo";
import { isNullish } from "../lib/companyData";
import {
  buildIntelligenceSections,
  IntelligenceSection,
  IntelligenceField
} from "../data/intelligenceData";

// Render value with auto-detection for URL, email, rating, video, list, pills
const FieldValueRenderer: React.FC<{ field: IntelligenceField }> = memo(({ field }) => {
  const { value, type } = field;

  if (isNullish(value)) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
        Not Available
      </span>
    );
  }

  // Explicit URL type
  if (type === "url" || (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://")) && !value.includes("youtube.com"))) {
    const urlStr = String(value);
    return (
      <a
        href={urlStr}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline break-all"
      >
        <span>{urlStr}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
      </a>
    );
  }

  // Email type
  if (type === "email" || (typeof value === "string" && value.includes("@") && !value.includes(" "))) {
    const emailStr = String(value);
    return (
      <a
        href={`mailto:${emailStr}`}
        className="text-xs font-semibold text-blue-600 hover:underline break-all"
      >
        {emailStr}
      </a>
    );
  }

  // Video type
  if (type === "video" || (typeof value === "string" && (value.includes("youtube.com") || value.includes("youtu.be")))) {
    const videoUrl = String(value);
    return (
      <div className="space-y-2">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Watch Corporate Showcase</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // Rating type
  if (type === "rating" || (typeof value === "string" && value.includes("/5"))) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
        <span>{String(value)}</span>
      </div>
    );
  }

  // Array / list type
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
          Not Available
        </span>
      );
    }

    if (type === "list") {
      return (
        <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-700 marker:text-blue-500">
          {value.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-slate-800">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Default array: tags / pills
    return (
      <div className="flex flex-wrap gap-1.5">
        {value.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  // String value: check for semicolon or comma auto-pill separation if it looks like a tag list
  const textStr = String(value);
  if (type === "tags" || textStr.includes(";") || (textStr.includes(",") && textStr.length < 150 && !textStr.startsWith("$"))) {
    const rawParts = textStr.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
    if (rawParts.length > 1) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {rawParts.map((part, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
            >
              {part}
            </span>
          ))}
        </div>
      );
    }
  }

  // Normal paragraph text
  return (
    <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
      {textStr}
    </p>
  );
});

FieldValueRenderer.displayName = "FieldValueRenderer";

// Memoized Section Card
const SectionCard: React.FC<{
  section: IntelligenceSection;
}> = memo(({ section }) => {
  const Icon = section.icon;

  return (
    <section
      id={section.id}
      className="scroll-mt-32 p-5 sm:p-6 bg-white rounded-xl border border-slate-200/90 shadow-xs transition-shadow"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">
                {String(section.number).padStart(2, "0")}.
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {section.title}
              </h2>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          {section.fields.length} {section.fields.length === 1 ? "field" : "fields"}
        </span>
      </div>

      {/* Field Rows */}
      <div className="divide-y divide-slate-100">
        {section.fields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row sm:items-start py-3 first:pt-0 last:pb-0 gap-1.5 sm:gap-4"
          >
            <div className="sm:w-1/3 shrink-0">
              <span className="text-xs font-semibold text-slate-600">
                {field.label}
              </span>
            </div>
            <div className="sm:w-2/3 min-w-0">
              <FieldValueRenderer field={field} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

SectionCard.displayName = "SectionCard";

export const CompanyIntelligence: React.FC = () => {
  const { profile, selectedInfo, isProfileLoading } = useCompany();
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tabListRef = useRef<HTMLDivElement | null>(null);

  // Build the 22 sections from profile
  const sections = useMemo(() => {
    return buildIntelligenceSections(profile || undefined);
  }, [profile]);

  // Auto-center the active tab inside the horizontal tab bar
  const centerTab = (index: number) => {
    if (!tabListRef.current) return;
    const tabEl = tabListRef.current.children[index] as HTMLElement | undefined;
    if (tabEl) {
      const container = tabListRef.current;
      const scrollLeft = tabEl.offsetLeft - container.offsetWidth / 2 + tabEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const headerOffset = 140; // sticky header + sticky tabs offset
      const currentPos = window.scrollY + headerOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (currentPos >= top) {
            setActiveTabIdx(i);
            centerTab(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Scroll to section handler
  const scrollToSection = (index: number) => {
    const section = sections[index];
    if (!section) return;

    setActiveTabIdx(index);
    centerTab(index);

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const el = document.getElementById(section.id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  const displayName = profile?.name || selectedInfo?.companyName || "Accenture plc";
  const industryCategory = profile?.category || "Enterprise IT & Consulting";

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Sticky Top Information Bar (Enterprise SaaS layout: No hero, No gradient) */}
      <div className="sticky top-14 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Logo, Name, Industry */}
          <div className="flex items-center gap-3.5 min-w-0">
            <CompanyLogo
              name={displayName}
              logoUrl={profile?.logoUrl || selectedInfo?.logoUrl}
              websiteUrl={profile?.websiteUrl}
              size="md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  {displayName}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {profile?.companyType || "Dream"}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate">
                {industryCategory} · {profile?.headquartersAddress || "Dublin, Ireland"}
              </p>
            </div>
          </div>

          {/* Right: Direct Web & LinkedIn Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {profile?.websiteUrl && (
              <a
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
            {profile?.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0A66C2] hover:bg-[#084e96] text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-blue-200" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar (22 Tabs) with scroll-spy */}
      <div className="sticky top-[125px] sm:top-[128px] z-10 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <div
            ref={tabListRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth"
            role="tablist"
            aria-label="Intelligence Sections"
          >
            {sections.map((sec, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(idx)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                    {sec.number}.
                  </span>
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 22 Intelligence Sections Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
};
