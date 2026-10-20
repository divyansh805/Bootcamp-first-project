import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { CompanySummary, isNullish } from "../lib/companyData";
import { CompanyLogo } from "./CompanyLogo";

interface CompanyCardProps {
  company: CompanySummary;
  onSelect: (companyId: number) => void;
}

function getBadgeStyle(type: string): { bg: string; text: string; border: string } {
  const norm = type.toLowerCase().trim();
  if (norm.includes("super")) {
    return { bg: "bg-[#f5f3ff]", text: "text-[#7c3aed]", border: "border-[#ddd6fe]" };
  }
  if (norm.includes("dream")) {
    return { bg: "bg-[#eff6ff]", text: "text-[#2563eb]", border: "border-[#bfdbfe]" };
  }
  if (norm.includes("standard")) {
    return { bg: "bg-[#f0fdf4]", text: "text-[#16a34a]", border: "border-[#bbf7d0]" };
  }
  if (norm.includes("regular")) {
    return { bg: "bg-[#fffbeb]", text: "text-[#d97706]", border: "border-[#fde68a]" };
  }
  return { bg: "bg-[#f8fafc]", text: "text-[#475569]", border: "border-[#e2e8f0]" };
}

function renderFieldValue(val: string | undefined): React.ReactNode {
  if (isNullish(val)) {
    return <span className="italic text-slate-400">not publicly available</span>;
  }
  return <span>{val}</span>;
}

export const CompanyCard = memo<CompanyCardProps>(({ company, onSelect }) => {
  const navigate = useNavigate();
  const badge = getBadgeStyle(company.companyType);

  const isGrowthNegative = company.yoyGrowthRate?.trim().startsWith("-");
  const GrowthIcon = isGrowthNegative ? TrendingDown : TrendingUp;

  const handleClick = () => {
    onSelect(company.id);
    navigate("/company/intelligence");
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <div>
        {/* Header: Logo and Tier Badge */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <CompanyLogo
            name={company.name}
            logoUrl={company.logoUrl}
            websiteUrl={company.websiteUrl}
            size="md"
          />
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {company.companyType || "Dream"}
          </span>
        </div>

        {/* Company Name & Short Name */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {company.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-3.5">
          {company.shortName && company.shortName !== company.name ? company.shortName : company.category}
        </p>

        {/* Metadata Details */}
        <div className="space-y-1.5 text-xs text-slate-600">
          {/* HQ */}
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderFieldValue(company.headquartersAddress)}</span>
          </div>

          {/* Size */}
          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{renderFieldValue(company.employeeSize)}</span>
          </div>

          {/* YoY Growth Rate */}
          <div className="flex items-center gap-1.5 truncate">
            <GrowthIcon
              className={`w-3.5 h-3.5 shrink-0 ${
                isGrowthNegative ? "text-red-500" : "text-emerald-600"
              }`}
            />
            <span
              className={`font-semibold ${
                isGrowthNegative ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {isNullish(company.yoyGrowthRate) ? (
                <span className="italic font-normal text-slate-400">not publicly available</span>
              ) : (
                `${company.yoyGrowthRate} YoY Growth`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action footer with Arrow */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
          Explore Intelligence
        </span>
        <div className="p-1 rounded-md text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
});

CompanyCard.displayName = "CompanyCard";
