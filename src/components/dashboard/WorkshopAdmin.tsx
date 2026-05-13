"use client";

import { useState, useEffect } from "react";

interface Workshop {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxSpots: number;
  spotsLeft: number;
  isCancelled: boolean;
}

const emptyForm = {
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
  maxSpots: 10,
  spotsLeft: 10,
};

export default function WorkshopAdmin() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/workshops/admin")
      .then((r) => r.json())
      .then((data) => {
        setWorkshops(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function flash(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 6000);
  }

  async function addWorkshop() {
    if (!form.name.trim() || !form.date) return;
    setSaving(true);
    try {
      const res = await fetch("/api/workshops/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshop: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setWorkshops((prev) => [...prev, { ...form, id: data.id, isCancelled: false }]);
      setForm({ ...emptyForm });
      setShowForm(false);
      flash("הסדנה נוספה בהצלחה ✓ תופיע באתר תוך כ-2 דקות");
    } catch {
      flash("שגיאה בשמירה. נסי שוב.");
    } finally {
      setSaving(false);
    }
  }

  async function patchWorkshop(id: string, changes: Partial<Workshop>) {
    try {
      const res = await fetch("/api/workshops/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, changes }),
      });
      if (!res.ok) throw new Error();
      setWorkshops((prev) => prev.map((w) => (w.id === id ? { ...w, ...changes } : w)));
      flash("השינוי נשמר ✓ יתעדכן באתר תוך כ-2 דקות");
    } catch {
      flash("שגיאה בשמירה.");
    }
  }

  async function deleteWorkshop(id: string) {
    if (!confirm("למחוק את הסדנה לגמרי?")) return;
    try {
      const res = await fetch("/api/workshops/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
      flash("הסדנה נמחקה ✓");
    } catch {
      flash("שגיאה במחיקה.");
    }
  }

  const inputStyle = {
    borderColor: "#c9a97a50",
    backgroundColor: "#fff",
    color: "#5a3e28",
    fontSize: "14px",
  };

  return (
    <div dir="rtl">

      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold" style={{ color: "#5a3e28" }}>
            ניהול סדנאות פתוחות
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#6b7c5e" }}>
            שינויים יפורסמו באתר תוך כ-2 דקות
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-sm px-4 py-2 rounded-full font-semibold transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
        >
          + הוסיפי סדנה
        </button>
      </div>

      {/* Feedback message */}
      {feedback && (
        <div
          className="text-sm mb-4 px-4 py-2.5 rounded-xl"
          style={{ backgroundColor: "#f0f4f0", color: "#6b7c5e" }}
        >
          {feedback}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-2xl p-5 mb-5 space-y-3"
          style={{ backgroundColor: "#f5f0e8" }}
        >
          <h4 className="text-sm font-bold mb-1" style={{ color: "#5a3e28" }}>
            סדנה חדשה
          </h4>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>שם הסדנה *</label>
            <input
              type="text"
              placeholder="סדנת לוח חזון"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>תאריך *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                dir="ltr"
                className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>שעה</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                dir="ltr"
                className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>מיקום</label>
            <input
              type="text"
              placeholder="תל אביב / זום"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>תיאור קצר</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl border focus:outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>מקסימום משתתפות</label>
              <input
                type="number"
                min={1}
                value={form.maxSpots}
                onChange={(e) => {
                  const v = parseInt(e.target.value) || 1;
                  setForm((f) => ({ ...f, maxSpots: v, spotsLeft: v }));
                }}
                dir="ltr"
                className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#5a3e28" }}>מקומות פנויים</label>
              <input
                type="number"
                min={0}
                max={form.maxSpots}
                value={form.spotsLeft}
                onChange={(e) => setForm((f) => ({ ...f, spotsLeft: parseInt(e.target.value) || 0 }))}
                dir="ltr"
                className="w-full px-3 py-2.5 rounded-xl border focus:outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={addWorkshop}
              disabled={saving || !form.name.trim() || !form.date}
              className="flex-1 py-2.5 rounded-full font-semibold text-sm transition-all disabled:opacity-50"
              style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
            >
              {saving ? "שומרת..." : "שמירה ופרסום"}
            </button>
            <button
              onClick={() => { setShowForm(false); setForm({ ...emptyForm }); }}
              className="px-4 py-2.5 rounded-full text-sm transition-all"
              style={{ backgroundColor: "#f0ebe3", color: "#5a3e28", border: "1px solid #c9a97a30" }}
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* Workshop list */}
      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div
            className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: "#c9a97a", borderTopColor: "transparent" }}
          />
        </div>
      ) : workshops.length === 0 ? (
        <p
          className="text-sm text-center py-6"
          style={{ color: "#5a3e28", opacity: 0.45 }}
        >
          אין סדנאות פתוחות כרגע
        </p>
      ) : (
        <div className="space-y-3">
          {workshops.map((ws) => (
            <div
              key={ws.id}
              className="rounded-xl p-4"
              style={{
                backgroundColor: ws.isCancelled ? "#fdf5f0" : "#f5f0e8",
                opacity: ws.isCancelled ? 0.65 : 1,
                border: ws.isCancelled ? "1px solid #c9a97a30" : "none",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold" style={{ color: "#5a3e28" }}>
                  {ws.name}
                  {ws.isCancelled && (
                    <span className="text-xs font-normal mr-2" style={{ color: "#c9a97a" }}>
                      (בוטל)
                    </span>
                  )}
                </h4>
                <button
                  onClick={() => deleteWorkshop(ws.id)}
                  className="text-xs px-2 py-1 rounded-full flex-shrink-0 transition-all hover:opacity-80"
                  style={{ backgroundColor: "#fdf5f0", color: "#c9a97a", border: "1px solid #c9a97a30" }}
                >
                  מחק
                </button>
              </div>

              <p className="text-xs mb-3" style={{ color: "#6b7c5e" }}>
                {ws.date ? new Date(ws.date).toLocaleDateString("he-IL") : ""}{ws.time ? ` | ${ws.time}` : ""}{ws.location ? ` | ${ws.location}` : ""}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium" style={{ color: "#6b7c5e" }}>
                  {ws.spotsLeft}/{ws.maxSpots} מקומות
                </span>
                <button
                  onClick={() => patchWorkshop(ws.id, { spotsLeft: Math.max(0, ws.spotsLeft - 1) })}
                  className="text-xs px-2 py-1 rounded-full transition-all hover:opacity-80"
                  style={{ backgroundColor: "#fff", color: "#5a3e28", border: "1px solid #c9a97a30" }}
                >
                  - מקום
                </button>
                <button
                  onClick={() => patchWorkshop(ws.id, { spotsLeft: Math.min(ws.maxSpots, ws.spotsLeft + 1) })}
                  className="text-xs px-2 py-1 rounded-full transition-all hover:opacity-80"
                  style={{ backgroundColor: "#fff", color: "#5a3e28", border: "1px solid #c9a97a30" }}
                >
                  + מקום
                </button>

                <div className="mr-auto">
                  {ws.isCancelled ? (
                    <button
                      onClick={() => patchWorkshop(ws.id, { isCancelled: false })}
                      className="text-xs px-3 py-1 rounded-full transition-all hover:opacity-80"
                      style={{ backgroundColor: "#f0f4f0", color: "#6b7c5e" }}
                    >
                      החזירי לפעיל
                    </button>
                  ) : (
                    <button
                      onClick={() => patchWorkshop(ws.id, { isCancelled: true })}
                      className="text-xs px-3 py-1 rounded-full transition-all hover:opacity-80"
                      style={{ backgroundColor: "#fdf5f0", color: "#c9a97a", border: "1px solid #c9a97a30" }}
                    >
                      בטלי סדנה
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
