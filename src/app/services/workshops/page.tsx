import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "סדנאות - מיטל עדיקה",
  description: "סדנאות נומרולוגיה, לוח חזון וחיבור לאינטואיציה - חוויות קבוצתיות בלתי נשכחות.",
};

const workshops = [
  {
    icon: "🔢",
    title: "סדנת נומרולוגיה",
    description: "כל משתתפת מקבלת הצצה אישית ומרתקת למפת המספרים שלה. מדויק, מפתיע ומרגש.",
    href: "/services/numerology-workshop",
  },
  {
    icon: "🎨",
    title: "סדנת לוח חזון",
    description: "ניצור יחד לוח חזון ויזואלי ומרגש, נעשה טיהור אנרגטי ונכתוב את המציאות הרצויה.",
    href: "/services/vision-board",
  },
  {
    icon: "🧭",
    title: "סדנת חיבור לאינטואיציה",
    description: "כלים פרקטיים לפיתוח הקול הפנימי ולסמוך על תחושות הבטן.",
    href: "/services/intuition",
  },
];

export default function WorkshopsPage() {
  return (
    <main dir="rtl" style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto px-4 py-32">

        <Link href="/services" className="text-sm mb-8 inline-block" style={{ color: "#c9a97a" }}>
          ← חזרה לשירותים
        </Link>

        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a97a" }}>
          סדנאות
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#5a3e28" }}>
          סדנאות קבוצתיות
        </h1>
        <p className="text-base mb-12" style={{ color: "#5a3e28", opacity: 0.7, lineHeight: 1.85 }}>
          מושלם ליום הולדת, מסיבת רווקות, ערב חברות או כל אירוע מיוחד.
        </p>

        <div className="space-y-6">
          {workshops.map((w, i) => (
            <div
              key={i}
              className="rounded-2xl p-7"
              style={{ backgroundColor: "#ede8df", border: "1px solid rgba(201,169,122,0.2)" }}
            >
              <div className="text-3xl mb-3">{w.icon}</div>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#5a3e28" }}>{w.title}</h2>
              <p className="text-sm mb-5" style={{ color: "#5a3e28", opacity: 0.75, lineHeight: 1.8 }}>
                {w.description}
              </p>
              <Link
                href={w.href}
                className="inline-block py-2.5 px-7 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "#6b7c5e", color: "#fff" }}
              >
                לפרטים נוספים ←
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
