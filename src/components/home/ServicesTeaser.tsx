"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const personalServices = [
  {
    icon: "🔢",
    title: "ייעוץ נומרולוגי אישי",
    subtitle: "פתיחת מפה אישית מדויקת",
    description:
      "סשן אישי של שעה עד שעה וחצי בו נפתח יחד את המפה המדויקת שלך לפי תאריך הלידה. נבין את החסמים והאתגרים, הפוטנציאל והייעוד שלך - ותצאי עם כלים לדרך כדי ליצור חיים הרמוניים.",
  },
  {
    icon: "🏡",
    title: "טיהור בית ומרחב",
    subtitle: "ניקוי אנרגטי לחלל שלך",
    description:
      "טיהור אנרגטי מקיף לכל החלל. במידת הצורך - הוצאת חפצים שהאנרגיה שלהם לא מתאימה למרחב. בסיום תקבלי חבילת טיהור הכוללת מרווה וקריסטלים המתאימים לחלל שלך.",
  },
  {
    icon: "🎨",
    title: "סשן לוח חזון אישי",
    subtitle: "זימון המציאות הנכונה עבורך",
    description:
      "מפגש פנים מול פנים של שעה וחצי. ביחד ניצור לוח חזון מותאם אישית למטרות ולרצונות שלך לשנה הזו, נעשה טיהור אנרגטי, כתיבת המציאות הרצויה עבורך - וכלים מעשיים לממש אותה.",
  },
];

const groupWorkshops = [
  {
    icon: "🎨",
    title: "סדנת לוח חזון",
    description:
      "ניצור ביחד לוח חזון ויזואלי, טיהור אנרגטי וזימון המציאות הרצויה - חוויה יוצרת ועוצמתית לקבוצה.",
  },
  {
    icon: "🔢",
    title: "סדנת נומרולוגיה",
    description:
      "כל משתתפת תקבל הצצה אישית למפת המספרים שלה - מרתק, מדויק ומפתיע.",
  },
  {
    icon: "🧭",
    title: "סדנת חיבור לאינטואיציה",
    description:
      "כלים פרקטיים לפיתוח הקול הפנימי, יציאה מאזורי נוחות וחיבור לתחושות הבטן.",
  },
  {
    icon: "🌸",
    title: "מעגל נשים",
    description:
      "מרחב בטוח ומרפא לנשים - הקשבה, שיתוף וחיבור לאנרגיה נשית משותפת.",
  },
];

const WA_LINK =
  "https://wa.me/972542268860?text=" +
  encodeURIComponent("שלום מיטל! אני מעוניינת לשמוע על סדנה פרטית לקבוצה 🌸");

function scrollToContact() {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("he-IL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ServicesTeaser() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    fetch("/api/workshops")
      .then((r) => r.json())
      .then(setWorkshops)
      .catch(() => setWorkshops([]));
  }, []);

  return (
    <section
      className="section-padding bg-gradient-to-b from-cream to-cream/50"
      dir="rtl"
    >
      <div className="container-max">

        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#c9a97a" }}
          >
            שירותים
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#5a3e28" }}
          >
            איך אני יכולה לעזור לך?
          </h2>
          <p className="text-base" style={{ color: "#5a3e28", opacity: 0.65 }}>
            בחרי את מה שמדבר אלייך
          </p>
        </div>

        {/* ─── Category A: ליווי אישי 1:1 ─── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: "#c9a97a25", color: "#c9a97a" }}
            >
              ליווי אישי 1:1
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#c9a97a30" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {personalServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  backgroundColor: "#f5f0e8",
                  boxShadow: "0 2px 16px rgba(90,62,40,0.06)",
                }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "#5a3e28" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs font-semibold mb-4"
                  style={{ color: "#c9a97a" }}
                >
                  {service.subtitle}
                </p>
                <p
                  className="text-sm flex-1 mb-6"
                  style={{ color: "#5a3e28", opacity: 0.75, lineHeight: 1.85 }}
                >
                  {service.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                >
                  לתיאום ייעוץ אישי ←
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Category B: סדנאות פרטיות לקבוצות ─── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "#5a3e28" }}
            >
              מחפשת חוויה קבוצתית? 🌸
            </h3>
            <p className="text-sm" style={{ color: "#5a3e28", opacity: 0.65 }}>
              מושלם ליום הולדת, מסיבת רווקות, ערב חברות או כל אירוע מיוחד
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {groupWorkshops.map((ws, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  backgroundColor: "#ede8df",
                  boxShadow: "0 2px 12px rgba(90,62,40,0.05)",
                }}
              >
                <div className="text-3xl mb-3">{ws.icon}</div>
                <h4
                  className="text-base font-bold mb-2"
                  style={{ color: "#5a3e28" }}
                >
                  {ws.title}
                </h4>
                <p
                  className="text-sm flex-1 mb-5"
                  style={{ color: "#5a3e28", opacity: 0.75, lineHeight: 1.85 }}
                >
                  {ws.description}
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  style={{ backgroundColor: "#6b7c5e", color: "#fff" }}
                >
                  לפרטים ותיאום בוואטסאפ ←
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Category C: סדנאות פתוחות (only when data exists) ─── */}
        {workshops.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full whitespace-nowrap"
                style={{ backgroundColor: "#6b7c5e20", color: "#6b7c5e" }}
              >
                סדנאות פתוחות 🌟
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#6b7c5e30" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {workshops.map((ws, i) => (
                <motion.div
                  key={ws.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl p-6 flex flex-col"
                  style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 20px rgba(90,62,40,0.08)",
                    border: "1px solid #c9a97a30",
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4
                      className="text-lg font-bold"
                      style={{ color: "#5a3e28" }}
                    >
                      {ws.name}
                    </h4>
                    {ws.spotsLeft <= 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap"
                        style={{ backgroundColor: "#fdf5f0", color: "#c9a97a" }}
                      >
                        נותרו {ws.spotsLeft}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    <span className="text-xs" style={{ color: "#6b7c5e" }}>
                      📅 {formatDate(ws.date)}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7c5e" }}>
                      ⏰ {ws.time}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7c5e" }}>
                      📍 {ws.location}
                    </span>
                  </div>

                  <p
                    className="text-sm flex-1 mb-5"
                    style={{ color: "#5a3e28", opacity: 0.75, lineHeight: 1.85 }}
                  >
                    {ws.description}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs" style={{ color: "#6b7c5e" }}>
                      {ws.spotsLeft} מקומות פנויים מתוך {ws.maxSpots}
                    </span>
                    <button
                      onClick={scrollToContact}
                      className="px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                      style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                    >
                      להרשמה ←
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
