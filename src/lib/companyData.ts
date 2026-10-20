import { RawShortJson, RawSkillLevel } from "../data/seedCompanies";
import { getSkillRoadmap, SkillTopicLevel } from "../data/skillTopics";

export interface CompanySummary {
  id: number;
  name: string;
  shortName: string;
  logoUrl: string;
  category: string;
  companyType: "Super Dream" | "Dream" | "Standard" | "Regular" | string;
  incorporationYear: number | string;
  employeeSize: string;
  headquartersAddress: string;
  operatingCountries: string[];
  officeLocations: string[];
  yoyGrowthRate: string;
  websiteUrl: string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  shortName: string;
  logoUrl: string;
  category: string;
  companyType: string;
  natureOfCompany: string;
  incorporationYear: number | string;
  overviewText: string;
  headquartersAddress: string;
  operatingCountries: string[];
  officeCount: string;
  officeLocations: string[];
  employeeSize: string;
  visionStatement: string;
  missionStatement: string;
  coreValues: string[];
  historyTimeline: string[];
  recentNews: string[];

  // Digital Presence
  websiteUrl: string;
  linkedinUrl: string;
  twitterHandle: string;
  facebookUrl: string;
  instagramUrl: string;
  primaryContactEmail: string;
  primaryPhoneNumber: string;

  // Risk & Compliance
  regulatoryStatus: string[];
  legalIssues: string;
  esgRatings: string[];
  supplyChainDependencies: string[];
  geopoliticalRisks: string[];
  macroRisks: string[];
  carbonFootprint: string;
  ethicalSourcing: string[];

  // Brand & Ratings
  marketingVideoUrl: string;
  customerTestimonials: string[];
  websiteQuality: string;
  websiteRating: string;
  websiteTrafficRank: string;
  socialMediaFollowers: string;
  glassdoorRating: string;
  indeedRating: string;
  googleRating: string;
  awardsRecognitions: string[];
  brandSentimentScore: string;
  eventParticipation: string[];

  // Products & Services
  painPointsAddressed: string[];
  focusSectors: string[];
  offeringsDescription: string[];
  topCustomers: string[];
  coreValueProposition: string[];
  uniqueDifferentiators: string[];
  competitiveAdvantages: string[];
  weaknessesGaps: string[];
  keyChallengesNeeds: string[];
  keyCompetitors: string[];
  marketSharePercentage: string;
  salesMotion: string;
  customerConcentrationRisk: string;
  exitStrategyHistory: string;
  benchmarkVsPeers: string;
  futureProjections: string;
  tam: string;
  sam: string;
  som: string;
  annualRevenue: string;
  annualProfit: string;
  marketValuation: string;
  yoyGrowthRate: string;
  profitabilityStatus: string;
  keyInvestors: string[];
  recentFundingRounds: string;
  totalCapitalRaised: string;
  customerAcquisitionCost: string;
  cacLtvRatio: string;
  churnRate: string;
  netPromoterScore: string;
  burnRate: string;
  runwayMonths: string;
  burnMultiplier: string;

  // Work Location
  remotePolicyDetails: string;
  typicalHours: string;
  overtimeExpectations: string;
  weekendWork: string;
  flexibilityLevel: string[];
  locationCentrality: string;
  publicTransportAccess: string[];
  cabPolicy: string[];
  airportCommuteTime: string;
  officeZoneType: string;
  areaSafety: string;
  safetyPolicies: string[];
  infrastructureSafety: string[];
  emergencyPreparedness: string[];

  // Leadership
  ceoName: string;
  ceoLinkedinUrl: string;
  keyLeaders: string[];
  warmIntroPathways: string[];
  decisionMakerAccess: string;
  contactPersonName: string;
  contactPersonTitle: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  boardMembers: string[];

  // Career Growth & Tech Stack
  trainingSpend: string;
  aiMlAdoptionLevel: string;
  techStack: string[];
  cybersecurityPosture: string[];
  partnershipEcosystem: string[];
  techAdoptionRating: string;

  // Raw fields fallback map
  raw: Record<string, any>;
}

export type BloomLevel = "CU" | "AP" | "AS" | "EV" | "CR";
export type CriticalityLevel = "Critical" | "Important" | "Baseline";
export type DifficultyLevel = "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER";

