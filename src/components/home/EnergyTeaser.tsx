"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "numerology_profile";

export default function EnergyTeaser() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !birthDate) return;
    setLoading(true);
    const profile = { name, email, birthDate, gender: "נקבה" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    router.push("/dashboard");
  }

  return (
    <section
      className="section-padding"
      dir="rtl"
      style={{ backgroundColor: "#5a3e28" }}
    >
      <div className="container-max text-center">
        <AnimatePresence mode="wait">
          {!showForm ? (
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
                onClick={() => setShowForm(true)}
                className="px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
              >
                גלי את האנרגיה שלך ✨
              </button>
            </motion.div>
          ) : (
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
                  disabled={loading}
                  className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  {loading ? "טוענת..." : "גלי את האנרגיה שלך ←"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-xs mt-1"
                  style={{ color: "#f5f0e8", opacity: 0.45 }}
                >
                  חזרה
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
