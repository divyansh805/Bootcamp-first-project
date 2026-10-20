import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Info
} from "lucide-react";
import { useCompany } from "../context/CompanyContext";
import { CompanyLogo } from "../components/CompanyLogo";
import { DashboardSkill } from "../lib/companyData";

// Bloom taxonomy legend cards
const BLOOM_LEGEND = [
  {
    code: "CU",
    name: "Cognitive Understanding",
    levels: "L1 – L2",
    color: "#3b82f6",
    bg: "bg-blue-50/70 border-blue-200 text-blue-800"
  },
  {
    code: "AP",
    name: "Application",
    levels: "L3 – L4",
    color: "#22c55e",
    bg: "bg-emerald-50/70 border-emerald-200 text-emerald-800"
  },
  {
    code: "AS",
    name: "Analysis",
    levels: "L5 – L6",
    color: "#eab308",
    bg: "bg-amber-50/70 border-amber-200 text-amber-800"
  },
  {
    code: "EV",
    name: "Evaluation",
    levels: "L7 – L8",
    color: "#ef4444",
    bg: "bg-red-50/70 border-red-200 text-red-800"
  },
  {
    code: "CR",
    name: "Creation",
    levels: "L9 – L10",
    color: "#a855f7",
    bg: "bg-purple-50/70 border-purple-200 text-purple-800"
  }
];

const CRITICALITY_LEGEND = [
  {
    label: "Critical",
    range: "Score ≥ 7/10",
    desc: "Decisive evaluation filter. Core eliminator round in recruitment technical interviews.",
    color: "border-red-200 bg-red-50/60 text-red-800",
    badge: "bg-red-100 text-red-800 border-red-300"
  },
  {
    label: "Important",
    range: "Score 5–6/10",
    desc: "Strong differentiator. Expected competence for enterprise project placement.",
    color: "border-amber-200 bg-amber-50/60 text-amber-800",
    badge: "bg-amber-100 text-amber-800 border-amber-300"
  },
  {
    label: "Baseline",
    range: "Score 1–4/10",
    desc: "Foundational aptitude. Basic theoretical grasp expected before advanced training.",
    color: "border-slate-200 bg-slate-50/80 text-slate-700",
    badge: "bg-slate-100 text-slate-700 border-slate-300"
  }
];

// Individual Skill Card
const SkillCard: React.FC<{
  skill: DashboardSkill;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ skill, isExpanded, onToggle }) => {
  const percentage = (skill.score / 10) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300">
      {/* Skill Summary Row */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* Skill Title & Criticality */}
          <div className="flex items-start sm:items-center gap-2.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border shrink-0 ${skill.criticalityBg}`}
            >
              {skill.criticality}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {skill.name}
            </h3>
          </div>

          {/* Bloom Badge & Numerical Score */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border"
              style={{
                backgroundColor: skill.bloomBgColor,
                borderColor: skill.bloomColor,
                color: skill.bloomColor
              }}
            >
              {skill.bloom} · {skill.bloomLabel}
            </span>
            <div className="flex items-baseline gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-800">
              <span className="text-sm font-extrabold text-blue-600">{skill.score}</span>
              <span className="text-slate-400">/ 10</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-[11px] font-medium text-slate-500">
            <span>Proficiency Target: <strong className="text-slate-700">{skill.requiredProficiency}</strong></span>
            <span>Level {skill.score} of 10</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                backgroundColor: skill.bloomColor
              }}
            />
          </div>
        </div>

        {/* Expand / Collapse Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{isExpanded ? "Collapse Preparation Roadmap" : "View 10-Level Preparation Roadmap"}</span>
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>

      {/* Expandable 10-Level Roadmap */}
      {isExpanded && (
        <div className="bg-slate-50/70 border-t border-slate-200/80 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
            <span>10-Stage Milestone Curriculum</span>
            <span className="text-emerald-700 font-semibold">
              Levels 1–{skill.score} In Scope for Recruitment
            </span>
          </div>

          <div className="space-y-2">
            {skill.roadmap.map((level) => {
              const isLocked = level.level_number > skill.score;
              const isTargetLevel = level.level_number === skill.score;

              return (
                <div
                  key={level.level_number}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs transition-colors ${
                    isLocked
                      ? "bg-white/60 border-slate-200/60 opacity-60 text-slate-400"
                      : isTargetLevel
                      ? "bg-blue-50/60 border-blue-200 text-slate-800 shadow-xs"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="pt-0.5 shrink-0">
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : isTargetLevel ? (
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>

                  {/* Level details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-slate-500">
                        L{level.level_number}
                      </span>
                      <span className="font-bold text-slate-900 truncate">
                        {level.title}
                      </span>
                      {isTargetLevel && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-600 text-white">
                          Required Benchmark
                        </span>
                      )}
                      {isLocked && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                          Beyond scope
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isLocked ? "text-slate-400" : "text-slate-600"}`}>
                      {level.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const SkillIntelligence: React.FC = () => {
  const { skills, selectedInfo, profile, isProfileLoading } = useCompany();
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({});

  // Sort skills descending by score/required_level
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => b.score - a.score);
  }, [skills]);

  const toggleSkill = (id: number) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    skills.forEach((s) => (all[s.skillSetId] = true));
    setExpandedSkills(all);
  };

  const collapseAll = () => {
    setExpandedSkills({});
  };

  const companyName = profile?.name || selectedInfo?.companyName || "Accenture";

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header Bar */}
      <section className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <CompanyLogo
              name={companyName}
              logoUrl={profile?.logoUrl || selectedInfo?.logoUrl}
              websiteUrl={profile?.websiteUrl}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {companyName} Skill Intelligence
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {skills.length} Evaluated Domains
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Benchmark competency thresholds and 10-stage technical preparation ladders
              </p>
            </div>
          </div>

          {/* Quick Expand / Collapse actions */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Expand All Roadmaps
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Bloom 5-col Taxonomy Legend */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Info className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bloom&apos;s Revised Cognitive Taxonomy (5 Tiers)
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {BLOOM_LEGEND.map((bloom) => (
              <div
                key={bloom.code}
                className={`p-3 rounded-lg border ${bloom.bg}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-extrabold text-sm"
                    style={{ color: bloom.color }}
                  >
                    {bloom.code}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-600">
                    {bloom.levels}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {bloom.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Criticality 3-Card Legend */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Placement Interview Criticality Dimensions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CRITICALITY_LEGEND.map((item) => (
              <div
                key={item.label}
                className={`p-3.5 rounded-xl border ${item.color}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold border ${item.badge}`}>
                    {item.label}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    {item.range}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sorted Skill Cards */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Skill Sets Ordered by Required Competency Level ({sortedSkills.length})
            </h2>
            <span className="text-xs text-slate-500">
              Top Priority Skills First
            </span>
          </div>

          <div className="space-y-3">
            {sortedSkills.map((skill) => (
              <SkillCard
                key={skill.skillSetId}
                skill={skill}
                isExpanded={Boolean(expandedSkills[skill.skillSetId])}
                onToggle={() => toggleSkill(skill.skillSetId)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
