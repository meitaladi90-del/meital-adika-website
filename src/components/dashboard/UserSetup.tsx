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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-24"
      style={{ backgroundColor: "#f5f0e8" }}
      dir="rtl"
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 md:p-10"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 8px 40px rgba(90,62,40,0.10)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">✨</div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "#5a3e28" }}
          >
            הלוח האישי שלך
          </h1>
          <p className="text-sm" style={{ color: "#5a3e28", opacity: 0.6 }}>
            הכניסי את הפרטים שלך כדי לגלות את המספרים האישיים שלך
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#5a3e28" }}
            >
              שם מלא *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שרה כהן"
              required
              className="w-full px-4 py-3 rounded-xl border text-right focus:outline-none transition-all duration-200"
              style={{
                borderColor: "#c9a97a50",
                backgroundColor: "#f5f0e8",
                color: "#5a3e28",
                fontSize: "16px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a97a")}
              onBlur={(e) => (e.target.style.borderColor = "#c9a97a50")}
            />
          </div>

          {/* Birth date */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "#5a3e28" }}
            >
              תאריך לידה *
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-200"
              style={{
                borderColor: "#c9a97a50",
                backgroundColor: "#f5f0e8",
                color: "#5a3e28",
                fontSize: "16px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a97a")}
              onBlur={(e) => (e.target.style.borderColor = "#c9a97a50")}
            />
          </div>

          {/* Gender */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#5a3e28" }}
            >
              פנייה מועדפת *
            </label>
            <div className="flex gap-3">
              {(["נקבה", "זכר"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className="flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                  style={
                    gender === g
                      ? {
                          backgroundColor: "#c9a97a",
                          color: "#5a3e28",
                          boxShadow: "0 2px 8px rgba(201,169,122,0.4)",
                        }
                      : {
                          backgroundColor: "#f5f0e8",
                          color: "#5a3e28",
                          border: "1px solid #c9a97a50",
                        }
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
            style={{ background: "#c9a97a", color: "#5a3e28" }}
          >
            גלי את המספרים שלך ✨
          </button>
        </form>
      </div>
    </div>
  );
}
