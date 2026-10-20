import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CompanySummary,
  CompanyProfile,
  DashboardSkill
} from "../lib/companyData";
import { fetchCompanies, fetchCompanyById } from "../services/companyService";
import {
  fetchCompanyFullProfile,
  fetchCompanySkillLevels
} from "../services/companyIntelligenceService";

export interface SelectedCompanyInfo {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextType {
  selectedInfo: SelectedCompanyInfo | null;
  summary: CompanySummary | null;
  profile: CompanyProfile | null;
  skills: DashboardSkill[];
  allCompanies: CompanySummary[];
  selectCompany: (companyId: number) => Promise<void>;
  isLoading: boolean;
  isProfileLoading: boolean;
  error: string | null;
  refreshCompanies: () => Promise<void>;
}

const LOCAL_STORAGE_KEY = "selected-company";

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [allCompanies, setAllCompanies] = useState<CompanySummary[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<SelectedCompanyInfo | null>(null);
  const [summary, setSummary] = useState<CompanySummary | null>(null);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [skills, setSkills] = useState<DashboardSkill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load companies from Supabase
  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchCompanies();
      if (res.error) {
        setError(res.error);
      } else {
        setAllCompanies(res.data);
      }
      return res.data;
    } catch (err: any) {
      setError(err.message || "Failed to load companies");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch full details for a chosen company
  const loadCompanyDetails = useCallback(async (companyId: number, companyList: CompanySummary[]) => {
    setIsProfileLoading(true);
    try {
      const [profileRes, skillsRes] = await Promise.all([
        fetchCompanyFullProfile(companyId),
        fetchCompanySkillLevels(companyId)
      ]);

      if (profileRes.profile) {
        setProfile(profileRes.profile);
      }

      setSkills(skillsRes.skills || []);

      // Find or fetch summary
      let compSummary = companyList.find((c) => c.id === companyId);
      if (!compSummary) {
        const singleRes = await fetchCompanyById(companyId);
        if (singleRes.data) compSummary = singleRes.data;
      }

      if (compSummary) {
        setSummary(compSummary);
        const info: SelectedCompanyInfo = {
          companyId: compSummary.id,
          companyName: compSummary.name,
          logoUrl: compSummary.logoUrl
        };
        setSelectedInfo(info);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(info));
        } catch (e) {
          console.warn("Could not save to localStorage", e);
        }
      }
    } catch (err: any) {
      console.error("Error loading company details:", err);
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  // Initialize
  useEffect(() => {
    let isMounted = true;

    async function init() {
      const list = await loadCompanies();
      if (!isMounted) return;

      // Restore from localStorage
      let targetId: number | null = null;
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.companyId) {
            targetId = parsed.companyId;
          }
        }
      } catch (e) {
        console.warn("Failed reading localStorage:", e);
      }

      // If target exists in list or fallback to first item
      if (targetId && list.some((c) => c.id === targetId)) {
        await loadCompanyDetails(targetId, list);
      } else if (list.length > 0) {
        await loadCompanyDetails(list[0].id, list);
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [loadCompanies, loadCompanyDetails]);

  // Handle explicit selection
  const selectCompany = useCallback(
    async (companyId: number) => {
      await loadCompanyDetails(companyId, allCompanies);
    },
    [allCompanies, loadCompanyDetails]
  );

  return (
    <CompanyContext.Provider
      value={{
        selectedInfo,
        summary,
        profile,
        skills,
        allCompanies,
        selectCompany,
        isLoading,
        isProfileLoading,
        error,
        refreshCompanies: async () => {
          await loadCompanies();
        }
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
