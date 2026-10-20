import React from "react";
import {
  Building2,
  Compass,
  Users2,
  Coins,
  Globe2,
  Layers,
  Cpu,
  Network,
  Swords,
  TrendingUp,
  Leaf,
  Smile,
  Newspaper,
  BarChart3,
  ShieldAlert,
  MapPin,
  HeartHandshake,
  GraduationCap,
  Award,
  Gift,
  Share2,
  Mail
} from "lucide-react";
import { CompanyProfile } from "../lib/companyData";

export interface IntelligenceField {
  id: string;
  label: string;
  value: string | string[];
  type?: "text" | "list" | "url" | "video" | "email" | "rating" | "tags";
}

export interface IntelligenceSection {
  id: string;
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: IntelligenceField[];
}

export function buildIntelligenceSections(profile?: CompanyProfile): IntelligenceSection[] {
  const p = profile;

  return [
    // 1. Company Identity
    {
      id: "company-identity",
      number: 1,
      title: "Company Identity",
      icon: Building2,
      fields: [
        { id: "full_name", label: "Legal Name", value: p?.name || "Not Available" },
        { id: "short_name", label: "Display Name", value: p?.shortName || "Not Available" },
        { id: "company_type", label: "Campus Tier Category", value: p?.companyType || "Dream" },
        { id: "nature", label: "Company Structure", value: p?.natureOfCompany || "Public" },
        { id: "category", label: "Industry Classification", value: p?.category || "Enterprise IT & Consulting" },
        { id: "founded", label: "Incorporation Year", value: String(p?.incorporationYear || "1989") }
      ]
    },

    // 2. Overview & Vision
    {
      id: "overview-vision",
      number: 2,
      title: "Overview & Vision",
      icon: Compass,
      fields: [
        { id: "overview", label: "Corporate Overview", value: p?.overviewText || "Not Available" },
        { id: "vision", label: "Vision Statement", value: p?.visionStatement || "Not Available" },
        { id: "mission", label: "Mission Statement", value: p?.missionStatement || "Not Available" },
        { id: "core_values", label: "Core Principles & Values", value: p?.coreValues && p.coreValues.length ? p.coreValues : ["Client value creation", "Integrity", "Respect for individuals", "Innovation", "Stewardship", "Best people"], type: "tags" },
        { id: "milestones", label: "Historical Trajectory", value: p?.historyTimeline || [] }
      ]
    },

    // 3. Leadership
    {
      id: "leadership",
      number: 3,
      title: "Leadership",
      icon: Users2,
      fields: [
        { id: "ceo", label: "Chief Executive Officer", value: p?.ceoName || "Not Available" },
        { id: "ceo_linkedin", label: "CEO Profile", value: p?.ceoLinkedinUrl || "", type: "url" },
        { id: "key_leaders", label: "Executive Leadership Team", value: p?.keyLeaders || ["Julie Sweet, Chair & CEO", "Manish Sharma, CEO", "Jack Azagury, Group Chief Executive"], type: "list" },
        { id: "board", label: "Board Members", value: p?.boardMembers || [], type: "tags" },
        { id: "access", label: "Executive Decision-Maker Access", value: p?.decisionMakerAccess || "Low, Large enterprise structure with formal procurement" },
        { id: "warm_intros", label: "Warm Intro & Engagement Pathways", value: p?.warmIntroPathways || ["Fortune 500 board connections", "Alumni network", "Technology partner ecosystems"], type: "tags" }
      ]
    },

    // 4. Funding & Financials
    {
      id: "funding-financials",
      number: 4,
      title: "Funding & Financials",
      icon: Coins,
      fields: [
        { id: "market_cap", label: "Market Valuation", value: p?.marketValuation || "$220B market capitalization" },
        { id: "annual_revenue", label: "Annual Revenue", value: p?.annualRevenue || "$64.1B (FY2024)" },
        { id: "annual_profit", label: "Annual Net Profit", value: p?.annualProfit || "$7.3B net income" },
        { id: "profitability", label: "Profitability Status", value: p?.profitabilityStatus || "Profitable" },
        { id: "growth_rate", label: "YoY Growth Rate", value: p?.yoyGrowthRate || "3%" },
        { id: "capital_raised", label: "Total Capital Raised", value: p?.totalCapitalRaised || "Public market funded" },
        { id: "key_investors", label: "Key Institutional Investors", value: p?.keyInvestors || ["Vanguard Group", "BlackRock", "State Street"], type: "tags" },
        { id: "funding_round", label: "Funding History & Markets", value: p?.recentFundingRounds || "Public equity markets, ongoing institutional investment" }
      ]
    },

    // 5. Global Presence
    {
      id: "global-presence",
      number: 5,
      title: "Global Presence",
      icon: Globe2,
      fields: [
        { id: "hq", label: "Global Corporate Headquarters", value: p?.headquartersAddress || "Dublin, Ireland" },
        { id: "countries", label: "Operating Countries", value: p?.operatingCountries || ["United States", "United Kingdom", "India", "Germany", "France", "Japan", "Australia", "Canada", "Brazil", "Singapore"], type: "tags" },
        { id: "office_count", label: "Total Office Hubs", value: p?.officeCount || "200+" },
        { id: "major_offices", label: "Key Regional Delivery Centers", value: p?.officeLocations || ["New York, US", "London, UK", "Bangalore, India", "Paris, France", "Tokyo, Japan", "Toronto, Canada", "Sydney, Australia", "Frankfurt, Germany"], type: "list" },
        { id: "workforce_size", label: "Global Workforce Count", value: p?.employeeSize || "740,000 employees" }
      ]
    },

    // 6. Products & Services
    {
      id: "products-services",
      number: 6,
      title: "Products & Services",
      icon: Layers,
      fields: [
        { id: "core_offerings", label: "Core Enterprise Offerings", value: p?.offeringsDescription || ["Management Consulting", "Technology Services", "Cloud Solutions", "AI & Analytics", "Cybersecurity", "Business Process Outsourcing", "Digital Engineering"], type: "tags" },
        { id: "focus_sectors", label: "Target Industry Sectors", value: p?.focusSectors || ["Financials", "Health Care", "Consumer Discretionary", "Industrials", "Energy", "Telecommunications", "Public Sector", "Technology"], type: "tags" },
        { id: "top_customers", label: "Client Segments Served", value: p?.topCustomers || ["Fortune 500 Enterprises", "Global Banks", "Government Agencies", "Healthcare Systems", "Telecom Operators", "Energy Majors"], type: "list" },
        { id: "pain_points", label: "Client Pain Points Solved", value: p?.painPointsAddressed || ["Digital transformation complexity", "Legacy IT modernization", "Cloud migration risk", "Talent and skill gaps", "Cybersecurity threats"], type: "list" }
      ]
    },

    // 7. Technology Stack
    {
      id: "technology-stack",
      number: 7,
      title: "Technology Stack",
      icon: Cpu,
      fields: [
        { id: "stack", label: "Enterprise Tech Stack & Platforms", value: p?.techStack || ["SAP", "Salesforce", "AWS", "Microsoft Azure", "ServiceNow", "Kubernetes", "Python"], type: "tags" },
        { id: "ai_adoption", label: "AI & GenAI Implementation Level", value: p?.aiMlAdoptionLevel || "High, generative AI platforms, AI-led consulting, automation for delivery optimization" },
        { id: "tech_rating", label: "Technology Adoption Rating", value: p?.techAdoptionRating || "High, Industry Leader; Top-tier among peers" },
        { id: "cyber_posture", label: "Cybersecurity Posture & Certifications", value: p?.cybersecurityPosture || ["ISO 27001", "SOC 2", "Global cyber defense centers"], type: "tags" }
      ]
    },

    // 8. Partnerships & Ecosystem
    {
      id: "partnerships-ecosystem",
      number: 8,
      title: "Partnerships & Ecosystem",
      icon: Network,
      fields: [
        { id: "strategic_partners", label: "Strategic Alliance Partners", value: p?.partnershipEcosystem || ["Microsoft", "SAP", "Oracle", "Google", "AWS", "Salesforce"], type: "tags" },
        { id: "differentiators", label: "Ecosystem Differentiators", value: p?.uniqueDifferentiators || ["Global delivery network", "Industry-specific consulting", "Strong alliance ecosystem", "Proprietary AI and analytics platforms"], type: "list" }
      ]
    },

    // 9. Competitive Landscape
    {
      id: "competitive-landscape",
      number: 9,
      title: "Competitive Landscape",
      icon: Swords,
      fields: [
        { id: "competitors", label: "Key Global Competitors", value: p?.keyCompetitors || ["IBM Consulting", "Deloitte", "TCS", "Infosys", "Capgemini", "Cognizant", "Wipro", "PwC", "EY"], type: "tags" },
        { id: "market_share", label: "Global IT Services Market Share", value: p?.marketSharePercentage || "6–7% of global IT services market" },
        { id: "benchmark", label: "Benchmark Against Peers", value: p?.benchmarkVsPeers || "Higher revenue than Capgemini; Comparable margins to IBM Consulting; Stronger cloud alliances than TCS" },
        { id: "advantages", label: "Competitive Advantages & Moat", value: p?.competitiveAdvantages || ["Brand leadership", "Scale and geographic reach", "Deep enterprise relationships", "Strong partner network"], type: "tags" },
        { id: "weaknesses", label: "Vulnerabilities & Operational Gaps", value: p?.weaknessesGaps || ["High cost structure", "Dependency on large enterprise spending cycles", "Complex organizational structure"], type: "list" }
      ]
    },

    // 10. Market Opportunity
    {
      id: "market-opportunity",
      number: 10,
      title: "Market Opportunity",
      icon: TrendingUp,
      fields: [
        { id: "tam", label: "Total Addressable Market (TAM)", value: p?.tam || "$1.5T global IT and business services" },
        { id: "sam", label: "Serviceable Addressable Market (SAM)", value: p?.sam || "$400B enterprise consulting and digital core" },
        { id: "som", label: "Serviceable Obtainable Market (SOM)", value: p?.som || "$64.1B (FY2024)" },
        { id: "future_proj", label: "Growth Projections & Strategic Outlook", value: p?.futureProjections || "Revenue projected mid-single-digit CAGR driven by GenAI & Managed Services" }
      ]
    },

    // 11. Core Value Proposition & ESG
    {
      id: "value-prop-esg",
      number: 11,
      title: "Core Value Proposition & ESG",
      icon: Leaf,
      fields: [
        { id: "value_prop", label: "Value Proposition", value: p?.coreValueProposition || ["End-to-end transformation", "Global delivery scale", "Deep industry expertise", "Strong technology partnerships"], type: "list" },
        { id: "esg", label: "ESG Commitments & Accreditations", value: p?.esgRatings || ["Net-zero commitment by 2025", "Science Based Targets", "Diversity equity programs"], type: "tags" },
        { id: "carbon", label: "Carbon Footprint Strategy", value: p?.carbonFootprint || "Actively reducing via renewable energy sourcing" },
        { id: "ethical_sourcing", label: "Ethical Sourcing & Standards", value: p?.ethicalSourcing || ["Supplier code of conduct", "ESG audits"], type: "tags" }
      ]
    },

    // 12. Culture & Work Life
    {
      id: "culture-work-life",
      number: 12,
      title: "Culture & Work Life",
      icon: Smile,
      fields: [
        { id: "remote_policy", label: "Work Model & Flexibility", value: p?.remotePolicyDetails || "Hybrid, 60% flexible" },
        { id: "hours", label: "Standard Work Hours", value: p?.typicalHours || "Flexible project-aligned schedules" },
        { id: "overtime", label: "Overtime Expectations", value: p?.overtimeExpectations || "Occasional during critical project peaks" },
        { id: "weekend", label: "Weekend Work Policy", value: p?.weekendWork || "Rare" },
        { id: "flex_levels", label: "Supported Modes", value: p?.flexibilityLevel || ["Remote", "Hybrid", "In-office"], type: "tags" }
      ]
    },

    // 13. Recent News & Milestones
    {
      id: "recent-news",
      number: 13,
      title: "Recent News & Milestones",
      icon: Newspaper,
      fields: [
        { id: "news", label: "Recent Corporate Updates & Announcements", value: p?.recentNews || ["2024, Invested $3B in generative AI strategy", "2024, Acquired multiple cloud and AI consulting firms in Europe"], type: "list" },
        { id: "strategic_history", label: "Key Strategic Milestones", value: p?.historyTimeline || ["One of the largest employers of tech talent globally", "Invests over $1B annually in R&D and innovation"], type: "list" }
      ]
    },

    // 14. Sales & Customer Metrics
    {
      id: "sales-metrics",
      number: 14,
      title: "Sales & Customer Metrics",
      icon: BarChart3,
      fields: [
        { id: "sales_motion", label: "Primary Sales Motion", value: p?.salesMotion || "Enterprise Field Sales & Partner Co-selling" },
        { id: "concentration", label: "Customer Concentration Risk", value: p?.customerConcentrationRisk || "No, highly diversified client base" },
        { id: "cac", label: "Customer Acquisition Benchmark", value: p?.customerAcquisitionCost || "$5M+" },
        { id: "churn", label: "Annual Client Churn Rate", value: p?.churnRate || "<3%" },
        { id: "nps", label: "Net Promoter Score (NPS)", value: p?.netPromoterScore ? `${p.netPromoterScore} / 100` : "60 / 100" }
      ]
    },

    // 15. Risk & Compliance
    {
      id: "risk-compliance",
      number: 15,
      title: "Risk & Compliance",
      icon: ShieldAlert,
      fields: [
        { id: "regulatory", label: "Global Compliance Certifications", value: p?.regulatoryStatus || ["ISO 27001", "SOC 2", "GDPR Compliance", "HIPAA Compliance"], type: "tags" },
        { id: "legal", label: "Legal & Regulatory Overview", value: p?.legalIssues || "Periodic labor and contract disputes; no major unresolved global litigation" },
        { id: "supply_chain", label: "Critical Supply Chain Dependencies", value: p?.supplyChainDependencies || ["Cloud providers", "Software vendors", "Talent workforce"], type: "tags" },
        { id: "geopolitical", label: "Geopolitical & Cross-Border Risks", value: p?.geopoliticalRisks || ["Trade regulations", "Data privacy laws", "Regional conflicts"], type: "tags" },
        { id: "macro", label: "Macroeconomic Sensitivity", value: p?.macroRisks || ["Global recession", "Enterprise IT budget cuts"], type: "tags" }
      ]
    },

    // 16. Work Location & Commute
    {
      id: "work-location",
      number: 16,
      title: "Work Location & Commute",
      icon: MapPin,
      fields: [
        { id: "zone_type", label: "Campus Zone & Facility Type", value: p?.officeZoneType || "Prime Tech Park / IT Hub" },
        { id: "centrality", label: "Location Centrality", value: p?.locationCentrality || "Central business districts & technology clusters" },
        { id: "public_transit", label: "Public Transit Access", value: p?.publicTransportAccess || ["Metro", "Bus", "Commuter Train"], type: "tags" },
        { id: "cab_policy", label: "Corporate Commute Assistance", value: p?.cabPolicy || ["Ride-hailing reimbursement", "Company shuttle buses"], type: "tags" },
        { id: "airport_time", label: "Transit Time to Nearest Airport", value: p?.airportCommuteTime || "45 minutes" }
      ]
    },

    // 17. Safety & Wellbeing
    {
      id: "safety-wellbeing",
      number: 17,
      title: "Safety & Wellbeing",
      icon: HeartHandshake,
      fields: [
        { id: "area_safety", label: "Facility Safety Rating", value: p?.areaSafety || "Secure; 24/7 Monitored campus" },
        { id: "safety_policies", label: "Workplace & Night Safety Guidelines", value: p?.safetyPolicies || ["Late-night transport escort", "Workplace security protocols"], type: "tags" },
        { id: "infrastructure_safety", label: "Campus Infrastructure Safety", value: p?.infrastructureSafety || ["Fire safety compliant", "RFID biometric secure access"], type: "tags" },
        { id: "emergency", label: "Emergency & Medical Response", value: p?.emergencyPreparedness || ["On-site medical emergency support", "Scheduled emergency drills"], type: "tags" }
      ]
    },

    // 18. Career Growth & Learning
    {
      id: "career-growth",
      number: 18,
      title: "Career Growth & Learning",
      icon: GraduationCap,
      fields: [
        { id: "training_budget", label: "Annual L&D Training Spend", value: p?.trainingSpend || "$1.5B annually" },
        { id: "cert_support", label: "Global Certification Sponsorship", value: "Comprehensive sponsorship for major certifications (AWS, Azure, GCP, Salesforce, Agile)" },
        { id: "internal_mobility", label: "Role & Global Mobility Opportunities", value: "Formal international transfer and internal project exchange ladders" },
        { id: "leadership_tracks", label: "Technical Mentorship Tracks", value: "Structured cohort-based mentorship with Senior Managing Directors and Architects" }
      ]
    },

    // 19. Brand & Reputation
    {
      id: "brand-reputation",
      number: 19,
      title: "Brand & Reputation",
      icon: Award,
      fields: [
        { id: "brand_sentiment", label: "Global Brand Sentiment", value: p?.brandSentimentScore || "Very Positive, strong global brand, high enterprise trust" },
        { id: "awards", label: "Honors & Industry Recognitions", value: p?.awardsRecognitions || ["Fortune Global 500", "Great Place to Work Certified", "Gartner Magic Quadrant Leader", "Forbes Most Admired Companies"], type: "tags" },
        { id: "events", label: "Global Industry Summits Attended", value: p?.eventParticipation || ["World Economic Forum", "Microsoft Ignite", "AWS re:Invent", "Global Fintech Fest"], type: "tags" },
        { id: "testimonials", label: "Client Transformation Case Studies", value: p?.customerTestimonials || ["Unilever transformation story", "Microsoft cloud case"], type: "list" }
      ]
    },

    // 20. Compensation & Benefits (STRICT RULE: NO CTC, STIPEND, OR SELECTION RATIO)
    {
      id: "compensation-benefits",
      number: 20,
      title: "Compensation & Benefits",
      icon: Gift,
      fields: [
        { id: "health_insurance", label: "Medical & Health Coverage", value: "Comprehensive group health insurance for employee, spouse, children, and parents; executive health checkups" },
        { id: "retirement", label: "Retirement & Long-Term Savings", value: "Provident Fund (PF) with employer match, Gratuity provisions, and voluntary pension schemes" },
        { id: "leave_policy", label: "Paid Leave & Time Off", value: "Privilege leave (21+ days), annual wellness leaves, paid bereavement leave, and study sabbaticals" },
        { id: "parental_leave", label: "Parental Support & Care", value: "Paid maternity leave (26 weeks), paternity leave (4 weeks), and child care concierge partnerships" },
        { id: "reimbursements", label: "Professional Allowances", value: "Broadband, phone, and ergonomic home-office workspace equipment allowances" },
        { id: "wellness_eap", label: "Employee Assistance & Mental Wellness", value: "24x7 confidential Employee Assistance Program (EAP), counseling, and meditation app memberships" }
      ]
    },

    // 21. Digital Presence & Ratings
    {
      id: "digital-presence",
      number: 21,
      title: "Digital Presence & Ratings",
      icon: Share2,
      fields: [
        { id: "website", label: "Official Web Portal", value: p?.websiteUrl || "https://www.accenture.com", type: "url" },
        { id: "linkedin", label: "LinkedIn Company Profile", value: p?.linkedinUrl || "https://www.linkedin.com/company/accenture", type: "url" },
        { id: "glassdoor", label: "Glassdoor Rating", value: p?.glassdoorRating || "4.1 / 5", type: "rating" },
        { id: "indeed", label: "Indeed Rating", value: p?.indeedRating || "4.2 / 5", type: "rating" },
        { id: "google", label: "Google Workspace Reviews", value: p?.googleRating || "4.3 / 5", type: "rating" },
        { id: "followers", label: "Social Media Community", value: p?.socialMediaFollowers || "15,000,000+" },
        { id: "web_quality", label: "Digital Platform Quality", value: p?.websiteQuality || "Enterprise-grade, high clarity, strong thought leadership, polished UX" },
        { id: "traffic_rank", label: "Global Traffic Standing", value: p?.websiteTrafficRank || "Global 12,000; US 4,000" },
        { id: "video", label: "Corporate Video Showcase", value: p?.marketingVideoUrl || "https://www.youtube.com/@Accenture", type: "video" }
      ]
    },

    // 22. Contact Information
    {
      id: "contact-information",
      number: 22,
      title: "Contact Information",
      icon: Mail,
      fields: [
        { id: "primary_email", label: "General Corporate Inquiries", value: p?.primaryContactEmail || "contact@accenture.com", type: "email" },
        { id: "primary_phone", label: "Corporate Switchboard", value: p?.primaryPhoneNumber || "Not Available" },
        { id: "contact_person", label: "University Relations & Talent Contact", value: p?.contactPersonName || "Julie Sweet" },
        { id: "contact_title", label: "Title / Designation", value: p?.contactPersonTitle || "CEO" },
        { id: "talent_email", label: "Campus Outreach Email", value: p?.contactPersonEmail || "contact@accenture.com", type: "email" },
        { id: "talent_phone", label: "Office Contact Number", value: p?.contactPersonPhone || "+1 312 696 0000" },
        { id: "portal_url", label: "Official Careers Portal", value: p?.websiteUrl ? `${p.websiteUrl}/careers` : "https://www.accenture.com/careers", type: "url" }
      ]
    }
  ];
}
