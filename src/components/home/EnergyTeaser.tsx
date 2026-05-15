"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculate, yearContent, monthContent, dayContent, getSynthesis } from "@/lib/numerology";

const STORAGE_KEY = "numerology_profile";
const PREVIEW_USED_KEY = "energy_preview_used";
const DECLINED_KEY = "energy_declined";
const CARD_STORAGE_KEY = "adikAura_daily";

type ViewState = "loading" | "preview_form" | "preview_results" | "locked" | "login_form" | "logged_in";
type CardPhase = "choosing" | "revealed";

interface EnergyNums { personalYear: number; personalMonth: number; personalDay: number; }
interface AuthUser { name: string; birthDate: string; }

const ORACLE_CARDS = [
  { series: "הקשבה לקול הפנימי", title: "לסמוך על הידיעה הפנימית", msg: "את מחפשת אישורים בחוץ, שואלת אנשים ומחפשת תשובות במקומות רחוקים. אבל האמת היא שאת כבר יודעת. שבי עם עצמך דקה אחת בשקט. התשובה הראשונה שעולה לך בבטן – היא התשובה הנכונה." },
  { series: "הקשבה לקול הפנימי", title: "להוריד את הווליום של העולם", msg: "יש סביבך יותר מדי רעש ודעות של אחרים. זה הזמן לשים הכל על השתק, להיכנס פנימה, ולהקשיב לקול האחד והיחיד שקובע – הקול שלך." },
  { series: "גוף, תנועה ונוכחות", title: "הקצב המדויק שלך", msg: "העולם לוחץ לרוץ, להספיק, להשיג. אבל לטבע יש קצב משלו, וגם לך. מותר לך להאט, מותר לך לקחת את הזמן. את בדיוק איפה שאת צריכה להיות." },
  { series: "גוף, תנועה ונוכחות", title: "להחזיר את האנרגיה לגוף", msg: "המחשבות שלך רצות קדימה, מתכננות ומנתחות, והגוף נשאר מאחור. עצרי הכל עכשיו. הזיזי את האצבעות, גלגלי את הכתפיים, הרגישי את כפות הרגליים על הרצפה. תחזרי הביתה." },
  { series: "שחרור, כתיבה וריפוי", title: "לנקות את המיכל", msg: "הלב שלך מלא במילים שלא נאמרו. קחי דף לבן ופשוט תתחילי לכתוב את כל מה שעולה, בלי סדר ובלי פילטרים. כשהדף יתמלא – קרעי אותו לחתיכות קטנות. שחררי את זה מהמערכת שלך." },
  { series: "שחרור, כתיבה וריפוי", title: "לסלוח על מה שהיה", msg: "את מחזיקה אשמה או חרטה על משהו שעשית או שלא עשית בעבר. עשית את הכי טוב שיכולת עם הכלים שהיו לך אז. חבקי את עצמך של אז, ותגידי לה: תודה, אני סולחת לך." },
  { series: "אומץ, מימוש ועוצמה", title: "הצעד הראשון", msg: "את מחכה שהפחד ייעלם כדי לפעול? הפחד לא ייעלם עד שלא תפעלי. את לא צריכה לראות את כל המדרגות, רק לעשות צעד אחד קטן ואמיץ קדימה. חבקי את הפחד – וצעדי איתו." },
  { series: "אומץ, מימוש ועוצמה", title: "האור שלך הוא מתנה", msg: "כשאת מקטינה את עצמך או מחביאה את הכישרונות שלך, העולם מפספס אותך. הגיע הזמן לעמוד בזקיפות קומה, להרחיב את הנוכחות שלך ולהסכים להיראות." },
  { series: "חמלה וקבלה", title: "את מספיקה", msg: "תנשמי. תרפי את המרדף השלם אחרי השלמות. את לא צריכה לתקן שום דבר בעצמך כרגע. כמו שאת, עם היתרונות, החסרונות, העליות והירידות – את פשוט מספיקה." },
  { series: "חמלה וקבלה", title: "לסמוך על התהליך", msg: "לא הכל ברור עכשיו, ויש תחושה של ערפל. הכל קורה בזמן המדויק עבורך. גם כשאת לא רואה את זה, הדברים מסתדרים מאחורי הקלעים לטובתך העליונה." },
  { series: "קלפי מנטרה", title: "הערך שלך קבוע", msg: "השווי שלך לא נקבע לפי כמה הספקת היום, כמה את מרוויחה או מה אחרים חושבים עלייך. את שווה וראויה מעצם היותך." },
  { series: "קלפי מנטרה", title: "האור שלך", msg: "אל תכבי את האור שלך רק בגלל שמישהו אחר לא יודע איך לעכל אותו. תזרחי הכי חזק שאת יכולה." },
];

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const FIELD = {
  backgroundColor: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(201,169,122,0.35)",
  color: "#f5f0e8",
} as const;
const INPUT_CLS = "w-full px-4 py-3 rounded-xl text-sm outline-none text-right placeholder:opacity-50";

