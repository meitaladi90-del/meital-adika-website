"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "adikAura_daily";

const cards = [
  {
    series: "הקשבה לקול הפנימי",
    title: "לסמוך על הידיעה הפנימית",
    msg: "את מחפשת אישורים בחוץ, שואלת אנשים ומחפשת תשובות במקומות רחוקים. אבל האמת היא שאת כבר יודעת. שבי עם עצמך דקה אחת בשקט. התשובה הראשונה שעולה לך בבטן – היא התשובה הנכונה.",
  },
  {
    series: "הקשבה לקול הפנימי",
    title: "להוריד את הווליום של העולם",
    msg: "יש סביבך יותר מדי רעש ודעות של אחרים. זה הזמן לשים הכל על השתק, להיכנס פנימה, ולהקשיב לקול האחד והיחיד שקובע – הקול שלך.",
  },
  {
    series: "גוף, תנועה ונוכחות",
    title: "הקצב המדויק שלך",
    msg: "העולם לוחץ לרוץ, להספיק, להשיג. אבל לטבע יש קצב משלו, וגם לך. מותר לך להאט, מותר לך לקחת את הזמן. את בדיוק איפה שאת צריכה להיות.",
  },
  {
    series: "גוף, תנועה ונוכחות",
    title: "להחזיר את האנרגיה לגוף",
    msg: "המחשבות שלך רצות קדימה, מתכננות ומנתחות, והגוף נשאר מאחור. עצרי הכל עכשיו. הזיזי את האצבעות, גלגלי את הכתפיים, הרגישי את כפות הרגליים על הרצפה. תחזרי הביתה.",
  },
  {
    series: "שחרור, כתיבה וריפוי",
    title: "לנקות את המיכל",
    msg: "הלב שלך מלא במילים שלא נאמרו. קחי דף לבן ופשוט תתחילי לכתוב את כל מה שעולה, בלי סדר ובלי פילטרים. כשהדף יתמלא – קרעי אותו לחתיכות קטנות. שחררי את זה מהמערכת שלך.",
  },
  {
    series: "שחרור, כתיבה וריפוי",
    title: "לסלוח על מה שהיה",
    msg: "את מחזיקה אשמה או חרטה על משהו שעשית או שלא עשית בעבר. עשית את הכי טוב שיכולת עם הכלים שהיו לך אז. חבקי את עצמך של אז, ותגידי לה: תודה, אני סולחת לך.",
  },
  {
    series: "אומץ, מימוש ועוצמה",
    title: "הצעד הראשון",
    msg: "את מחכה שהפחד ייעלם כדי לפעול? הפחד לא ייעלם עד שלא תפעלי. את לא צריכה לראות את כל המדרגות, רק לעשות צעד אחד קטן ואמיץ קדימה. חבקי את הפחד – וצעדי איתו.",
  },
  {
    series: "אומץ, מימוש ועוצמה",
    title: "האור שלך הוא מתנה",
    msg: "כשאת מקטינה את עצמך או מחביאה את הכישרונות שלך, העולם מפספס אותך. הגיע הזמן לעמוד בזקיפות קומה, להרחיב את הנוכחות שלך ולהסכים להיראות.",
  },
  {
    series: "חמלה וקבלה",
    title: "את מספיקה",
    msg: "תנשמי. תרפי את המרדף השלם אחרי השלמות. את לא צריכה לתקן שום דבר בעצמך כרגע. כמו שאת, עם היתרונות, החסרונות, העליות והירידות – את פשוט מספיקה.",
  },
  {
    series: "חמלה וקבלה",
    title: "לסמוך על התהליך",
    msg: "לא הכל ברור עכשיו, ויש תחושה של ערפל. הכל קורה בזמן המדויק עבורך. גם כשאת לא רואה את זה, הדברים מסתדרים מאחורי הקלעים לטובתך העליונה.",
  },
  {
    series: "קלפי מנטרה",
    title: "הערך שלך קבוע",
    msg: "השווי שלך לא נקבע לפי כמה הספקת היום, כמה את מרוויחה או מה אחרים חושבים עלייך. את שווה וראויה מעצם היותך.",
  },
  {
    series: "קלפי מנטרה",
    title: "האור שלך",
    msg: "אל תכבי את האור שלך רק בגלל שמישהו אחר לא יודע איך לעכל אותו. תזרחי הכי חזק שאת יכולה.",
  },
];

