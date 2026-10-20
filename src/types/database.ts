export interface DbCompany {
  company_id: number;
  name: string;
  short_name?: string | null;
  category?: string | null;
  company_type?: string | null;
  incorporation_year?: string | number | null;
  nature_of_company?: string | null;
  headquarters_address?: string | null;
  office_count?: string | null;
  employee_size?: string | null;
  website_url?: string | null;
  linkedin_url?: string | null;
  twitter_handle?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  primary_contact_email?: string | null;
  primary_phone_number?: string | null;
  overview_text?: string | null;
  vision_statement?: string | null;
  mission_statement?: string | null;
  legal_issues?: string | null;
  carbon_footprint?: string | null;
}

export interface DbCompanyLogo {
  company_logo_id: number;
  company_id: number;
  logo_url: string;
}

export interface DbCompanyBrandReputation {
  brand_reputation_id: number;
  company_id: number;
  brand_sentiment_score?: string | null;
  website_quality?: string | null;
  website_rating?: string | null;
  social_media_followers?: string | null;
  glassdoor_rating?: string | null;
  indeed_rating?: string | null;
  google_rating?: string | null;
}

export interface DbCompanyBusiness {
  company_business_id: number;
  company_id: number;
  sales_motion?: string | null;
  innovation_roadmap?: string | null;
  future_projections?: string | null;
  market_share_percentage?: string | null;
  tam?: string | null;
  sam?: string | null;
  som?: string | null;
  customer_concentration_risk?: string | null;
}

export interface DbCompanyCompensation {
  company_compensation_id: number;
  company_id: number;
  fixed_vs_variable_pay?: string | null;
  bonus_predictability?: string | null;
}

export interface DbCompanyCulture {
  company_culture_id: number;
  company_id: number;
  employee_turnover?: string | null;
  avg_retention_tenure?: string | null;
  layoff_history?: string | null;
  manager_quality?: string | null;
  psychological_safety?: string | null;
  mission_clarity?: string | null;
  crisis_behavior?: string | null;
  burnout_risk?: string | null;
}

export interface DbCompanyLogistics {
  company_logistics_id: number;
  company_id: number;
  typical_hours?: string | null;
  overtime_expectations?: string | null;
  weekend_work?: string | null;
  remote_policy_details?: string | null;
  location_centrality?: string | null;
  airport_commute_time?: string | null;
  office_zone_type?: string | null;
}

export interface DbCompanyTechnologies {
  company_technologies_id: number;
  company_id: number;
  r_and_d_investment?: string | null;
  ai_ml_adoption_level?: string | null;
}

export interface DbCompanySkillLevel {
  id: number;
  company_id: number;
  skill_set_id: number;
  required_level: number;
  required_proficiency_level_id: number;
  created_at?: string;
}

export interface DbProficiencyLevel {
  proficiency_level_id: number;
  proficiency_name: string;
  proficiency_code: string;
  proficiency_description?: string;
}
