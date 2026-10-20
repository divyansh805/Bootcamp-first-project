import React, { useState, useMemo, useEffect } from "react";
import { Search, X, RotateCcw, Building, AlertTriangle, RefreshCw } from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { CompanyCard } from "../components/CompanyCard";

type CategoryFilter = "All" | "Super Dream" | "Dream" | "Standard" | "Regular";

export const Index: React.FC = () => {
  const { allCompanies, selectCompany, isLoading, error, refreshCompanies } = useCompany();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");

  // 200ms debounce on search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Compute live counts for each filter category
  const filterCounts = useMemo(() => {
    const counts = {
      All: allCompanies.length,
      "Super Dream": 0,
      Dream: 0,
      Standard: 0,
      Regular: 0
    };

    allCompanies.forEach((c) => {
      const type = c.companyType.toLowerCase();
      if (type.includes("super")) counts["Super Dream"]++;
      else if (type.includes("dream")) counts["Dream"]++;
      else if (type.includes("standard")) counts["Standard"]++;
      else if (type.includes("regular")) counts["Regular"]++;
    });

    return counts;
  }, [allCompanies]);

  // Filtered companies based on search and selected filter
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      // Category match
      if (selectedFilter !== "All") {
        const type = company.companyType.toLowerCase();
        if (selectedFilter === "Super Dream" && !type.includes("super")) return false;
        if (selectedFilter === "Dream" && (type.includes("super") || !type.includes("dream"))) return false;
        if (selectedFilter === "Standard" && !type.includes("standard")) return false;
        if (selectedFilter === "Regular" && !type.includes("regular")) return false;
      }

      // Search match
      if (debouncedSearch.trim() !== "") {
        const query = debouncedSearch.toLowerCase().trim();
        const nameMatch = company.name.toLowerCase().includes(query);
        const shortNameMatch = company.shortName.toLowerCase().includes(query);
        const categoryMatch = company.category.toLowerCase().includes(query);
        const hqMatch = company.headquartersAddress.toLowerCase().includes(query);
        return nameMatch || shortNameMatch || categoryMatch || hqMatch;
      }

      return true;
    });
  }, [allCompanies, selectedFilter, debouncedSearch]);

  const resetFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedFilter("All");
  };

  const filterConfigs: {
    key: CategoryFilter;
    label: string;
    activeClass: string;
    inactiveClass: string;
  }[] = [
    {
      key: "All",
      label: "All Companies",
      activeClass: "bg-slate-900 text-white border-slate-900",
      inactiveClass: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    },
    {
      key: "Super Dream",
      label: "Super Dream",
      activeClass: "bg-[#7c3aed] text-white border-[#7c3aed]",
      inactiveClass: "bg-white text-[#7c3aed] border-purple-200 hover:bg-purple-50/50"
    },
    {
      key: "Dream",
      label: "Dream",
      activeClass: "bg-[#2563eb] text-white border-[#2563eb]",
      inactiveClass: "bg-white text-[#2563eb] border-blue-200 hover:bg-blue-50/50"
    },
    {
      key: "Standard",
      label: "Standard",
      activeClass: "bg-[#16a34a] text-white border-[#16a34a]",
      inactiveClass: "bg-white text-[#16a34a] border-emerald-200 hover:bg-emerald-50/50"
    },
    {
      key: "Regular",
      label: "Regular",
      activeClass: "bg-[#d97706] text-white border-[#d97706]",
      inactiveClass: "bg-white text-[#d97706] border-amber-200 hover:bg-amber-50/50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-left">
          {/* Institutional Pill Tag (NO college logo asset, text-only wordmark and pill) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-200/80">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-xs font-bold tracking-wider text-blue-700 uppercase">
              JSSATEN · INTELLIGENCE PLATFORM
            </span>
          </div>

          {/* Large Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance mb-2">
            JSS Academy of Technical Education Noida Companies Research &amp; Placement Analytics Portal
          </h1>

          {/* Descriptive Subtitle */}
          <p className="text-sm sm:text-base text-slate-500 max-w-3xl mb-6">
            Your strategic edge for campus placements
          </p>

          {/* Search bar directly below */}
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name, domain, industry, headquarters..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50/70 hover:bg-white focus:bg-white text-sm text-slate-900 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Error notification if database request encountered an issue */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 text-amber-900">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Database Query Notice
                </h4>
                <p className="text-xs text-amber-700 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => refreshCompanies()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-amber-300 rounded-lg text-amber-900 hover:bg-amber-100/50 transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Query</span>
            </button>
          </div>
        )}

        {/* Category Filter Pills with Live Counts */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
            Placement Tier:
          </span>
          {filterConfigs.map((f) => {
            const count = filterCounts[f.key];
            const isSelected = selectedFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setSelectedFilter(f.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected ? f.activeClass : f.inactiveClass
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredCompanies.length}</span>{" "}
            {filteredCompanies.length === 1 ? "recruiting partner" : "recruiting partners"}
            {debouncedSearch && (
              <span>
                {" "}
                matching &ldquo;<span className="text-slate-800 font-semibold">{debouncedSearch}</span>&rdquo;
              </span>
            )}
          </div>
          {(selectedFilter !== "All" || debouncedSearch) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Grid or Skeleton or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-slate-200 animate-pulse space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="w-11 h-11 bg-slate-200 rounded-lg" />
                  <div className="w-16 h-5 bg-slate-200 rounded" />
                </div>
                <div className="w-3/4 h-5 bg-slate-200 rounded" />
                <div className="w-1/2 h-3.5 bg-slate-200 rounded" />
                <div className="space-y-2 pt-2">
                  <div className="w-full h-3 bg-slate-100 rounded" />
                  <div className="w-5/6 h-3 bg-slate-100 rounded" />
                  <div className="w-2/3 h-3 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onSelect={(id) => selectCompany(id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-300">
            <Building className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No matching companies found</h3>
            <p className="text-xs text-slate-500 max-w-md mb-4">
              We couldn&apos;t find any recruiting companies matching your current search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search &amp; Filters</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
