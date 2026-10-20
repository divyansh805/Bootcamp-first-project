import { describe, it, expect } from "vitest";
import { SEED_COMPANIES } from "./data/seedCompanies";
import {
  normalizeCompanySummary,
  normalizeCompanyProfile,
  normalizeDashboardSkills,
  proficiencyToBloom,
  scoreToCriticality
} from "./lib/companyData";
import { buildIntelligenceSections } from "./data/intelligenceData";
import { SKILL_TOPICS_ROADMAP } from "./data/skillTopics";

describe("JSSATEN Placement Intelligence Hub Smoke Tests", () => {
  it("loads seed company record and normalizes summary correctly", () => {
    expect(SEED_COMPANIES.length).toBeGreaterThanOrEqual(1);
    const accenture = SEED_COMPANIES[0];
    expect(accenture.short_json.name).toBe("Accenture plc");

    const summary = normalizeCompanySummary(accenture.short_json, accenture.company_id);
    expect(summary.name).toBe("Accenture plc");
    expect(summary.shortName).toBe("Accenture");
    expect(summary.companyType).toBe("Dream");
    expect(summary.employeeSize).toContain("740,000");
  });

  it("normalizes company profile and generates all 22 intelligence sections", () => {
    const raw = SEED_COMPANIES[0];
    const profile = normalizeCompanyProfile(raw.full_json, raw.short_json, raw.company_id);
    const sections = buildIntelligenceSections(profile);

    expect(sections.length).toBe(22);
    expect(sections[0].title).toBe("Company Identity");
    expect(sections[21].title).toBe("Contact Information");

    // Strictly ensure no CTC, Stipend, or Selection Ratio are present in any field label
    sections.forEach((sec) => {
      sec.fields.forEach((field) => {
        const labelLower = field.label.toLowerCase();
        expect(labelLower).not.toContain("ctc");
        expect(labelLower).not.toContain("stipend");
        expect(labelLower).not.toContain("selection ratio");
      });
    });
  });

  it("normalizes all 12 skill levels and verifies 10-level topic ladders", () => {
    const raw = SEED_COMPANIES[0];
    const skills = normalizeDashboardSkills(raw.skill_levels);

    expect(skills.length).toBe(12);

    skills.forEach((skill) => {
      expect(skill.score).toBeGreaterThanOrEqual(1);
      expect(skill.score).toBeLessThanOrEqual(10);
      expect(skill.roadmap.length).toBe(10);
      expect(SKILL_TOPICS_ROADMAP[skill.skillSetId]).toBeDefined();
    });
  });

  it("computes bloom levels and criticality according to specs", () => {
    // 1-2 -> CU
    expect(proficiencyToBloom(1).bloom).toBe("CU");
    expect(proficiencyToBloom(2).bloom).toBe("CU");

    // 3-4 -> AP
    expect(proficiencyToBloom(3).bloom).toBe("AP");
    expect(proficiencyToBloom(4).bloom).toBe("AP");

    // 5-6 -> AS
    expect(proficiencyToBloom(5).bloom).toBe("AS");
    expect(proficiencyToBloom(6).bloom).toBe("AS");

    // 7-8 -> EV
    expect(proficiencyToBloom(7).bloom).toBe("EV");
    expect(proficiencyToBloom(8).bloom).toBe("EV");

    // 9-10 -> CR
    expect(proficiencyToBloom(9).bloom).toBe("CR");
    expect(proficiencyToBloom(10).bloom).toBe("CR");

    // Criticality
    expect(scoreToCriticality(8).criticality).toBe("Critical");
    expect(scoreToCriticality(7).criticality).toBe("Critical");
    expect(scoreToCriticality(6).criticality).toBe("Important");
    expect(scoreToCriticality(5).criticality).toBe("Important");
    expect(scoreToCriticality(4).criticality).toBe("Baseline");
  });

  it("verifies supabase client initialization and service mapping", async () => {
    const { supabase, isSupabaseConfigured } = await import("./lib/supabase");
    expect(supabase).toBeDefined();
    expect(typeof supabase.from).toBe("function");

    const { mapDbCompanyToSummary } = await import("./services/companyService");
    const testComp = {
      company_id: 999,
      name: "Acme Analytics",
      short_name: "Acme",
      category: "FinTech Enterprise",
      headquarters_address: "New York, USA",
      employee_size: "5,000 employees"
    };

    const summary = mapDbCompanyToSummary(testComp, "https://example.com/logo.png");
    expect(summary.id).toBe(999);
    expect(summary.name).toBe("Acme Analytics");
    expect(summary.logoUrl).toBe("https://example.com/logo.png");
    expect(summary.companyType).toBe("Super Dream");
  });
});