export interface DashboardSkill {
  skillSetId: number;
  name: string;
  score: number; // 1-10
  requiredProficiency: string;
  bloom: BloomLevel;
  bloomLabel: string;
  bloomColor: string;
  bloomBgColor: string;
  criticality: CriticalityLevel;
  criticalityColor: string;
  criticalityBg: string;
  difficulty: DifficultyLevel;
  roadmap: SkillTopicLevel[];
}

// Helpers
export function asString(val: any): string {
  if (val === null || val === undefined) return "";
  return String(val).trim();
}

export function asRecord(val: any): Record<string, any> {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return val;
  }
  return {};
}

export function splitItems(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.map((x) => String(x).trim()).filter(Boolean);
  }
  const str = String(val).trim();
  if (str === "" || isNullish(str)) return [];
  
  // Split on semicolons, newlines, or bullets
  const parts = str
    .split(/[\n;\u2022\u25E6]/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length > 1) return parts;

  // If there's commas and looks like a list
  if (str.includes(",") && !str.includes("http") && !str.startsWith("$")) {
    const commaParts = str.split(",").map((s) => s.trim()).filter(Boolean);
    if (commaParts.length > 1) return commaParts;
  }

  return [str];
}

export function titleCaseFromCode(code: string): string {
  return code
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isNullish(val: any): boolean {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === "" ||
    s === "na" ||
    s === "n/a" ||
    s === "none" ||
    s === "-" ||
    s === "null" ||
    s === "undefined" ||
    s === "not available"
  );
}

export function scoreToDifficulty(score: number): DifficultyLevel {
  if (score >= 8) return "EXPERT";
  if (score >= 6) return "ADVANCED";
  if (score >= 4) return "PRO";
  return "BEGINNER";
}

export function proficiencyToBloom(level: number): {
  bloom: BloomLevel;
  bloomLabel: string;
  bloomColor: string;
  bloomBgColor: string;
} {
  if (level <= 2) {
    return {
      bloom: "CU",
      bloomLabel: "Cognitive Understanding",
      bloomColor: "#3b82f6",
      bloomBgColor: "rgba(59, 130, 246, 0.12)"
    };
  }
  if (level <= 4) {
    return {
      bloom: "AP",
      bloomLabel: "Application",
      bloomColor: "#22c55e",
      bloomBgColor: "rgba(34, 197, 94, 0.12)"
    };
  }
  if (level <= 6) {
    return {
      bloom: "AS",
      bloomLabel: "Analysis",
      bloomColor: "#eab308",
      bloomBgColor: "rgba(234, 179, 8, 0.12)"
    };
  }
  if (level <= 8) {
    return {
      bloom: "EV",
      bloomLabel: "Evaluation",
      bloomColor: "#ef4444",
      bloomBgColor: "rgba(239, 68, 68, 0.12)"
    };
  }
  return {
    bloom: "CR",
    bloomLabel: "Creation",
    bloomColor: "#a855f7",
    bloomBgColor: "rgba(168, 85, 247, 0.12)"
  };
}

export function scoreToCriticality(score: number): {
  criticality: CriticalityLevel;
  criticalityColor: string;
  criticalityBg: string;
} {
  if (score >= 7) {
    return {
      criticality: "Critical",
      criticalityColor: "text-red-700 dark:text-red-400",
      criticalityBg: "bg-red-50 text-red-700 border-red-200"
    };
  }
  if (score >= 5) {
    return {
      criticality: "Important",
      criticalityColor: "text-amber-700 dark:text-amber-400",
      criticalityBg: "bg-amber-50 text-amber-700 border-amber-200"
    };
  }
  return {
    criticality: "Baseline",
    criticalityColor: "text-slate-600 dark:text-slate-400",
    criticalityBg: "bg-slate-50 text-slate-700 border-slate-200"
  };
}

export function getCategoryHex(type: string): string {
  const norm = type.toLowerCase().trim();
  if (norm.includes("super")) return "#7c3aed"; // Super Dream
  if (norm.includes("dream")) return "#2563eb"; // Dream
  if (norm.includes("standard")) return "#16a34a"; // Standard
  if (norm.includes("regular")) return "#d97706"; // Regular
  return "#2563eb";
}

