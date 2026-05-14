"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculate, yearContent, monthContent, dayContent, getSynthesis } from "@/lib/numerology";

const STORAGE_KEY = "numerology_profile";
const PREVIEW_USED_KEY = "energy_preview_used";

type ViewState =
  | "loading"
  | "preview_form"
  | "preview_results"
  | "locked"
  | "register_form"
  | "login_form"
  | "logged_in";

interface EnergyNums {
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

interface AuthUser {
  name: string;
  birthDate: string;
}

const FIELD_STYLE = {
  backgroundColor: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(201,169,122,0.35)",
  color: "#f5f0e8",
} as const;

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl text-sm outline-none text-right placeholder:opacity-50";

function EnergyCards({ nums, name }: { nums: EnergyNums; name: string }) {
  const { personalYear: py, personalMonth: pm, personalDay: pd } = nums;

  const cards = [
    {
      label: "שנה אישית",
      num: py,
      title: yearContent[py].title,
      body: yearContent[py].brings,
    },
    {
      label: "חודש אישי",
      num: pm,
      title: monthContent[pm].title,
      body: monthContent[pm].brings,
    },
    {
      label: "יום אישי",
      num: pd,
      title: dayContent[pd].recommended["נקבה"],
      body: "",
    },
  ];

  const synthesis = getSynthesis(py, pm, pd, "נקבה", name);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl p-5 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(201,169,122,0.18)",
            }}
          >
            <div
              className="text-5xl font-bold mb-1"
              style={{ color: "#c9a97a" }}
            >
              {card.num}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#c9a97a", opacity: 0.75 }}
            >
              {card.label}
            </div>
            <p
              className="text-xs font-bold mb-2 leading-snug"
              style={{ color: "#f5f0e8" }}
            >
              {card.title}
            </p>
            {card.body && (
              <p
                className="text-xs"
                style={{ color: "#f5f0e8", opacity: 0.6, lineHeight: 1.7 }}
              >
                {card.body}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl p-5 mb-5 text-center"
        style={{
          backgroundColor: "rgba(201,169,122,0.10)",
          border: "1px solid rgba(201,169,122,0.22)",
        }}
      >
        <p
          className="text-sm"
          style={{ color: "#f5f0e8", lineHeight: 1.9 }}
        >
          {synthesis}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="text-center"
      >
        <a
          href="/dashboard"
          className="inline-flex items-center px-9 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          style={{ backgroundColor: "#6b7c5e", color: "#fff" }}
        >
          שלפי קלף מסר ✨
        </a>
      </motion.div>
    </div>
  );
}

