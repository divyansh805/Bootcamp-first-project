# 🏛️ JSSATEN Placement Intelligence Hub
### Research & Placement Analytics Portal

**Research Beyond Recruitment. Prepare Beyond Expectations.**

A mobile-first, enterprise-grade placement intelligence platform built for students of **JSS Academy of Technical Education Noida (JSSATEN)**.

The JSSATEN Placement Intelligence Hub transforms traditional placement preparation into a structured research and technical readiness experience. It provides students with comprehensive company intelligence, industry insights, organizational research, and structured technical competency roadmaps — all through a unified, publicly accessible portal.

Rather than limiting placement preparation to company names and basic recruitment information, the platform enables students to understand organizations, explore their technology ecosystems, evaluate workplace environments, and prepare strategically for technical interviews.

**One platform. Deeper research. Smarter preparation.**

---

## ✨ Core Features

### 1. 🔍 Intelligent Company Discovery

Explore 100+ recruiting organizations through a centralized company discovery interface.

- Live company data fetched from Supabase.
- Dynamic search and filtering.
- Category and recruitment-tier classification.
- Official high-resolution company logos.
- Dedicated company intelligence profiles.
- Mobile-first, responsive browsing experience.

### 2. 🏢 22-Section Company Intelligence Dossiers

Every company profile provides an extensive research-oriented dossier covering 22 dimensions of organizational intelligence.

| # | Intelligence Section | Coverage |
|---|---|---|
| 01 | Company Identity | Company profile and identity |
| 02 | Overview & Vision | Mission, vision and business overview |
| 03 | Leadership | Leadership and management |
| 04 | Funding & Financials | Financial background and funding |
| 05 | Global Presence | International operations |
| 06 | Products & Services | Core offerings and solutions |
| 07 | Technology Stack | Technologies and platforms |
| 08 | Partnerships & Ecosystem | Strategic alliances |
| 09 | Competitive Landscape | Industry competitors |
| 10 | Market Opportunity | TAM, SAM and SOM |
| 11 | Value Proposition & ESG | Competitive advantages and sustainability |
| 12 | Culture & Work Life | Workplace environment and employee wellbeing |
| 13 | News & Milestones | Recent developments and achievements |
| 14 | Sales & Customer Metrics | Business and customer insights |
| 15 | Risk & Compliance | Cybersecurity, governance and compliance |
| 16 | Work Location & Commute | Office locations and transit information |
| 17 | Safety & Wellbeing | Workplace safety and employee support |
| 18 | Career Growth & Learning | Learning and professional development |
| 19 | Brand & Reputation | Employer reputation and sentiment |
| 20 | Compensation & Benefits | Healthcare, retirement, leave and family benefits |
| 21 | Digital Presence & Ratings | Online presence and ratings |
| 22 | Contact Information | Official communication channels |

**Navigation Experience:**
- Sticky intelligence navigation bar.
- Automatically centering scroll-spy.
- Structured, section-wise company research.
- Smooth navigation across extensive company dossiers.

### 3. 🧠 Skill Intelligence & Technical Preparation

A dedicated technical competency preparation system designed around 12 technical domains.

**Bloom's Cognitive Taxonomy Integration**

The platform organizes learning and competency evaluation across five cognitive stages:

| Level | Cognitive Stage | Color |
|---|---|---|
| CU | Cognitive Understanding | Blue |
| AP | Application | Green |
| AS | Analysis | Yellow |
| EV | Evaluation | Red |
| CR | Creation | Purple |

**Criticality Classification**

Technical competencies are classified according to their evaluated importance:

- Critical: Score ≥ 7
- Important: Score 5–6
- Baseline: Score 1–4

**10-Stage Technical Roadmaps**

- 12 technical competency domains.
- 10 progressive learning levels per domain.
- Structured topic-wise preparation.
- Interview milestone indicators.
- Recruitment-scope-based topic progression.
- Visual distinction between required and locked topics.

The goal is to help students understand not only what to learn, but also how deeply they should prepare.

---

## 🗄️ Database Architecture — Supabase Integration

The application uses a live Supabase backend powered by `@supabase/supabase-js`.

### Connected Database Tables

The platform integrates structured company intelligence across multiple database categories:

