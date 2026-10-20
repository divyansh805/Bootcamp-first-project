import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, Sparkles, LayoutGrid, X } from "lucide-react";
import { useCompany } from "../../context/CompanyContext";
import { CompanyLogo } from "../CompanyLogo";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { selectedInfo, profile } = useCompany();

  const navItems = [
    {
      title: "Company Intelligence",
      href: "/company/intelligence",
      icon: Building2,
      active: location.pathname === "/company/intelligence"
    },
    {
      title: "Skill Intelligence",
      href: "/company/skills",
      icon: Sparkles,
      active: location.pathname === "/company/skills"
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#F8FAFC] border-r border-[#E5E7EB] text-[#334155] transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Company identity header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3 overflow-hidden">
            <CompanyLogo
              name={selectedInfo?.companyName || "Company"}
              logoUrl={selectedInfo?.logoUrl}
              websiteUrl={profile?.websiteUrl}
              size="sm"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {selectedInfo?.companyName || "Select Company"}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {profile?.companyType || "Dream"} Tier
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Intelligence Suite
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-[#EFF6FF] text-[#2563EB] shadow-xs"
                    : "text-[#334155] hover:bg-slate-200/50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.active ? "text-[#2563EB]" : "text-slate-500"}`} />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors"
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-slate-500" />
            <span>All Companies</span>
          </Link>
          <div className="mt-2 px-3 text-[11px] text-slate-400">
            JSSATEN Placement Portal
          </div>
        </div>
      </aside>
    </>
  );
};
