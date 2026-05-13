"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "numerology_profile";
const FIRST_VISIT_KEY = "numerology_first_visit";

type Step = "teaser" | "form" | "registered";

export default function EnergyTeaser() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [step, setStep] = useState<Step>("teaser");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const profile = JSON.parse(saved);
        setIsConnected(true);
        setProfileName((profile.name ?? "").split(" ")[0]);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !birthDate) return;
    const profile = { name, email, birthDate, gender: "נקבה" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(FIRST_VISIT_KEY, "true");
    setProfileName(name.split(" ")[0]);
    setStep("registered");
  }

  // ── Returning user ───────────────────────────────────────────────────────
  if (isConnected) {
    return (
      <section
        className="section-padding"
        dir="rtl"
        style={{ backgroundColor: "#5a3e28" }}
      >
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#c9a97a" }}
            >
              האנרגיה היומית שלך
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#f5f0e8", lineHeight: 1.25 }}
            >
              {profileName ? `שלום ${profileName} ✨` : "ברוכה השבה ✨"}
            </h2>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.9 }}
            >
              המספרים כבר מחכים לך. גלי מה אנרגיית היום אומרת עלייך.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
            >
              גלי את האנרגיה היומית ←
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── First-time visitor ───────────────────────────────────────────────────
  return (
    <section
      className="section-padding"
      dir="rtl"
      style={{ backgroundColor: "#5a3e28" }}
    >
      <div className="container-max text-center">
        <AnimatePresence mode="wait">

          {/* Step 1: teaser */}
          {step === "teaser" && (
            <motion.div
              key="teaser"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
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
                className="text-base md:text-lg mb-8 max-w-xl mx-auto"
                style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.85 }}
              >
                בהתאם לתאריך הלידה שלך, המספרים מייצרים אנרגיה יומית ייחודית.
                גלי מה השנה, החודש והיום אומרים לך — בחינם.
              </p>
              <button
                onClick={() => setStep("form")}
                className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
              >
                גלי את האנרגיה שלך ✨
              </button>
            </motion.div>
          )}

          {/* Step 2: form */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-sm mx-auto"
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#f5f0e8" }}
              >
                ספרי לי קצת עלייך
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none text-right"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(201,169,122,0.35)",
                    color: "#f5f0e8",
                  }}
                />
                <input
                  type="email"
                  placeholder="כתובת מייל (אופציונלי)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none text-right"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(201,169,122,0.35)",
                    color: "#f5f0e8",
                  }}
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
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(201,169,122,0.35)",
                      color: "#f5f0e8",
                      colorScheme: "dark",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  הירשמי ←
                </button>
                <button
                  type="button"
                  onClick={() => setStep("teaser")}
                  className="text-xs mt-1"
                  style={{ color: "#f5f0e8", opacity: 0.45 }}
                >
                  חזרה
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 3: registered confirmation */}
          {step === "registered" && (
            <motion.div
              key="registered"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto"
            >
              <div className="text-5xl mb-5">🎉</div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "#f5f0e8" }}
              >
                הירשמת בהצלחה!
              </h2>
              <p
                className="text-base mb-2"
                style={{ color: "#f5f0e8", opacity: 0.9, lineHeight: 1.85 }}
              >
                רוצה לדעת באופן יומי מה המספרים אומרים עלייך?
              </p>
              <p
                className="text-base mb-8"
                style={{ color: "#f5f0e8", opacity: 0.7, lineHeight: 1.85 }}
              >
                כל פעם שתיכנסי לאתר תמצאי כאן את האנרגיה היומית שלך מוכנה —
                אנחנו כבר מחוברות. 🤍
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
              >
                גלי את האנרגיה שלך עכשיו ←
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
