import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "סדנת לוח חזון - מיטל עדיקה",
  description: "ביחד ניצור לוח חזון ויזואלי ומרגש שמייצג בדיוק את החיים שאת רוצה לזמן.",
};

const WA =
  "https://wa.me/972542268860?text=" +
  encodeURIComponent("שלום מיטל! אני מעוניינת לתאם סדנת לוח חזון 🎨");

export default function VisionBoardPage() {
  return (
    <main dir="rtl" style={{ backgroundColor: "#f5f0e8", minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto px-4 py-32">

        <Link href="/services/workshops" className="text-sm mb-8 inline-block" style={{ color: "#c9a97a" }}>
          ← חזרה לסדנאות
        </Link>

        {/* Image placeholder */}
        <div
          className="w-full rounded-2xl mb-8 flex items-center justify-center text-sm"
          style={{ height: "220px", backgroundColor: "#ede5d4", border: "2px dashed #c9a97a", color: "#c9a97a" }}
        >
          הוסיפי תמונה כאן
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#c9a97a" }}>
          סדנה קבוצתית
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#5a3e28" }}>
          סדנת לוח חזון
        </h1>
        <p className="text-base mb-8" style={{ color: "#c9a97a", fontStyle: "italic" }}>
          זימון המציאות הרצויה - ויזואלי, אנרגטי ועוצמתי
        </p>

        <p className="text-base mb-10" style={{ color: "#5a3e28", lineHeight: 1.9, opacity: 0.85 }}>
          ביחד ניצור לוח חזון ויזואלי ומרגש שמייצג בדיוק את החיים שאת רוצה לזמן לעצמך.
          במהלך הסדנה נעשה טיהור אנרגטי, נכתוב את המציאות הרצויה - וכל משתתפת תצא עם לוח
          אישי שמזכיר לה כל יום לאן היא הולכת. חוויה יוצרת, עוצמתית ובלתי נשכחת.
        </p>

        <h2 className="text-lg font-bold mb-4" style={{ color: "#5a3e28" }}>למי זה מתאים</h2>
        <ul className="space-y-3 mb-10">
          {[
            "מי שרוצה להתחבר מחדש לחלומות ולמטרות שלה",
            "מי שמחפשת חוויה יוצרת ומשמעותית עם חברות",
            "מי שרוצה להתחיל את השנה עם כוונה וכיוון ברור",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#5a3e28", lineHeight: 1.7 }}>
              <span style={{ color: "#c9a97a", marginTop: "2px" }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-bold mb-4" style={{ color: "#5a3e28" }}>מה יוצאים עם מה</h2>
        <ul className="space-y-3 mb-12">
          {[
            "לוח חזון אישי ויזואלי מוכן",
            "כלים לזימון המציאות הרצויה",
            "אנרגיה מחודשת ומוטיבציה לפעול",
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
          לתיאום סדנת לוח חזון ←
        </a>
      </div>
    </main>
  );
}