type Phase = "loading" | "choosing" | "revealed" | "locked";

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getHebrewDate(): string {
  return new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ConcentricCircles({ diameter, count, color }: { diameter: number; count: number; color: string }) {
  return (
    <div style={{ position: "relative", width: diameter + "px", height: diameter + "px" }}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.round(diameter * (1 - i / count));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size + "px",
              height: size + "px",
              border: `1px solid ${color}`,
              borderRadius: "50%",
              opacity: 0.75 - i * 0.08,
            }}
          />
        );
      })}
    </div>
  );
}

function CardBack({ large }: { large?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: large ? "16px" : "4px",
        padding: large ? "28px" : "8px",
      }}
    >
      <ConcentricCircles
        diameter={large ? 130 : 44}
        count={large ? 6 : 3}
        color="#9B6B3A"
      />
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          color: "#C9A96E",
          fontSize: large ? "18px" : "9px",
          letterSpacing: large ? "0.2em" : "0.1em",
          textAlign: "center",
        }}
      >
        AdikAura
      </div>
      {large && (
        <div
          style={{
            color: "#9B6B3A",
            fontSize: "11px",
            fontStyle: "italic",
            letterSpacing: "0.08em",
            opacity: 0.8,
          }}
        >
          אנרגיה יומית
        </div>
      )}
    </div>
  );
}

function CardFront({ card }: { card: (typeof cards)[0] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "22px 18px 18px",
        textAlign: "center",
        animation: "auraFadeUp 0.55s ease 0.75s both",
      }}
    >
      <div style={{ color: "#C9A96E", fontSize: "22px", marginBottom: "10px", lineHeight: 1 }}>
        ✦
      </div>
      <div
        style={{
          color: "#9B6B3A",
          fontSize: "11px",
          letterSpacing: "0.09em",
          fontStyle: "italic",
          marginBottom: "12px",
          opacity: 0.9,
        }}
      >
        {card.series}
      </div>
      <h3
        style={{
          color: "#C9A96E",
          fontSize: "16px",
          fontStyle: "italic",
          fontWeight: 600,
          lineHeight: 1.45,
          marginBottom: "12px",
          letterSpacing: "0.02em",
        }}
      >
        {card.title}
      </h3>
      <div
        style={{
          color: "#9B6B3A",
          fontSize: "13px",
          letterSpacing: "0.18em",
          marginBottom: "12px",
          opacity: 0.65,
        }}
      >
        ✦ ✦ ✦
      </div>
      <p
        style={{
          color: "#E8D5B5",
          fontSize: "12.5px",
          lineHeight: 1.85,
          fontWeight: 300,
          flex: 1,
        }}
      >
        {card.msg}
      </p>
      <div style={{ color: "#C9A96E", fontSize: "15px", marginTop: "10px", opacity: 0.6 }}>
        ✦
      </div>
    </div>
  );
}