/* ── Oracle card visuals ─────────────────────────────────────────── */
function OracleCardBack({ large }: { large?: boolean }) {
  const d = large ? 100 : 38;
  const count = large ? 5 : 3;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: large ? "12px" : "4px", padding: large ? "20px" : "6px" }}>
      <div style={{ position: "relative", width: d + "px", height: d + "px" }}>
        {Array.from({ length: count }).map((_, i) => {
          const size = Math.round(d * (1 - i / count));
          return (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: size + "px", height: size + "px", border: "1px solid rgba(201,169,122,0.5)", borderRadius: "50%", opacity: 0.75 - i * 0.1 }} />
          );
        })}
      </div>
      <span style={{ color: "#c9a97a", fontStyle: "italic", fontSize: large ? "13px" : "7px", letterSpacing: large ? "0.15em" : "0.08em", opacity: 0.85 }}>AdikAura</span>
      {large && <span style={{ color: "#c9a97a", opacity: 0.5, fontSize: "10px", fontStyle: "italic" }}>אנרגיה יומית</span>}
    </div>
  );
}

function OracleCardFront({ card }: { card: (typeof ORACLE_CARDS)[0] }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "18px 14px 14px", textAlign: "center" }}>
      <div style={{ color: "#c9a97a", fontSize: "17px", marginBottom: "7px" }}>✦</div>
      <div style={{ color: "#c9a97a", opacity: 0.65, fontSize: "10px", fontStyle: "italic", letterSpacing: "0.07em", marginBottom: "9px" }}>{card.series}</div>
      <h4 style={{ color: "#c9a97a", fontSize: "13px", fontStyle: "italic", fontWeight: 600, lineHeight: 1.45, marginBottom: "9px" }}>{card.title}</h4>
      <div style={{ color: "#c9a97a", opacity: 0.45, fontSize: "11px", letterSpacing: "0.14em", marginBottom: "9px" }}>✦ ✦ ✦</div>
      <p style={{ color: "#f5f0e8", fontSize: "11px", lineHeight: 1.85, fontWeight: 300, flex: 1, opacity: 0.88 }}>{card.msg}</p>
      <div style={{ color: "#c9a97a", fontSize: "12px", marginTop: "8px", opacity: 0.45 }}>✦</div>
    </div>
  );
}

