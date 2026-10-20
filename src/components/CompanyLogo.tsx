import React, { useState } from "react";

interface CompanyLogoProps {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  websiteUrl,
  className = "",
  size = "md"
}) => {
  const [hasError, setHasError] = useState(false);

  // Size styling map
  const sizeClasses = {
    sm: "w-8 h-8 text-xs font-semibold rounded-md",
    md: "w-11 h-11 text-sm font-semibold rounded-lg",
    lg: "w-14 h-14 text-base font-bold rounded-xl",
    xl: "w-16 h-16 text-lg font-bold rounded-2xl"
  };

  const initial = (name || "C").trim().charAt(0).toUpperCase();

  // Try Logo.dev if publishable key is available and domain can be parsed
  let resolvedUrl = logoUrl;
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;
  if (logoDevKey && websiteUrl) {
    try {
      const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
      if (hostname) {
        resolvedUrl = `https://img.logo.dev/${hostname}?token=${logoDevKey}`;
      }
    } catch {
      // ignore url parse error
    }
  }

  if (!resolvedUrl || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 text-slate-700 border border-slate-200 select-none shrink-0 ${sizeClasses[size]} ${className}`}
        aria-label={`${name} logo fallback`}
      >
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center bg-white border border-slate-200 overflow-hidden shrink-0 p-1.5 ${sizeClasses[size]} ${className}`}
    >
      <img
        src={resolvedUrl}
        alt={`${name} logo`}
        className="max-w-full max-h-full object-contain"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