export default function EnergyTeaser() {
  const [view, setView] = useState<ViewState>("loading");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [nums, setNums] = useState<EnergyNums | null>(null);

  const [previewName, setPreviewName] = useState("");
  const [previewBirthDate, setPreviewBirthDate] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regBirthDate, setRegBirthDate] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((user) => {
        if (user?.userId) {
          setAuthUser({ name: user.name, birthDate: user.birthDate });
          const n = calculate({
            name: user.name,
            birthDate: user.birthDate,
            gender: "נקבה",
          });
          setNums(n);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ name: user.name, birthDate: user.birthDate, gender: "נקבה" })
          );
          setView("logged_in");
        } else {
          const previewUsed = localStorage.getItem(PREVIEW_USED_KEY) === "true";
          setView(previewUsed ? "locked" : "preview_form");
        }
      })
      .catch(() => {
        const previewUsed = localStorage.getItem(PREVIEW_USED_KEY) === "true";
        setView(previewUsed ? "locked" : "preview_form");
      });
  }, []);

  function handlePreviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!previewName || !previewBirthDate) return;
    const n = calculate({ name: previewName, birthDate: previewBirthDate, gender: "נקבה" });
    setNums(n);
    localStorage.setItem(PREVIEW_USED_KEY, "true");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: previewName, birthDate: previewBirthDate, gender: "נקבה" })
    );
    setView("preview_results");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (regPassword.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone || undefined,
          birthDate: regBirthDate,
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "שגיאה בהרשמה");
        return;
      }
      setAuthUser({ name: data.name, birthDate: data.birthDate });
      const n = calculate({ name: data.name, birthDate: data.birthDate, gender: "נקבה" });
      setNums(n);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: data.name, birthDate: data.birthDate, gender: "נקבה" })
      );
      localStorage.removeItem(PREVIEW_USED_KEY);
      setView("logged_in");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "מייל או סיסמה שגויים");
        return;
      }
      setAuthUser({ name: data.name, birthDate: data.birthDate });
      const n = calculate({ name: data.name, birthDate: data.birthDate, gender: "נקבה" });
      setNums(n);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: data.name, birthDate: data.birthDate, gender: "נקבה" })
      );
      localStorage.removeItem(PREVIEW_USED_KEY);
      setView("logged_in");
    } finally {
      setSubmitting(false);
    }
  }

  function goBack() {
    setError("");
    setView(nums ? "preview_results" : "locked");
  }

  return (
    <section
      id="energy"
      className="section-padding"
      dir="rtl"
      style={{ backgroundColor: "#5a3e28" }}
    >
      <div className="container-max">
        <AnimatePresence mode="wait">

          {view === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-16"
            >
              <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: "#c9a97a", borderTopColor: "transparent" }}
              />
            </motion.div>
          )}

          {view === "preview_form" && (
            <motion.div
              key="preview_form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto text-center"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#c9a97a" }}
              >
                גלי את האנרגיה שלך
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold mb-5 leading-snug"
                style={{ color: "#f5f0e8" }}
              >
                מה המספרים אומרים
                <br />
                עלייך היום?
              </h2>
              <p
                className="text-base mb-8 max-w-md mx-auto"
                style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.85 }}
              >
                הכניסי שם ותאריך לידה וגלי את האנרגיה שלך לשנה, לחודש וליום — בחינם.
              </p>
              <form onSubmit={handlePreviewSubmit} className="flex flex-col gap-4 text-right">
                <input
                  type="text"
                  placeholder="שם פרטי"
                  value={previewName}
                  onChange={(e) => setPreviewName(e.target.value)}
                  required
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                <div>
                  <label
                    className="block text-xs mb-1.5 text-right"
                    style={{ color: "#c9a97a" }}
                  >
                    תאריך לידה
                  </label>
                  <input
                    type="date"
                    value={previewBirthDate}
                    onChange={(e) => setPreviewBirthDate(e.target.value)}
                    required
                    className={INPUT_CLS}
                    style={{ ...FIELD_STYLE, colorScheme: "dark" } as React.CSSProperties}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  גלי את האנרגיה שלך ✨
                </button>
              </form>
            </motion.div>
          )}

          {view === "preview_results" && nums && (
            <motion.div
              key="preview_results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#c9a97a" }}
                >
                  האנרגיה שלך היום
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "#f5f0e8" }}
                >
                  {previewName ? `שלום ${previewName} ✨` : "האנרגיה שלך ✨"}
                </h2>
              </div>

              <EnergyCards nums={nums} name={previewName} />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-10 max-w-lg mx-auto rounded-2xl p-7 text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(201,169,122,0.2)",
                }}
              >
                <div className="text-3xl mb-3">🌟</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#f5f0e8" }}
                >
                  רוצה לגשת לאנרגיה שלך כל יום?
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: "#f5f0e8", opacity: 0.7, lineHeight: 1.85 }}
                >
                  הירשמי לאזור האישי וקבלי גישה מלאה לאנרגיה היומית שלך, ניתוח עמוק ושליפת קלף מסר — כל יום.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setRegName(previewName);
                      setRegBirthDate(previewBirthDate);
                      setError("");
                      setView("register_form");
                    }}
                    className="px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                  >
                    הרשמה לאזור האישי ←
                  </button>
                  <button
                    onClick={() => { setError(""); setView("login_form"); }}
                    className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid rgba(201,169,122,0.45)",
                      color: "#f5f0e8",
                    }}
                  >
                    כבר רשומה? כניסה
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {view === "locked" && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="text-5xl mb-5">🔒</div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "#f5f0e8" }}
              >
                האנרגיה היומית שלך מחכה
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.85 }}
              >
                ניצלת את הצצה החינמית. הירשמי לאזור האישי וקבלי גישה מלאה לאנרגיה שלך — כל יום, ללא הגבלה.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setError(""); setView("register_form"); }}
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  הרשמה לאזור האישי ←
                </button>
                <button
                  onClick={() => { setError(""); setView("login_form"); }}
                  className="w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(201,169,122,0.4)",
                    color: "#f5f0e8",
                  }}
                >
                  כבר רשומה? כניסה
                </button>
              </div>
            </motion.div>
          )}

          {view === "register_form" && (
            <motion.div
              key="register_form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-sm mx-auto"
            >
              <h2
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: "#f5f0e8" }}
              >
                הרשמה לאזור האישי
              </h2>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                <div>
                  <label
                    className="block text-xs mb-1.5 text-right"
                    style={{ color: "#c9a97a" }}
                  >
                    תאריך לידה
                  </label>
                  <input
                    type="date"
                    value={regBirthDate}
                    onChange={(e) => setRegBirthDate(e.target.value)}
                    required
                    className={INPUT_CLS}
                    style={{ ...FIELD_STYLE, colorScheme: "dark" } as React.CSSProperties}
                  />
                </div>
                <input
                  type="email"
                  placeholder="כתובת מייל"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                <input
                  type="tel"
                  placeholder="טלפון (אופציונלי)"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                <input
                  type="password"
                  placeholder="סיסמה (לפחות 6 תווים)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                {error && (
                  <p className="text-xs text-center" style={{ color: "#fca5a5" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2 disabled:opacity-60"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  {submitting ? "...נרשמת" : "הירשמי ←"}
                </button>
                <button
                  type="button"
                  onClick={() => { setError(""); setView("login_form"); }}
                  className="text-xs text-center mt-1"
                  style={{ color: "#f5f0e8", opacity: 0.55 }}
                >
                  כבר רשומה? כניסה
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="text-xs text-center"
                  style={{ color: "#f5f0e8", opacity: 0.35 }}
                >
                  חזרה
                </button>
              </form>
            </motion.div>
          )}

          {view === "login_form" && (
            <motion.div
              key="login_form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-sm mx-auto"
            >
              <h2
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: "#f5f0e8" }}
              >
                כניסה לאזור האישי
              </h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="כתובת מייל"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                <input
                  type="password"
                  placeholder="סיסמה"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className={INPUT_CLS}
                  style={FIELD_STYLE}
                />
                {error && (
                  <p className="text-xs text-center" style={{ color: "#fca5a5" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2 disabled:opacity-60"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  {submitting ? "...נכנסת" : "כניסה ←"}
                </button>
                <button
                  type="button"
                  onClick={() => { setError(""); setView("register_form"); }}
                  className="text-xs text-center mt-1"
                  style={{ color: "#f5f0e8", opacity: 0.55 }}
                >
                  עדיין לא רשומה? הרשמי כאן
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="text-xs text-center"
                  style={{ color: "#f5f0e8", opacity: 0.35 }}
                >
                  חזרה
                </button>
              </form>
            </motion.div>
          )}

          {view === "logged_in" && authUser && nums && (
            <motion.div
              key="logged_in"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "#c9a97a" }}
                >
                  האנרגיה היומית שלך
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "#f5f0e8" }}
                >
                  שלום {authUser.name.split(" ")[0]} ✨
                </h2>
              </div>
              <EnergyCards nums={nums} name={authUser.name.split(" ")[0]} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}