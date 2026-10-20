# JSS Academy of Technical Education Noida Companies Research & Placement Analytics Portal

> a.k.a. **JSSATEN Placement Intelligence Hub**

A mobile-first enterprise React + Vite + TypeScript + Tailwind CSS application providing in-depth placement analytics, 22-section company dossiers, and 12-domain technical competency preparation ladders for students of **JSS Academy of Technical Education Noida** (`JSSATEN`).

---

## Key Architecture & Design Highlights

### 1. Supabase Database Integration (Phase 2 Connected)
- **Live Supabase Client**: `src/lib/supabase.ts` uses `@supabase/supabase-js` configured via `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- **Verified Tables Connected**:
  - `public.companies` &mdash; 100+ recruiting partners fetched with live search and category tier filtering.
  - `public.company_logo` &mdash; Official high-resolution company logos.
  - `public.company_brand_reputation` & `public.company_awards_recognitions` &mdash; Sentiment ratings, glassdoor/google scores, and global honors.
  - `public.company_business`, `public.company_competitive_advantages`, `public.company_core_value_proposition` &mdash; Market share, TAM/SAM/SOM, and moat metrics.
  - `public.company_compensation` &mdash; Fixed vs variable pay and bonus structures (strictly zero CTC/stipends).
  - `public.company_culture` &mdash; Retention tenure, turnover benchmarks, psychological safety, and burnout risk.
  - `public.company_logistics`, `public.company_area_safety`, `public.company_cab_policy` &mdash; Transit commute, cab policies, and campus security.
  - `public.company_technologies`, `public.company_tech_stack`, `public.company_cybersecurity_posture` &mdash; Tech stack platforms, GenAI adoption, and security standards.
  - `public.company_skill_levels` & `public.proficiency_levels` &mdash; 12 evaluated skill domains mapped to Bloom's taxonomy.
  - `public.company_recent_news`, `public.company_core_values`, `public.company_customer_testimonials` &mdash; Case studies and strategic moves.

### 2. Fully Public Portal (Zero Login / Auth)
- **No Protected Routes**: The portal is openly accessible to all students, faculty, and recruiters.
- **No Auth Artifacts**: There are no `/login` routes, no `AuthContext`, no protected routes, and no authentication UI or credentials needed.

### 3. Institutional Identity & Anti-Slop Constraints
- **College Name**: `JSS Academy of Technical Education Noida` (`JSSATEN`).
- **No College Logo Image**: The portal strictly adheres to the constraint prohibiting college image files in `public/` or `<img>` tags. Institutional branding is rendered purely via clean typographic wordmarks and a `JSSATEN · INTELLIGENCE PLATFORM` text pill.
- **Strict Prohibition on CTC / Stipend / Selection Ratio**: As requested by the institutional guidelines, CTC figures, stipend amounts, and candidate selection ratios are completely excluded across the entire application and data schema.

### 4. 22 Comprehensive Intelligence Sections
In `CompanyIntelligence` (`/company/intelligence`), each company provides a 22-section dossier with a sticky top bar and auto-centering scroll-spy:
1. Company Identity
2. Overview & Vision
3. Leadership
4. Funding & Financials
5. Global Presence
6. Products & Services
7. Technology Stack
8. Partnerships & Ecosystem
9. Competitive Landscape
10. Market Opportunity
11. Core Value Proposition & ESG
12. Culture & Work Life
13. Recent News & Milestones
14. Sales & Customer Metrics
15. Risk & Compliance
16. Work Location & Commute
17. Safety & Wellbeing
18. Career Growth & Learning
19. Brand & Reputation
20. Compensation & Benefits (Health, retirement, leave, family support; no CTC/stipends)
21. Digital Presence & Ratings
22. Contact Information

### 5. Skill Intelligence & 10-Stage Milestone Roadmaps
In `SkillIntelligence` (`/company/skills`):
- **Bloom's Cognitive Taxonomy**: CU (Cognitive Understanding, #3b82f6), AP (Application, #22c55e), AS (Analysis, #eab308), EV (Evaluation, #ef4444), and CR (Creation, #a855f7).
- **Criticality Classification**: Critical (≥7), Important (5–6), and Baseline (1–4).
- **10-Level Curricula**: Each of the 12 technical domains contains a 10-level topic roadmap in `src/data/skillTopics.ts`, visually indicating target interview milestones and locking topics beyond the required recruitment scope.

---

## Routing Structure
```
/                           -> Index (Company Search, Category Filters, Cards)
/company/intelligence       -> CompanyIntelligence (22 Sections with Scroll-Spy)
/company/skills             -> SkillIntelligence (Bloom Taxonomy & 10-Level Ladders)
/company                    -> Redirects to /company/intelligence
*                           -> 404 NotFound
```

---

## Running and Testing

```bash
# Start Development Server (Port 3000)
npm run dev

# Run Vitest Suite
npm run test

# Compile / Typecheck
npm run build
```