| Database Category | Tables |
|---|---|
| Company Information | `companies`, `company_logo` |
| Brand Intelligence | `company_brand_reputation`, `company_awards_recognitions` |
| Business Research | `company_business`, `company_competitive_advantages`, `company_core_value_proposition` |
| Compensation | `company_compensation` |
| Workplace Culture | `company_culture` |
| Logistics & Safety | `company_logistics`, `company_area_safety`, `company_cab_policy` |
| Technology & Security | `company_technologies`, `company_tech_stack`, `company_cybersecurity_posture` |
| Skill Intelligence | `company_skill_levels`, `proficiency_levels` |
| Research & Insights | `company_recent_news`, `company_core_values`, `company_customer_testimonials` |

### Backend Configuration

Supabase credentials are configured through environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The Supabase client is initialized in:

```text
src/lib/supabase.ts
```

**Security Note:** Never commit private service-role keys, database passwords, or other privileged credentials to a public repository. Configure environment variables locally and through your deployment platform.

---

## 🏛️ Institutional Identity & Design Philosophy

The platform follows a consistent institutional design approach.

- **Institution:** JSS Academy of Technical Education Noida.
- **Platform Identity:** JSSATEN · INTELLIGENCE PLATFORM.
- Typography-driven institutional branding.
- No college logo image assets or image-based institutional branding.
- Clean, structured and professional interface.
- Mobile-first responsive architecture.
- Research-focused information hierarchy.

### Institutional Data Restrictions

The application strictly excludes:

- CTC figures.
- Stipend amounts.
- Candidate selection ratios.

These restrictions are maintained throughout the application and its data schema in accordance with the specified institutional guidelines.

---

## 🧭 Application Routes

| Route | Functionality |
|---|---|
| `/` | Company discovery, search and category filters |
| `/company/intelligence` | 22-section company intelligence dossiers |
| `/company/skills` | Technical competency and learning roadmaps |
| `/company` | Redirects to company intelligence |
| `*` | Custom 404 Not Found page |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend architecture |
| Vite | Development server and build tooling |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling and UI design |
| Supabase | Database and live data integration |
| Lucide React | Modern icon system |
| React Router | Client-side application routing |
| Vitest | Automated testing |

---

## 📂 Project Structure

```text
project-root/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Index
│   │   ├── CompanyIntelligence
│   │   ├── SkillIntelligence
│   │   └── NotFound
│   │
│   ├── data/
│   │   └── skillTopics.ts
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   └── ...
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- Supabase project credentials

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Navigate to the Project

```bash
cd <PROJECT_FOLDER_NAME>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholders with your actual Supabase project configuration.

### 5. Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

### 6. Run Tests

```bash
npm run test
```

### 7. Build the Production Application

```bash
npm run build
```

---

## 🔓 Public Access — No Authentication Required

The portal follows a completely open-access architecture.

- No login or signup required.
- No authentication screens.
- No protected routes.
- No user credentials required.
- Company intelligence and skill preparation are publicly accessible.

This approach ensures that students, faculty members and recruiters can explore the platform without unnecessary access barriers.

---

## 🚀 Project Highlights

| Metric | Platform Capability |
|---|---|
| 100+ | Recruiting partner companies |
| 22 | Company intelligence sections |
| 12 | Technical competency domains |
| 10 | Learning and milestone levels per domain |
| 5 | Bloom's cognitive stages |
| 0 | Login barriers |
| 0 | CTC, stipend and selection-ratio disclosures |

---

## 🔮 Project Vision

The JSSATEN Placement Intelligence Hub aims to make placement preparation more informed, structured and research-driven.

Students should not have to depend only on scattered information, generic preparation resources, or incomplete company profiles.

By combining organizational intelligence with structured technical preparation, the platform creates a centralized environment where students can research potential employers, understand industry expectations and prepare with greater clarity.

**Research the company. Understand the industry. Master the skills. Prepare with intelligence.**

---

## ❤️ Built for JSSATEN

Developed with a vision to make placement research and technical preparation more accessible to the JSSATEN student community.

**JSSATEN Placement Intelligence Hub**

*Beyond Placement Information. Towards Placement Intelligence.*
