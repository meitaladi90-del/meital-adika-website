"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const GOLD = "#c9a97a";
const CREAM = "#f5f0e8";
const FIELD = { backgroundColor: "rgba(255,255,255,0.10)", border: "1px solid rgba(201,169,122,0.35)", color: CREAM } as const;

function ResetForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("הסיסמה חייבת להכיל לפחות 6 תווים"); return; }
    if (password !== confirm) { setError("הסיסמאות אינן תואמות"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "שגיאה"); return; }
      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">❌</div>
        <p style={{ color: CREAM }}>קישור לא חוקי</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold mb-3" style={{ color: GOLD }}>הסיסמה עודכנה בהצלחה!</h2>
        <p style={{ color: CREAM, opacity: 0.72 }}>מעבירים אותך לדף הבית...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "16px", padding: "32px", border: "1px solid rgba(201,169,122,0.22)", maxWidth: "380px", width: "100%" }}>
      <div className="text-center mb-7">
        <div className="text-4xl mb-3">🔑</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: GOLD }}>סיסמה חדשה</h1>
        <p className="text-sm" style={{ color: CREAM, opacity: 0.65 }}>בחרי סיסמה חדשה לאזור האישי שלך</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" dir="rtl">
        <input
          type="password"
          placeholder="סיסמה חדשה (לפחות 6 תווים) *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none text-right placeholder:opacity-50"
          style={FIELD}
        />
        <input
          type="password"
          placeholder="אימות סיסמה *"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none text-right placeholder:opacity-50"
          style={FIELD}
        />
        {error && <p style={{ color: "#fca5a5", fontSize: "12px", textAlign: "center" }}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          style={{ backgroundColor: GOLD, color: "#5a3e28", padding: "13px", borderRadius: "40px", fontWeight: "bold", fontSize: "14px", border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.65 : 1, marginTop: "4px" }}
        >
          {submitting ? "...מעדכן" : "שמרי סיסמה חדשה ←"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#5a3e28" }}>
      <Suspense fallback={<div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: "transparent" }} />}>
        <ResetForm />
      </Suspense>
    </div>
  );
}
