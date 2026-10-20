import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { DbCompany, DbCompanyLogo } from "../types/database";
import { CompanySummary, asString, splitItems } from "../lib/companyData";
import { SEED_COMPANIES } from "../data/seedCompanies";

export function mapDbCompanyToSummary(
  comp: DbCompany,
  logoUrl?: string
): CompanySummary {
  // Infer placement tier / category from company attributes if not explicitly specified
  let tier = comp.company_type || "Dream";
  const cat = (comp.category || "").toLowerCase();
  if (cat.includes("fintech") || cat.includes("consulting") || cat.includes("storage")) {
    tier = "Super Dream";
  } else if (cat.includes("enterprise") || cat.includes("public")) {
    tier = "Dream";
  } else if (cat.includes("startup") || cat.includes("services")) {
    tier = "Standard";
  }

  return {
    id: comp.company_id,
    name: comp.name,
    shortName: comp.short_name || comp.name,
    logoUrl: logoUrl || (comp.website_url ? `https://logo.clearbit.com/${new URL(comp.website_url).hostname}` : ""),
    category: comp.category || "Technology & Consulting",
    companyType: tier,
    incorporationYear: comp.incorporation_year || "1989",
    employeeSize: comp.employee_size || "10,000+ employees",
    headquartersAddress: comp.headquarters_address || "Global Delivery Centers",
    operatingCountries: splitItems(comp.office_count ? `${comp.office_count} centers` : "Global"),
    officeLocations: splitItems(comp.headquarters_address),
    yoyGrowthRate: "5%",
    websiteUrl: comp.website_url || ""
  };
}

export async function fetchCompanies(
  searchTerm?: string,
  categoryFilter?: string,
  limit: number = 100
): Promise<{ data: CompanySummary[]; error: string | null }> {
  if (!isSupabaseConfigured) {
    console.warn("Supabase is not configured, falling back to seed companies");
    return {
      data: SEED_COMPANIES.map((c) => ({
        id: c.company_id,
        name: c.short_json.name,
        shortName: c.short_json.short_name,
        logoUrl: c.short_json.logo_url,
        category: c.short_json.category,
        companyType: c.short_json.company_type,
        incorporationYear: c.short_json.incorporation_year,
        employeeSize: c.short_json.employee_size,
        headquartersAddress: c.short_json.headquarters_address,
        operatingCountries: splitItems(c.short_json.operating_countries),
        officeLocations: splitItems(c.short_json.office_locations),
        yoyGrowthRate: c.short_json.yoy_growth_rate,
        websiteUrl: c.short_json.website_url
      })),
      error: null
    };
  }

  try {
    let query = supabase
      .from("companies")
      .select("*")
      .order("company_id", { ascending: true })
      .limit(limit);

    if (searchTerm && searchTerm.trim() !== "") {
      const term = `%${searchTerm.trim()}%`;
      query = query.or(`name.ilike.${term},short_name.ilike.${term},category.ilike.${term},headquarters_address.ilike.${term}`);
    }

    const { data: companiesData, error: compErr } = await query;

    if (compErr) {
      console.error("Error querying public.companies:", compErr);
      return { data: [], error: compErr.message };
    }

    if (!companiesData || companiesData.length === 0) {
      return { data: [], error: null };
    }

    // Retrieve logos in batch for these companies
    const companyIds = companiesData.map((c) => c.company_id);
    const { data: logosData } = await supabase
      .from("company_logo")
      .select("company_id, logo_url")
      .in("company_id", companyIds);

    const logoMap = new Map<number, string>();
    (logosData as DbCompanyLogo[] | null)?.forEach((item) => {
      if (item.logo_url) logoMap.set(item.company_id, item.logo_url);
    });

    const summaries: CompanySummary[] = companiesData.map((comp: DbCompany) => {
      const logo = logoMap.get(comp.company_id);
      return mapDbCompanyToSummary(comp, logo);
    });

    // Apply category filter if requested
    if (categoryFilter && categoryFilter !== "All") {
      const filtered = summaries.filter((c) => {
        const type = c.companyType.toLowerCase();
        if (categoryFilter === "Super Dream") return type.includes("super");
        if (categoryFilter === "Dream") return !type.includes("super") && type.includes("dream");
        if (categoryFilter === "Standard") return type.includes("standard");
        if (categoryFilter === "Regular") return type.includes("regular");
        return true;
      });
      return { data: filtered, error: null };
    }

    return { data: summaries, error: null };
  } catch (err: any) {
    console.error("Unexpected failure in fetchCompanies:", err);
    return { data: [], error: err.message || "Failed to fetch companies" };
  }
}

export async function fetchCompanyById(
  companyId: number
): Promise<{ data: CompanySummary | null; error: string | null }> {
  try {
    const { data: comp, error } = await supabase
      .from("companies")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle();

    if (error) {
      return { data: null, error: error.message };
    }

    if (!comp) {
      return { data: null, error: "Company not found" };
    }

    const { data: logo } = await supabase
      .from("company_logo")
      .select("logo_url")
      .eq("company_id", companyId)
      .maybeSingle();

    return { data: mapDbCompanyToSummary(comp, logo?.logo_url), error: null };
  } catch (err: any) {
    return { data: null, error: err.message || "Failed to fetch company by id" };
  }
}
