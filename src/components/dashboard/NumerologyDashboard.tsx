"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  type UserProfile,
  type Gender,
  calculate,
  calculateDetailed,
  yearContent,
  monthContent,
  dayContent,
  dayMessages,
  digitMeaning,
  getDigits,
  getCyclePhase,
  getSynthesis,
} from "@/lib/numerology";
import UserSetup from "./UserSetup";

const STORAGE_KEY = "numerology_profile";

// Israel timezone offset is UTC+3
function getIsraelDateKey(): string {
  const now = new Date();
  const israelTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  return israelTime.toISOString().slice(0, 10);
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

function NumberBadge({ n }: { n: number }) {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto"
      style={{
        background: "linear-gradient(135deg, #c9a97a, #e8d5b0)",
        color: "#5a3e28",
        boxShadow: "0 4px 16px rgba(201,169,122,0.35)",
      }}
    >
      {n}
    </div>
  );
}

function InfoRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="mb-3">
      <span
        className="text-xs font-semibold uppercase tracking-wider block mb-1"
        style={{ color: "#6b7c5e", opacity: 0.8 }}
      >
        {label}
      </span>
      <p
        className="text-sm leading-relaxed"
        style={{ color: color ?? "#5a3e28", lineHeight: 1.7 }}
      >
        {value}
      </p>
    </div>
  );
}

function DigitBreakdown({ raw, final, label }: { raw: number; final: number; label: string }) {
  const digits = getDigits(raw);
  if (digits.length <= 1) return null;

  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6b7c5e", opacity: 0.8 }}>
        {label}
      </p>
      <div className="flex items-center gap-1 flex-wrap">
        {digits.map((d, i) => (
          <span key={i} className="flex items-center gap-1">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
              style={{ backgroundColor: "#f5f0e8", color: "#5a3e28", border: "1px solid #c9a97a50" }}
            >
              {d}
            </span>
            {i < digits.length - 1 && (
              <span style={{ color: "#c9a97a", fontSize: "10px" }}>+</span>
            )}
          </span>
        ))}
        <span style={{ color: "#c9a97a", fontSize: "10px", margin: "0 2px" }}>=</span>
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #c9a97a, #e8d5b0)",
            color: "#5a3e28",
            boxShadow: "0 2px 8px rgba(201,169,122,0.3)",
          }}
        >
          {final}
        </span>
      </div>
      <p className="text-xs mt-2" style={{ color: "#6b7c5e" }}>
        {digitMeaning[final].essence}
      </p>
    </div>
  );
}

interface DashboardProps {
  profile: UserProfile;
  onEdit: () => void;
}

