import Link from "next/link";

const services = [
  {
    icon: "🔢",
    title: "ייעוץ נומרולוגי אישי 1:1",
    description:
      "סשן אישי של שעה עד שעה וחצי בו נפתח יחד את המפה המדויקת שלך לפי תאריך הלידה. נבין את החסמים והאתגרים, הפוטנציאל והייעוד שלך - ותצאי עם כלים לדרך.",
    cta: "לפרטים על ייעוץ אישי ←",
    href: "/services/personal",
  },
  {
    icon: "🔢",
    title: "סדנת נומרולוגיה",
    description:
      "כל משתתפת מקבלת הצצה אישית ומרתקת למפת המספרים שלה. נבין את האנרגיה, החוזקות והייעוד של כל אחת. מדויק, מפתיע ומרגש.",
    cta: "לפרטים על סדנת נומרולוגיה ←",
    href: "/services/numerology-workshop",
  },
  {
    icon: "🎨",
    title: "סדנת לוח חזון",
    description:
      "ביחד ניצור לוח חזון ויזואלי ומרגש, נעשה טיהור אנרגטי, נכתוב את המציאות הרצויה - וכל משתתפת תצא עם לוח אישי שמזכיר לה כל יום לאן היא הולכת.",
    cta: "לפרטים על סדנת לוח חזון ←",
    href: "/services/vision-board",
  },
  {
    icon: "🧭",
    title: "סדנת חיבור לאינטואיציה",
    description:
      "כלים פרקטיים לפיתוח הקול הפנימי. נלמד להבחין בין הפחד לבין האינטואיציה, לצאת מאזורי נוחות ולסמוך על תחושות הבטן.",
    cta: "לפרטים על סדנת אינטואיציה ←",
    href: "/services/intuition",
  },
  {
    icon: "🌸",
    title: "מעגל נשים",
    description:
      "מרחב בטוח, מחבק ומרפא לנשים. מקום לעצור, לנשום, לשתף ולהתחבר לאנרגיה נשית משותפת. יוצאים עם תחושת מלאות וכוחות מחודשים.",
    cta: "לפרטים על מעגל נשים ←",
    href: "/services/womens-circle",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section
        className="pt-32 pb-16 px-4 md:px-8 text-center"
        dir="rtl"
        style={{ background: "linear-gradient(to bottom, #f5f0e8, #ede8df)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#c9a97a" }}>
            שירותים
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: "#5a3e28" }}>
            איך אני יכולה לעזור לך?
          </h1>
          <p className="text-base" style={{ color: "#5a3e28", opacity: 0.7, lineHeight: 1.85 }}>
            כל שירות נבנה כדי לפגוש אותך בדיוק איפה שאת - עם כלים אמיתיים ותובנות שתיקחי הביתה.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-16" dir="rtl">
        <div className="max-w-3xl mx-auto space-y-8 pt-12">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-8"
              style={{ backgroundColor: "#f5f0e8", boxShadow: "0 2px 16px rgba(90,62,40,0.06)", border: "1px solid rgba(201,169,122,0.15)" }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl text-3xl flex-shrink-0"
                  style={{ backgroundColor: "#ede5d4" }}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  {/* Image placeholder */}
                  <div
                    className="w-full rounded-xl mb-5 flex items-center justify-center text-sm"
                    style={{ height: "160px", backgroundColor: "#ede5d4", border: "2px dashed #c9a97a", color: "#c9a97a", opacity: 0.6 }}
                  >
                    הוסיפי תמונה כאן
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#5a3e28" }}>{s.title}</h2>
                  <p className="text-sm mb-6" style={{ color: "#5a3e28", opacity: 0.75, lineHeight: 1.85 }}>{s.description}</p>
                  <Link
                    href={s.href}
                    className="inline-block py-3 px-7 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
