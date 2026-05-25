"use client";

import { useState } from "react";
import { type Gender, type UserProfile } from "@/lib/numerology";

interface Props {
  onSave: (profile: UserProfile) => void;
}

export default function UserSetup({ onSave }: Props) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<Gender>("נקבה");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;
    const profile: UserProfile = { name: name.trim(), birthDate, gender };
    localStorage.setItem("numerology_profile", JSON.stringify(profile));
    onSave(profile);
  }

  const GOLD = "#c9a97a";
  const CREAM = "#f5f0e8";
  const FIELD_STYLE = {
    borderColor: "rgba(201,169,122,0.35)",
    backgroundColor: "rgba(255,255,255,0.10)",
    color: CREAM,
    fontSize: "16px",
  } as const;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-24"
      style={{ backgroundColor: "#5a3e28" }}
      dir="rtl"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 md:p-10"
        style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,169,122,0.22)" }}
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✨</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: GOLD }}>הלוח האישי שלך</h1>
          <p className="text-sm" style={{ color: CREAM, opacity: 0.65 }}>
            הכניסי את הפרטים שלך כדי לגלות את המספרים האישיים שלך
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: GOLD }}>שם מלא *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שרה כהן"
              required
              className="w-full px-4 py-3 rounded-xl border text-right focus:outline-none transition-all duration-200 placeholder:opacity-40"
              style={FIELD_STYLE}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: GOLD }}>תאריך לידה *</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200"
              style={{ ...FIELD_STYLE, colorScheme: "dark" } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: GOLD }}>פנייה מועדפת *</label>
            <div className="flex gap-3">
              {(["נקבה", "זכר"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className="flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                  style={
                    gender === g
                      ? { backgroundColor: GOLD, color: "#5a3e28", boxShadow: "0 2px 8px rgba(201,169,122,0.4)" }
                      : { backgroundColor: "rgba(255,255,255,0.08)", color: CREAM, border: "1px solid rgba(201,169,122,0.3)" }
                  }
                >
                  {g === "נקבה" ? "נקבה (את)" : "זכר (אתה)"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 font-bold rounded-full text-lg mt-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: GOLD, color: "#5a3e28" }}
          >
            גלי את המספרים שלך ✨
          </button>
        </form>
      </div>
    </div>
  );
}