export default function DailyEnergySection() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { cardIndex, date } = JSON.parse(stored);
        if (date === getTodayStr()) {
          setSelectedIndex(cardIndex);
          setIsFlipped(true);
          setPhase("locked");
          return;
        }
      }
    } catch {}
    setPhase("choosing");
  }, []);

  function handleCardClick(index: number) {
    if (phase !== "choosing") {
      triggerToast("כבר בחרת את הקלף שלך להיום 🌿");
      return;
    }
    setSelectedIndex(index);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cardIndex: index, date: getTodayStr() })
    );
    setTimeout(() => {
      setIsFlipped(true);
      setTimeout(() => setPhase("revealed"), 950);
    }, 80);
  }

  function triggerToast(msg: string) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  const selectedCard = selectedIndex !== null ? cards[selectedIndex] : null;
  const isDone = phase === "revealed" || phase === "locked";

  return (
    <section
      dir="rtl"
      id="daily-card"
      style={{
        backgroundColor: "#5a3e28",
        padding: "64px 20px 80px",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;600&display=swap');

        @keyframes auraGlow {
          0%, 100% { box-shadow: 0 0 18px rgba(201,169,110,0.22); }
          50%       { box-shadow: 0 0 48px rgba(201,169,110,0.55), 0 0 90px rgba(201,169,110,0.12); }
        }
        @keyframes auraCarousel {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes auraFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes auraToast {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }

        .aura-flip-wrap { perspective: 1200px; }
        .aura-flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.4,0.2,0.2,1);
        }
        .aura-flip-inner.is-flipped { transform: rotateY(180deg); }
        .aura-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 14px; overflow: hidden;
        }
        .aura-face-front { transform: rotateY(180deg); }
        .aura-glowing { animation: auraGlow 3s ease-in-out infinite; }

        .aura-carousel-track { animation: auraCarousel 38s linear infinite; }
        .aura-carousel-track.paused { animation-play-state: paused; }

        .aura-carousel-card { transition: transform 0.2s ease, opacity 0.35s ease, filter 0.35s ease; cursor: pointer; }
        .aura-carousel-card:not(.done):hover { transform: translateY(-8px) scale(1.06) !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#C9A96E",
            fontSize: "clamp(24px, 5vw, 38px)",
            letterSpacing: "0.07em",
            fontWeight: 400,
            marginBottom: "10px",
          }}
        >
          האנרגיה היומית שלך
        </h2>
        <p
          style={{
            color: "#E8D5B5",
            fontSize: "16px",
            fontStyle: "italic",
            opacity: 0.75,
            marginBottom: "6px",
          }}
        >
          {isDone ? "הקלף שלך להיום" : "בחרי קלף אחד להיום"}
        </p>
        <p style={{ color: "#9B6B3A", fontSize: "13px", letterSpacing: "0.04em" }}>
          {getHebrewDate()}
        </p>
      </div>

      {/* ── Main flip card ── */}
      {phase !== "loading" && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div className="aura-flip-wrap" style={{ width: "280px", height: "420px" }}>
            <div className={`aura-flip-inner${isFlipped ? " is-flipped" : ""}`}>
              {/* Back */}
              <div
                className={`aura-face${!isFlipped && phase === "choosing" ? " aura-glowing" : ""}`}
                style={{ backgroundColor: "#2A1A08", border: "1px solid #9B6B3A" }}
              >
                <CardBack large />
              </div>
              {/* Front */}
              <div
                className="aura-face aura-face-front"
                style={{ backgroundColor: "#3D2010", border: "2px solid #9B6B3A" }}
              >
                {selectedCard && <CardFront card={selectedCard} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Locked / revealed message ── */}
      {isDone && (
        <p
          style={{
            textAlign: "center",
            color: "#9B6B3A",
            fontSize: "14px",
            fontStyle: "italic",
            opacity: 0.85,
            marginBottom: "44px",
            animation: "auraFadeUp 0.5s ease",
          }}
        >
          {phase === "locked"
            ? "המסר שלך להיום כבר נבחר 🌿 חזרי מחר לקלף חדש"
            : ""}
        </p>
      )}

      {/* ── Carousel ── */}
      {phase !== "loading" && (
        <div>
          <p
            style={{
              textAlign: "center",
              color: "#9B6B3A",
              fontSize: "13px",
              fontStyle: "italic",
              opacity: 0.65,
              marginBottom: "20px",
            }}
          >
            {isDone ? "הקלפים ממתינים למחר ✦" : "גלגלי בין הקלפים ובחרי אחד ✦"}
          </p>

          <div
            style={{ overflow: "hidden", position: "relative" }}
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
          >
            {/* Edge fade */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                pointerEvents: "none",
                background:
                  "linear-gradient(to right, #5a3e28 0%, transparent 14%, transparent 86%, #5a3e28 100%)",
              }}
            />

            <div
              className={`aura-carousel-track${carouselPaused ? " paused" : ""}`}
              style={{
                display: "flex",
                gap: "14px",
                width: "max-content",
                alignItems: "flex-end",
                paddingBottom: "16px",
              }}
            >
              {[...cards, ...cards].map((_, i) => {
                const pos = i % cards.length;
                const total = cards.length;
                const offset = pos - (total - 1) / 2;
                const rotation = offset * 1.6;
                const isSelected = isDone && pos === selectedIndex;

                return (
                  <div
                    key={i}
                    className={`aura-carousel-card${isDone ? " done" : ""}`}
                    onClick={() => handleCardClick(i % cards.length)}
                    style={{
                      width: "90px",
                      height: "136px",
                      flexShrink: 0,
                      transform: `rotate(${rotation}deg)`,
                      opacity: isDone ? (isSelected ? 1 : 0.28) : 1,
                      filter:
                        isDone && !isSelected ? "blur(1.5px) saturate(0.4)" : "none",
                      outline: isSelected ? "2px solid #C9A96E" : "none",
                      outlineOffset: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#2A1A08",
                        border: `1px solid ${isSelected ? "#C9A96E" : "#9B6B3A"}`,
                        borderRadius: "8px",
                      }}
                    >
                      <CardBack />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toastVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4A2C14",
            border: "1px solid #9B6B3A",
            color: "#E8D5B5",
            padding: "12px 28px",
            borderRadius: "40px",
            fontSize: "14px",
            fontFamily: "'Cormorant Garamond', serif",
            animation: "auraToast 0.3s ease",
            zIndex: 1000,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 28px rgba(0,0,0,0.45)",
          }}
        >
          {toastMsg}
        </div>
      )}
    </section>
  );
}