/* ── Inline card draw ────────────────────────────────────────────── */
function InlineCardDraw() {
  const [cardPhase, setCardPhase] = useState<CardPhase>("choosing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CARD_STORAGE_KEY);
      if (stored) {
        const { cardIndex, date } = JSON.parse(stored);
        if (date === getTodayStr()) {
          setSelectedIndex(cardIndex);
          setIsFlipped(true);
          setCardPhase("revealed");
        }
      }
    } catch {}
  }, []);

  function handleCardClick(index: number) {
    if (cardPhase === "revealed") {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
      return;
    }
    setSelectedIndex(index);
    localStorage.setItem(CARD_STORAGE_KEY, JSON.stringify({ cardIndex: index, date: getTodayStr() }));
    setTimeout(() => {
      setIsFlipped(true);
      setTimeout(() => setCardPhase("revealed"), 950);
    }, 80);
  }

  const selectedCard = selectedIndex !== null ? ORACLE_CARDS[selectedIndex] : null;
  const isDone = cardPhase === "revealed";

  return (
    <div>
      <style>{`
        @keyframes eGlow{0%,100%{box-shadow:0 0 14px rgba(201,169,122,.2)}50%{box-shadow:0 0 36px rgba(201,169,122,.48)}}
        @keyframes eScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes eFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes eToast{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
        .e-flip{perspective:1100px}
        .e-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .9s cubic-bezier(.4,.2,.2,1)}
        .e-inner.flipped{transform:rotateY(180deg)}
        .e-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:11px;overflow:hidden}
        .e-face-front{transform:rotateY(180deg)}
        .e-glow{animation:eGlow 3s ease-in-out infinite}
        .e-track{animation:eScroll 36s linear infinite}
        .e-track.paused{animation-play-state:paused}
        .e-card{transition:transform .2s ease;cursor:pointer}
        .e-card:not(.done):hover{transform:translateY(-7px) scale(1.06) !important}
      `}</style>

      <p style={{ textAlign: "center", color: "#c9a97a", fontSize: "13px", fontStyle: "italic", opacity: 0.8, marginBottom: "18px" }}>
        {isDone ? "קלף המסר שלך להיום ✦" : "בחרי קלף מסר להיום ✦"}
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "18px" }}>
        <div className="e-flip" style={{ width: "180px", height: "270px" }}>
          <div className={`e-inner${isFlipped ? " flipped" : ""}`}>
            <div className={`e-face${!isFlipped ? " e-glow" : ""}`} style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,169,122,0.3)" }}>
              <OracleCardBack large />
            </div>
            <div className="e-face e-face-front" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "2px solid rgba(201,169,122,0.45)" }}>
              {selectedCard && <OracleCardFront card={selectedCard} />}
            </div>
          </div>
        </div>
      </div>

      {isDone && (
        <p style={{ textAlign: "center", color: "#c9a97a", fontSize: "12px", opacity: 0.55, fontStyle: "italic", marginBottom: "14px", animation: "eFadeUp .5s ease" }}>
          המסר שלך להיום נבחר 🌿 חזרי מחר לקלף חדש
        </p>
      )}

      <div style={{ overflow: "hidden", position: "relative" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right,rgba(90,62,40,1) 0%,transparent 16%,transparent 84%,rgba(90,62,40,1) 100%)" }} />
        <div className={`e-track${paused ? " paused" : ""}`} style={{ display: "flex", gap: "10px", width: "max-content", paddingBottom: "8px", alignItems: "flex-end" }}>
          {[...ORACLE_CARDS, ...ORACLE_CARDS].map((_, i) => {
            const pos = i % ORACLE_CARDS.length;
            const offset = pos - (ORACLE_CARDS.length - 1) / 2;
            const rotation = offset * 1.6;
            const isSel = isDone && pos === selectedIndex;
            return (
              <div
                key={i}
                className={`e-card${isDone ? " done" : ""}`}
                onClick={() => handleCardClick(i % ORACLE_CARDS.length)}
                style={{ width: "70px", height: "105px", flexShrink: 0, transform: `rotate(${rotation}deg)`, opacity: isDone ? (isSel ? 1 : 0.22) : 1, filter: isDone && !isSel ? "blur(1px) saturate(0.3)" : "none", outline: isSel ? "2px solid rgba(201,169,122,.65)" : "none", outlineOffset: "2px", borderRadius: "6px" }}
              >
                <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.07)", border: `1px solid ${isSel ? "rgba(201,169,122,.55)" : "rgba(201,169,122,.22)"}`, borderRadius: "6px" }}>
                  <OracleCardBack />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {toastVisible && (
        <div style={{ position: "fixed", bottom: "28px", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(90,62,40,0.96)", border: "1px solid rgba(201,169,122,0.4)", color: "#f5f0e8", padding: "10px 24px", borderRadius: "40px", fontSize: "13px", animation: "eToast .3s ease", zIndex: 1000, whiteSpace: "nowrap" }}>
          כבר בחרת את הקלף שלך להיום 🌿
        </div>
      )}
    </div>
  );
}

/* ── Energy number cards ─────────────────────────────────────────── */
function EnergyCards({ nums, name }: { nums: EnergyNums; name: string }) {
  const { personalYear: py, personalMonth: pm, personalDay: pd } = nums;
  const synthesis = getSynthesis(py, pm, pd, "נקבה", name);
  const cards = [
    { label: "שנה אישית", num: py, title: yearContent[py].title, body: yearContent[py].brings },
    { label: "חודש אישי", num: pm, title: monthContent[pm].title, body: monthContent[pm].brings },
    { label: "יום אישי",  num: pd, title: dayContent[pd].recommended["נקבה"], body: "" },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {cards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl p-5 text-center" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,169,122,0.18)" }}>
            <div className="text-5xl font-bold mb-1" style={{ color: "#c9a97a" }}>{card.num}</div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c9a97a", opacity: 0.75 }}>{card.label}</div>
            <p className="text-xs font-bold mb-2 leading-snug" style={{ color: "#f5f0e8" }}>{card.title}</p>
            {card.body && <p className="text-xs" style={{ color: "#f5f0e8", opacity: 0.58, lineHeight: 1.7 }}>{card.body}</p>}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="rounded-2xl p-5 mb-6 text-center" style={{ backgroundColor: "rgba(201,169,122,0.10)", border: "1px solid rgba(201,169,122,0.22)" }}>
        <p className="text-sm" style={{ color: "#f5f0e8", lineHeight: 1.9 }}>{synthesis}</p>
      </motion.div>
    </div>
  );
}

/* ── Registration popup ──────────────────────────────────────────── */
interface PopupProps {
  previewName: string;
  previewBirthDate: string;
  onSuccess: (user: AuthUser, nums: EnergyNums) => void;
  onDecline: () => void;
  onClose: () => void;
}

function RegistrationPopup({ previewName, previewBirthDate, onSuccess, onDecline, onClose }: PopupProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const autoPassword = crypto.randomUUID?.() ?? Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: previewName, email, phone: phone || undefined, birthDate: previewBirthDate, password: autoPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "שגיאה בהרשמה"); return; }
      const n = calculate({ name: data.name, birthDate: data.birthDate, gender: "נקבה" });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: data.name, birthDate: data.birthDate, gender: "נקבה" }));
      localStorage.removeItem(PREVIEW_USED_KEY);
      onSuccess({ name: data.name, birthDate: data.birthDate }, n);
    } finally { setSubmitting(false); }
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.72)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35 }}
        dir="rtl"
        style={{ backgroundColor: "#4a2e1a", borderRadius: "24px", padding: "36px 32px", maxWidth: "400px", width: "100%", border: "1px solid rgba(201,169,122,0.3)", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: "16px", left: "16px", color: "#f5f0e8", opacity: 0.35, background: "none", border: "none", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}>✕</button>

        <div className="text-center mb-6">
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>✨</div>
          <h3 style={{ color: "#f5f0e8", fontSize: "19px", fontWeight: "bold", lineHeight: 1.35, marginBottom: "8px" }}>
            רוצה לדעת את האנרגיה שלך בכל יום?
          </h3>
          <p style={{ color: "#f5f0e8", opacity: 0.6, fontSize: "13px", lineHeight: 1.7 }}>
            הירשמי בחינם — גישה לאנרגיה ולקלף מסר כל יום
          </p>
        </div>

        {/* Pre-filled details display */}
        <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", border: "1px solid rgba(201,169,122,0.18)" }}>
          <p style={{ color: "#c9a97a", fontSize: "11px", opacity: 0.75, marginBottom: "4px" }}>הפרטים שלך</p>
          <p style={{ color: "#f5f0e8", fontSize: "13px", fontWeight: 500 }}>{previewName}</p>
          <p style={{ color: "#f5f0e8", fontSize: "12px", opacity: 0.6 }}>{previewBirthDate}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="email" placeholder="כתובת מייל" value={email} onChange={(e) => setEmail(e.target.value)} required className={INPUT_CLS} style={FIELD} />
          <input type="tel" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT_CLS} style={FIELD} />

          {error && <p style={{ color: "#fca5a5", fontSize: "12px", textAlign: "center" }}>{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            style={{ backgroundColor: "#c9a97a", color: "#5a3e28", padding: "13px", borderRadius: "40px", fontWeight: "bold", fontSize: "14px", border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.65 : 1, marginTop: "4px" }}
          >
            {submitting ? "...נרשמת" : "הירשמי בחינם ←"}
          </button>
          <button
            type="button"
            onClick={onDecline}
            style={{ color: "#f5f0e8", opacity: 0.35, fontSize: "12px", background: "none", border: "none", cursor: "pointer", textAlign: "center", paddingTop: "2px" }}
          >
            לא רוצה להירשם
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function EnergyTeaser() {
  const [view, setView] = useState<ViewState>("loading");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [nums, setNums] = useState<EnergyNums | null>(null);
  const [previewName, setPreviewName] = useState("");
  const [previewBirthDate, setPreviewBirthDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DECLINED_KEY) === "true") {
      setDeclined(true);
      return;
    }
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((user) => {
        if (user?.userId) {
          setAuthUser({ name: user.name, birthDate: user.birthDate });
          const n = calculate({ name: user.name, birthDate: user.birthDate, gender: "נקבה" });
          setNums(n);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: user.name, birthDate: user.birthDate, gender: "נקבה" }));
          setView("logged_in");
        } else {
          setView(localStorage.getItem(PREVIEW_USED_KEY) === "true" ? "locked" : "preview_form");
        }
      })
      .catch(() => {
        setView(localStorage.getItem(PREVIEW_USED_KEY) === "true" ? "locked" : "preview_form");
      });
  }, []);

  // Show popup 4 seconds after results appear
  useEffect(() => {
    if (view !== "preview_results") return;
    const t = setTimeout(() => setShowPopup(true), 4000);
    return () => clearTimeout(t);
  }, [view]);

  function handlePreviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!previewName || !previewBirthDate) return;
    const n = calculate({ name: previewName, birthDate: previewBirthDate, gender: "נקבה" });
    setNums(n);
    localStorage.setItem(PREVIEW_USED_KEY, "true");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: previewName, birthDate: previewBirthDate, gender: "נקבה" }));
    setView("preview_results");
  }

  function handlePopupSuccess(user: AuthUser, n: EnergyNums) {
    setAuthUser(user);
    setNums(n);
    setShowPopup(false);
    setView("logged_in");
  }

  function handleDecline() {
    localStorage.setItem(DECLINED_KEY, "true");
    setShowPopup(false);
    setDeclined(true);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error || "מייל או סיסמה שגויים"); return; }
      setAuthUser({ name: data.name, birthDate: data.birthDate });
      const n = calculate({ name: data.name, birthDate: data.birthDate, gender: "נקבה" });
      setNums(n);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: data.name, birthDate: data.birthDate, gender: "נקבה" }));
      localStorage.removeItem(PREVIEW_USED_KEY);
      setView("logged_in");
    } finally { setLoginSubmitting(false); }
  }

  if (declined) return null;

  return (
    <>
      <section id="energy" className="section-padding" dir="rtl" style={{ backgroundColor: "#5a3e28" }}>
        <div className="container-max">
          <AnimatePresence mode="wait">

            {view === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#c9a97a", borderTopColor: "transparent" }} />
              </motion.div>
            )}

            {/* ── Form: שם מלא + תאריך לידה ── */}
            {view === "preview_form" && (
              <motion.div key="preview_form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto text-center">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a97a" }}>גלי את האנרגיה שלך</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-snug" style={{ color: "#f5f0e8" }}>
                  מה המספרים מספרים<br />עלייך היום?
                </h2>
                <p className="text-base mb-8" style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.85 }}>
                  הכניסי שם ותאריך לידה וגלי את האנרגיה שלך לשנה, לחודש וליום — בחינם.
                </p>
                <form onSubmit={handlePreviewSubmit} className="flex flex-col gap-4 text-right">
                  <input type="text" placeholder="שם מלא" value={previewName} onChange={(e) => setPreviewName(e.target.value)} required className={INPUT_CLS} style={FIELD} />
                  <div>
                    <label className="block text-xs mb-1.5 text-right" style={{ color: "#c9a97a" }}>תאריך לידה</label>
                    <input type="date" value={previewBirthDate} onChange={(e) => setPreviewBirthDate(e.target.value)} required className={INPUT_CLS} style={{ ...FIELD, colorScheme: "dark" } as React.CSSProperties} />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2" style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}>
                    גלי את האנרגיה שלך ✨
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── Results: ניתוח + בחירת קלף ── */}
            {view === "preview_results" && nums && (
              <motion.div key="preview_results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#c9a97a" }}>האנרגיה שלך היום</p>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#f5f0e8" }}>
                    {previewName ? `שלום ${previewName.split(" ")[0]} ✨` : "האנרגיה שלך ✨"}
                  </h2>
                </div>
                <EnergyCards nums={nums} name={previewName.split(" ")[0]} />
                <div className="my-8 flex items-center gap-4 max-w-xl mx-auto">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,169,122,0.2)" }} />
                  <span style={{ color: "#c9a97a", opacity: 0.6, fontSize: "12px" }}>✦</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,169,122,0.2)" }} />
                </div>
                <div className="max-w-lg mx-auto">
                  <InlineCardDraw />
                </div>
              </motion.div>
            )}

            {/* ── Locked: show login ── */}
            {view === "locked" && (
              <motion.div key="locked" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto text-center">
                <div className="text-5xl mb-5">🔒</div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: "#f5f0e8" }}>האנרגיה היומית שלך מחכה</h2>
                <p className="text-sm mb-8" style={{ color: "#f5f0e8", opacity: 0.72, lineHeight: 1.85 }}>
                  כניסה לאזור האישי לגישה מלאה לאנרגיה שלך וקלף מסר — כל יום.
                </p>
                <button onClick={() => setView("login_form")} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md" style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}>
                  כניסה לאזור האישי ←
                </button>
              </motion.div>
            )}

            {/* ── Login form ── */}
            {view === "login_form" && (
              <motion.div key="login_form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="max-w-sm mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#f5f0e8" }}>כניסה לאזור האישי</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <input type="email" placeholder="כתובת מייל" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className={INPUT_CLS} style={FIELD} />
                  <input type="password" placeholder="סיסמה" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className={INPUT_CLS} style={FIELD} />
                  {loginError && <p className="text-xs text-center" style={{ color: "#fca5a5" }}>{loginError}</p>}
                  <button type="submit" disabled={loginSubmitting} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-md mt-2 disabled:opacity-60" style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}>
                    {loginSubmitting ? "...נכנסת" : "כניסה ←"}
                  </button>
                  <button type="button" onClick={() => setView("locked")} className="text-xs text-center" style={{ color: "#f5f0e8", opacity: 0.35 }}>חזרה</button>
                </form>
              </motion.div>
            )}

            {/* ── Logged in: ניתוח + קלף ── */}
            {view === "logged_in" && authUser && nums && (
              <motion.div key="logged_in" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#c9a97a" }}>האנרגיה היומית שלך</p>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#f5f0e8" }}>
                    שלום {authUser.name.split(" ")[0]} ✨
                  </h2>
                </div>
                <EnergyCards nums={nums} name={authUser.name.split(" ")[0]} />
                <div className="my-8 flex items-center gap-4 max-w-xl mx-auto">
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,169,122,0.2)" }} />
                  <span style={{ color: "#c9a97a", opacity: 0.6, fontSize: "12px" }}>✦</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "rgba(201,169,122,0.2)" }} />
                </div>
                <div className="max-w-lg mx-auto">
                  <InlineCardDraw />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── Registration popup ── */}
      <AnimatePresence>
        {showPopup && (
          <RegistrationPopup
            previewName={previewName}
            previewBirthDate={previewBirthDate}
            onSuccess={handlePopupSuccess}
            onDecline={handleDecline}
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