function Dashboard({ profile, onEdit }: DashboardProps) {
  const [expanded, setExpanded] = useState(false);
  const nums = calculate(profile);
  const detailed = calculateDetailed(profile);
  const g = profile.gender as Gender;

  const year = yearContent[nums.personalYear];
  const month = monthContent[nums.personalMonth];
  const day = dayContent[nums.personalDay];
  const msgs = dayMessages[nums.personalDay];
  const cycle = getCyclePhase(nums.personalYear, g);
  const synthesis = getSynthesis(nums.personalYear, nums.personalMonth, nums.personalDay, g, profile.name);

  const greeting =
    g === "נקבה"
      ? `שלום ${profile.name} 🤍 הנה מה שהמספרים אומרים עלייך היום`
      : `שלום ${profile.name} 🤍 הנה מה שהמספרים אומרים עליך היום`;

  const today = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen px-4 py-28"
      style={{ backgroundColor: "#f5f0e8" }}
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "#5a3e28" }}
          >
            האזור האישי שלך ✨
          </h1>
          <p className="text-base mb-1" style={{ color: "#5a3e28", opacity: 0.7 }}>
            {greeting}
          </p>
          <p className="text-sm" style={{ color: "#6b7c5e" }}>
            {today}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Personal Year */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 24px rgba(90,62,40,0.08)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#c9a97a" }}
            >
              השנה האישית שלך
            </p>
            <NumberBadge n={nums.personalYear} />
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "#5a3e28" }}
            >
              {year.title}
            </h2>
            <div className="text-right space-y-3">
              <InfoRow label="תדר" value={year.frequency} color="#6b7c5e" />
              <InfoRow label="מה השנה מביאה" value={year.brings} />
              <div
                className="rounded-xl p-3 mt-3"
                style={{ backgroundColor: "#f5f0e8" }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider block mb-1"
                  style={{ color: "#c9a97a" }}
                >
                  המלצה
                </span>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{ color: "#5a3e28", lineHeight: 1.7 }}
                >
                  {year.recommendation[g]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Personal Month */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 24px rgba(90,62,40,0.08)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#c9a97a" }}
            >
              החודש האישי שלך
            </p>
            <NumberBadge n={nums.personalMonth} />
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "#5a3e28" }}
            >
              {month.title}
            </h2>
            <div
              className="rounded-xl p-4 mt-3"
              style={{ backgroundColor: "#f5f0e8" }}
            >
              <p
                className="text-sm leading-relaxed text-right"
                style={{ color: "#5a3e28", lineHeight: 1.8 }}
              >
                {yearContent[nums.personalMonth].brings}
              </p>
            </div>
          </motion.div>

          {/* Personal Day */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 24px rgba(90,62,40,0.08)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#c9a97a" }}
            >
              היום האישי שלך
            </p>
            <NumberBadge n={nums.personalDay} />
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "#5a3e28" }}
            >
              {monthContent[nums.personalDay].title.replace("חודש", "יום")}
            </h2>
            <div className="text-right space-y-3">
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: "#f0f4f0" }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider block mb-1"
                  style={{ color: "#6b7c5e" }}
                >
                  מומלץ היום
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5a3e28", lineHeight: 1.7 }}
                >
                  {day.recommended[g]}
                </p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: "#fdf5f0" }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-wider block mb-1"
                  style={{ color: "#c9a97a", opacity: 0.8 }}
                >
                  פחות מומלץ
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5a3e28", lineHeight: 1.7 }}
                >
                  {day.notRecommended}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deep Analysis Expandable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full rounded-2xl p-5 flex items-center justify-between transition-all duration-300"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 24px rgba(90,62,40,0.08)",
              color: "#5a3e28",
            }}
          >
            <span className="text-base font-bold" style={{ color: "#5a3e28" }}>
              הניתוח המלא שלך ✨
            </span>
            <span
              className="text-lg transition-transform duration-300"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", color: "#c9a97a" }}
            >
              ▾
            </span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="rounded-2xl p-6 mt-2 space-y-6"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 24px rgba(90,62,40,0.08)",
                  }}
                  dir="rtl"
                >
                  {/* Digit Breakdown */}
                  <div>
                    <h3 className="text-base font-bold mb-4" style={{ color: "#5a3e28" }}>
                      פירוק הספרות
                    </h3>
                    <div className="space-y-4">
                      <DigitBreakdown
                        raw={detailed.rawYear}
                        final={detailed.personalYear}
                        label="שנה אישית - חישוב"
                      />
                      <DigitBreakdown
                        raw={detailed.rawMonth}
                        final={detailed.personalMonth}
                        label="חודש אישי - חישוב"
                      />
                      <DigitBreakdown
                        raw={detailed.rawDay}
                        final={detailed.personalDay}
                        label="יום אישי - חישוב"
                      />
                    </div>
                  </div>

                  <div style={{ height: 1, backgroundColor: "#f0ebe3" }} />

                  {/* Synthesis */}
                  <div>
                    <h3 className="text-base font-bold mb-3" style={{ color: "#5a3e28" }}>
                      הסינתזה האנרגטית
                    </h3>
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "#f5f0e8" }}
                    >
                      <p className="text-sm leading-relaxed" style={{ color: "#5a3e28", lineHeight: 1.8 }}>
                        {synthesis}
                      </p>
                    </div>
                  </div>

                  <div style={{ height: 1, backgroundColor: "#f0ebe3" }} />

                  {/* What the numbers say today */}
                  <div>
                    <h3 className="text-base font-bold mb-4" style={{ color: "#5a3e28" }}>
                      מה המספרים אומרים לך היום
                    </h3>
                    <div className="space-y-3">
                      <div className="rounded-xl p-4" style={{ backgroundColor: "#f5f0e8" }}>
                        <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "#c9a97a" }}>
                          המסר המרכזי
                        </span>
                        <p className="text-sm leading-relaxed font-medium" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
                          {msgs.keyMessage[g]}
                        </p>
                      </div>
                      <div className="rounded-xl p-4" style={{ backgroundColor: "#f0f4f0" }}>
                        <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "#6b7c5e" }}>
                          מה נתמך אנרגטית היום
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
                          {msgs.energySupport}
                        </p>
                      </div>
                      <div className="rounded-xl p-4" style={{ backgroundColor: "#fdf5f0" }}>
                        <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "#c9a97a", opacity: 0.8 }}>
                          שימי לב
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
                          {msgs.beAware[g]}
                        </p>
                      </div>
                      <div
                        className="rounded-xl p-4"
                        style={{ background: "linear-gradient(135deg, #c9a97a15, #e8d5b010)", border: "1px solid #c9a97a30" }}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "#c9a97a" }}>
                          המשפט האינטואיטיבי של היום
                        </span>
                        <p className="text-sm leading-relaxed italic font-medium" style={{ color: "#5a3e28", lineHeight: 1.8 }}>
                          {msgs.intuition[g]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, backgroundColor: "#f0ebe3" }} />

                  {/* Cycle Awareness */}
                  <div>
                    <h3 className="text-base font-bold mb-3" style={{ color: "#5a3e28" }}>
                      מודעות מחזורית
                    </h3>
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "#f5f0e8" }}
                    >
                      <p className="text-xs font-semibold mb-2" style={{ color: "#c9a97a" }}>
                        {cycle.phase}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#5a3e28", lineHeight: 1.8 }}>
                        {cycle.description[g]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Edit profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            onClick={onEdit}
            className="text-sm px-6 py-2 rounded-full border transition-all duration-200 hover:shadow-md"
            style={{
              borderColor: "#c9a97a50",
              color: "#5a3e28",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.opacity = "1";
              (e.target as HTMLButtonElement).style.borderColor = "#c9a97a";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.opacity = "0.7";
              (e.target as HTMLButtonElement).style.borderColor = "#c9a97a50";
            }}
          >
            עדכון פרטים אישיים
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function NumerologyDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dateKey, setDateKey] = useState(getIsraelDateKey());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfile(JSON.parse(saved));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Refresh at Israel midnight
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getIsraelDateKey();
      if (current !== dateKey) setDateKey(current);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [dateKey]);

  if (!loaded) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#c9a97a", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (!profile || editing) {
    return (
      <UserSetup
        onSave={(p) => {
          setProfile(p);
          setEditing(false);
        }}
      />
    );
  }

  return <Dashboard key={dateKey} profile={profile} onEdit={() => setEditing(true)} />;
}
