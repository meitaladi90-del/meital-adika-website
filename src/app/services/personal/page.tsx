import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ייעוץ נומרולוגי אישי - מיטל עדיקה",
  description: "סשן אישי של שעה עד שעה וחצי לפתיחת המפה הנומרולוגית שלך.",
};

const WA =
  "https://wa.me/972542268860?text=" +
  encodeURIComponent("שלום מיטל! אני מעוניינת לתאם ייעוץ נומרולוגי אישי 🔢");

export default function PersonalPage() {
  return (
    <main dir="rtl" style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto px-4 py-32">

        <Link href="/services" className="text-sm mb-8 inline-block" style={{ color: "#c9a97a" }}>
          ← חזרה לשירותים
        </Link>

        {/* Image placeholder */}
        <div
          className="w-full rounded-2xl mb-8 flex items-center justify-center text-sm"
          style={{ height: "220px", backgroundColor: "#ede5d4", border: "2px dashed #c9a97a", color: "#c9a97a" }}
        >
          הוסיפי תמונה כאן
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c9a97a" }}>
          ייעוץ אישי
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#5a3e28" }}>
          ייעוץ נומרולוגי אישי 1:1
        </h1>
        <p className="text-base mb-8" style={{ color: "#c9a97a", fontStyle: "italic" }}>
          פתיחת מפה אישית מדויקת - רק את ואני
        </p>

        <p className="text-base mb-8" style={{ color: "#5a3e28", lineHeight: 1.9, opacity: 0.85 }}>
          סשן אישי של שעה עד שעה וחצי בו נפתח יחד את המפה המדויקת שלך לפי תאריך הלידה.
          נבין את החסמים והאתגרים, הפוטנציאל והייעוד שלך - ותצאי עם כלים לדרך כדי ליצור חיים הרמוניים.
        </p>

        {/* Special box */}
        <div
          className="rounded-xl p-6 mb-10 text-center"
          style={{ backgroundColor: "#ede5d4", border: "1px solid #c9a97a" }}
        >
          <p className="font-bold mb-2" style={{ color: "#c9a97a" }}>🏡 הטבה מיוחדת</p>
          <p className="text-sm" style={{ color: "#5a3e28", lineHeight: 1.8 }}>
            מי שמגיעה לייעוץ אישי מקבלת הטבה לטיהור לבית - ניקוי אנרגטי של החלל
            עם מרווה וקריסטלים המתאימים לך ולמרחב שלך
          </p>
        </div>

        {/* למי זה מתאים */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#5a3e28" }}>למי זה מתאים</h2>
        <ul className="space-y-3 mb-10">
          {[
            "מי שמרגישה תקועה ורוצה כיוון ובהירות",
            "מי שבצומת החלטה - בקריירה, זוגיות או חיים",
            "מי שרוצה להבין את הייעוד והפוטנציאל שלה",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
              <span style={{ color: "#c9a97a", marginTop: "2px" }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        {/* מה יוצאים עם מה */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#5a3e28" }}>מה יוצאים עם מה</h2>
        <ul className="space-y-3 mb-12">
          {[
            "הבנה מעמיקה של המפה האישית שלך",
            "זיהוי חסמים, חוזקות וייעוד",
            "כלים מעשיים לקבלת החלטות נכונות",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
              <span style={{ color: "#c9a97a", marginTop: "2px" }}>✦</span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
        >
          לתיאום ייעוץ אישי ←
        </a>
      </div>
    </main>
  );
}
