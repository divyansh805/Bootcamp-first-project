import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, ChevronRight, Home, Building2, Sparkles } from "lucide-react";
import { useCompany } from "../../context/CompanyContext";
import { AppSidebar } from "./AppSidebar";

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedInfo, isLoading } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If loading is done and there's no selected company, navigate to "/"
    if (!isLoading && !selectedInfo) {
      navigate("/", { replace: true });
    }
  }, [isLoading, selectedInfo, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading intelligence data...</p>
        </div>
      </div>
    );
  }

  // Active view label for breadcrumb
  const isSkills = location.pathname.includes("/skills");
  const currentViewTitle = isSkills ? "Skill Intelligence" : "Company Intelligence";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 bg-white">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-white border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Sidebar Trigger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 -ml-1 text-slate-600 rounded-md hover:bg-slate-100 md:hidden"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 overflow-hidden whitespace-nowrap">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-slate-900 transition-colors shrink-0"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Companies</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700 truncate max-w-[140px] sm:max-w-[200px]">
                {selectedInfo?.companyName || "Accenture"}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-blue-600 shrink-0 flex items-center gap-1">
                {isSkills ? (
                  <Sparkles className="w-3.5 h-3.5 inline text-blue-600" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 inline text-blue-600" />
                )}
                <span>{currentViewTitle}</span>
              </span>
            </nav>
          </div>

          {/* College Tag wordmark on top right */}
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-600 bg-slate-100 rounded border border-slate-200">
              JSSATEN NOIDA
            </span>
            <Link
              to="/"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
            >
              Change Company
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content via Outlet */}
        <main className="flex-1 min-w-0 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