// Normalizers
export function normalizeCompanySummary(shortJson: RawShortJson, id: number = 1): CompanySummary {
  return {
    id,
    name: asString(shortJson.name),
    shortName: asString(shortJson.short_name || shortJson.name),
    logoUrl: asString(shortJson.logo_url),
    category: asString(shortJson.category || "Enterprise"),
    companyType: asString(shortJson.company_type || "Dream"),
    incorporationYear: shortJson.incorporation_year || "1989",
    employeeSize: asString(shortJson.employee_size),
    headquartersAddress: asString(shortJson.headquarters_address),
    operatingCountries: splitItems(shortJson.operating_countries),
    officeLocations: splitItems(shortJson.office_locations),
    yoyGrowthRate: asString(shortJson.yoy_growth_rate),
    websiteUrl: asString(shortJson.website_url)
  };
}

export function normalizeCompanyProfile(
  fullJson: Record<string, any>,
  shortJson: RawShortJson,
  id: number = 1
): CompanyProfile {
  const merged: Record<string, any> = { ...asRecord(shortJson), ...asRecord(fullJson) };

  return {
    id,
    name: asString(merged.name),
    shortName: asString(merged.short_name || merged.name),
    logoUrl: asString(merged.logo_url),
    category: asString(merged.category || "Enterprise"),
    companyType: asString(merged.company_type || "Dream"),
    natureOfCompany: asString(merged.nature_of_company || "Public"),
    incorporationYear: merged.incorporation_year || "1989",
    overviewText: asString(merged.overview_text),
    headquartersAddress: asString(merged.headquarters_address),
    operatingCountries: splitItems(merged.operating_countries),
    officeCount: asString(merged.office_count || "200+"),
    officeLocations: splitItems(merged.office_locations),
    employeeSize: asString(merged.employee_size),
    visionStatement: asString(merged.vision_statement),
    missionStatement: asString(merged.mission_statement),
    coreValues: splitItems(merged.core_values),
    historyTimeline: splitItems(merged.history_timeline),
    recentNews: splitItems(merged.recent_news),

    // Digital Presence
    websiteUrl: asString(merged.website_url),
    linkedinUrl: asString(merged.linkedin_url),
    twitterHandle: asString(merged.twitter_handle),
    facebookUrl: asString(merged.facebook_url),
    instagramUrl: asString(merged.instagram_url),
    primaryContactEmail: asString(merged.primary_contact_email),
    primaryPhoneNumber: asString(merged.primary_phone_number),

    // Risk & Compliance
    regulatoryStatus: splitItems(merged.regulatory_status),
    legalIssues: asString(merged.legal_issues),
    esgRatings: splitItems(merged.esg_ratings),
    supplyChainDependencies: splitItems(merged.supply_chain_dependencies),
    geopoliticalRisks: splitItems(merged.geopolitical_risks),
    macroRisks: splitItems(merged.macro_risks),
    carbonFootprint: asString(merged.carbon_footprint),
    ethicalSourcing: splitItems(merged.ethical_sourcing),

    // Brand & Ratings
    marketingVideoUrl: asString(merged.marketing_video_url),
    customerTestimonials: splitItems(merged.customer_testimonials),
    websiteQuality: asString(merged.website_quality),
    websiteRating: asString(merged.website_rating),
    websiteTrafficRank: asString(merged.website_traffic_rank),
    socialMediaFollowers: asString(merged.social_media_followers),
    glassdoorRating: asString(merged.glassdoor_rating),
    indeedRating: asString(merged.indeed_rating),
    googleRating: asString(merged.google_rating),
    awardsRecognitions: splitItems(merged.awards_recognitions),
    brandSentimentScore: asString(merged.brand_sentiment_score),
    eventParticipation: splitItems(merged.event_participation),

    // Products & Services & Market
    painPointsAddressed: splitItems(merged.pain_points_addressed),
    focusSectors: splitItems(merged.focus_sectors),
    offeringsDescription: splitItems(merged.offerings_description),
    topCustomers: splitItems(merged.top_customers),
    coreValueProposition: splitItems(merged.core_value_proposition),
    uniqueDifferentiators: splitItems(merged.unique_differentiators),
    competitiveAdvantages: splitItems(merged.competitive_advantages),
    weaknessesGaps: splitItems(merged.weaknesses_gaps),
    keyChallengesNeeds: splitItems(merged.key_challenges_needs),
    keyCompetitors: splitItems(merged.key_competitors),
    marketSharePercentage: asString(merged.market_share_percentage),
    salesMotion: asString(merged.sales_motion),
    customerConcentrationRisk: asString(merged.customer_concentration_risk),
    exitStrategyHistory: asString(merged.exit_strategy_history),
    benchmarkVsPeers: asString(merged.benchmark_vs_peers),
    futureProjections: asString(merged.future_projections),
    tam: asString(merged.tam),
    sam: asString(merged.sam),
    som: asString(merged.som),
    annualRevenue: asString(merged.annual_revenue),
    annualProfit: asString(merged.annual_profit),
    marketValuation: asString(merged.market_valuation),
    yoyGrowthRate: asString(merged.yoy_growth_rate),
    profitabilityStatus: asString(merged.profitability_status),
    keyInvestors: splitItems(merged.key_investors),
    recentFundingRounds: asString(merged.recent_funding_rounds),
    totalCapitalRaised: asString(merged.total_capital_raised),
    customerAcquisitionCost: asString(merged.customer_acquisition_cost),
    cacLtvRatio: asString(merged.cac_ltv_ratio),
    churnRate: asString(merged.churn_rate),
    netPromoterScore: asString(merged.net_promoter_score),
    burnRate: asString(merged.burn_rate),
    runwayMonths: asString(merged.runway_months),
    burnMultiplier: asString(merged.burn_multiplier),

    // Work Location & Safety
    remotePolicyDetails: asString(merged.remote_policy_details),
    typicalHours: asString(merged.typical_hours),
    overtimeExpectations: asString(merged.overtime_expectations),
    weekendWork: asString(merged.weekend_work),
    flexibilityLevel: splitItems(merged.flexibility_level),
    locationCentrality: asString(merged.location_centrality),
    publicTransportAccess: splitItems(merged.public_transport_access),
    cabPolicy: splitItems(merged.cab_policy),
    airportCommuteTime: asString(merged.airport_commute_time),
    officeZoneType: asString(merged.office_zone_type),
    areaSafety: asString(merged.area_safety),
    safetyPolicies: splitItems(merged.safety_policies),
    infrastructureSafety: splitItems(merged.infrastructure_safety),
    emergencyPreparedness: splitItems(merged.emergency_preparedness),

    // Leadership
    ceoName: asString(merged.ceo_name),
    ceoLinkedinUrl: asString(merged.ceo_linkedin_url),
    keyLeaders: splitItems(merged.key_leaders),
    warmIntroPathways: splitItems(merged.warm_intro_pathways),
    decisionMakerAccess: asString(merged.decision_maker_access),
    contactPersonName: asString(merged.contact_person_name),
    contactPersonTitle: asString(merged.contact_person_title),
    contactPersonEmail: asString(merged.contact_person_email),
    contactPersonPhone: asString(merged.contact_person_phone),
    boardMembers: splitItems(merged.board_members),

    // Career Growth & Tech Stack
    trainingSpend: asString(merged.training_spend),
    aiMlAdoptionLevel: asString(merged.ai_ml_adoption_level),
    techStack: splitItems(merged.tech_stack),
    cybersecurityPosture: splitItems(merged.cybersecurity_posture),
    partnershipEcosystem: splitItems(merged.partnership_ecosystem),
    techAdoptionRating: asString(merged.tech_adoption_rating),

    raw: merged
  };
}

export function normalizeDashboardSkills(skillLevels: RawSkillLevel[]): DashboardSkill[] {
  return (skillLevels || []).map((s) => {
    const score = Number(s.required_level) || 5;
    const bloomInfo = proficiencyToBloom(score);
    const critInfo = scoreToCriticality(score);
    const diff = scoreToDifficulty(score);
    const roadmap = getSkillRoadmap(s.skill_set_id, s.skill_set_name);

    return {
      skillSetId: s.skill_set_id,
      name: s.skill_set_name,
      score,
      requiredProficiency: s.required_proficiency || `${diff}`,
      bloom: bloomInfo.bloom,
      bloomLabel: bloomInfo.bloomLabel,
      bloomColor: bloomInfo.bloomColor,
      bloomBgColor: bloomInfo.bloomBgColor,
      criticality: critInfo.criticality,
      criticalityColor: critInfo.criticalityColor,
      criticalityBg: critInfo.criticalityBg,
      difficulty: diff,
      roadmap
    };
  });
}
