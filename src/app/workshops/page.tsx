import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "סדנאות | מיטל עדיקה",
  description:
    "סדנאות וחוויות קבוצתיות — לוח חזון, נומרולוגיה, חיבור לאינטואיציה ומעגל נשים. מושלם ליום הולדת, מסיבת רווקות וכל אירוע מיוחד.",
};

const WA_BASE = "https://wa.me/972542268860?text=";

interface Workshop {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  forWhom: string[];
  takeaways: string[];
  ctaLabel: string;
  waMessage: string;
  imageRight: boolean;
}

const workshops: Workshop[] = [
  {
    id: "vision-board",
    icon: "🎨",
    title: "סדנת לוח חזון",
    subtitle: "זימון המציאות הרצויה — ביזואלי, אנרגטי ועוצמתי",
    description:
      "ביחד ניצור לוח חזון ויזואלי ומרגש שמייצג בדיוק את החיים שאת רוצה לזמן לעצמך. במהלך הסדנה נעשה טיהור אנרגטי, נכתוב את המציאות הרצויה — וכל משתתפת תצא עם לוח אישי שמזכיר לה כל יום לאן היא הולכת. חוויה יוצרת, עוצמתית ובלתי נשכחת.",
    forWhom: [
      "מי שרוצה להתחבר מחדש לחלומות ולמטרות שלה",
      "מי שמחפשת חוויה יוצרת ומשמעותית עם חברות",
      "מי שרוצה להתחיל את השנה עם כוונה וכיוון ברור",
    ],
    takeaways: [
      "לוח חזון אישי ויזואלי מוכן",
      "כלים לזימון המציאות הרצויה",
      "אנרגיה מחודשת ומוטיבציה לפעול",
    ],
    ctaLabel: "להזמנת הסדנה ←",
    waMessage: "שלום מיטל! אני מעוניינת לשמוע על סדנת לוח חזון 🎨",
    imageRight: true,
  },
  {
    id: "numerology",
    icon: "🔢",
    title: "סדנת נומרולוגיה",
    subtitle: "כשהמספרים מספרים את הסיפור שלך",
    description:
      "סדנה מרתקת ומפתיעה שבה כל משתתפת מקבלת הצצה אישית למפת המספרים שלה. נבין את האנרגיה, החוזקות והייעוד של כל אחת — וגם את הדינמיקה בין המשתתפות. מדויק, מרגש ומשאיר אותך חושבת עליו עוד הרבה זמן אחרי.",
    forWhom: [
      "מי שסקרנית לגלות מה המספרים אומרים עליה",
      "קבוצה שרוצה להכיר אחת את השנייה לעומק",
      "מי שמחפשת חוויה אינטלקטואלית ורוחנית גם יחד",
    ],
    takeaways: [
      "הבנה של מפת המספרים האישית",
      "תובנות על חוזקות, אתגרים וייעוד",
      "כלים לקבלת החלטות נכונות בחיים",
    ],
    ctaLabel: "להזמנת הסדנה ←",
    waMessage: "שלום מיטל! אני מעוניינת לשמוע על סדנת נומרולוגיה 🔢",
    imageRight: false,
  },
  {
    id: "intuition",
    icon: "🧭",
    title: "סדנת חיבור לאינטואיציה",
    subtitle: "ללמוד לסמוך על הקול שתמיד ידע",
    description:
      "כולנו נולדנו עם אינטואיציה — אבל החיים לימדו אותנו להתעלם ממנה. בסדנה הזו נלמד יחד להבחין בין הפחד לבין הקול הפנימי האמיתי, לצאת מאזורי נוחות ולסמוך על תחושות הבטן. חוויה שפותחת משהו שלא ידעת שהיה שם — ולא תוכלי להתעלם ממנו אחרי.",
    forWhom: [
      "מי שמרגישה שהיא מתעלמת מהתחושות הפנימיות שלה",
      "מי שמתקשה לקבל החלטות ותמיד מטילה ספק בעצמה",
      "מי שרוצה להתחבר לעצמה בצורה עמוקה יותר",
    ],
    takeaways: [
      "כלים פרקטיים לזיהוי הקול הפנימי",
      "יכולת להבחין בין פחד לאינטואיציה",
      "ביטחון עצמי מחודש בקבלת החלטות",
    ],
    ctaLabel: "להזמנת הסדנה ←",
    waMessage: "שלום מיטל! אני מעוניינת לשמוע על סדנת חיבור לאינטואיציה 🧭",
    imageRight: true,
  },
  {
    id: "womens-circle",
    icon: "🌸",
    title: "מעגל נשים",
    subtitle: "מרחב בטוח שבו את יכולה להיות את עצמך",
    description:
      "המעגל הוא מקום שבו עוצרים את המירוץ. מקום לנשום, לשתף ולהתחבר לאנרגיה נשית משותפת ומרפאה. ללא שיפוטיות, ללא מסכות — רק נשים אמיתיות שיושבות יחד ומחזיקות אחת את השנייה. יוצאים עם תחושת מלאות, כוחות מחודשים ותובנות שמלוות אותך הרבה מעבר לערב.",
    forWhom: [
      "מי שמרגישה שהיא נותנת לכולם ושוכחת את עצמה",
      "מי שמחפשת קהילה נשית אמיתית ותומכת",
      "מי שרוצה לעצור רגע ולהתחבר לעצמה ולנשים סביבה",
    ],
    takeaways: [
      "תחושת מלאות וכוחות מחודשים",
      "חיבור לאנרגיה נשית פנימית וקבוצתית",
      "תובנות וכלים לדרך הביתה",
    ],
    ctaLabel: "להצטרפות למעגל ←",
    waMessage: "שלום מיטל! אני מעוניינת לשמוע על מעגל הנשים 🌸",
    imageRight: false,
  },
];

function ImagePlaceholder({ icon }: { icon: string }) {
  return (
    <div
      className="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: "#ede8df",
        border: "2px dashed rgba(201,169,122,0.45)",
      }}
    >
      <span className="text-5xl">{icon}</span>
      <span
        className="text-sm font-medium"
        style={{ color: "#5a3e28", opacity: 0.45 }}
      >
        הוסיפי תמונה כאן
      </span>
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div
      className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: "#ede8df",
        border: "2px dashed rgba(107,124,94,0.35)",
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(107,124,94,0.18)" }}
      >
        <span className="text-xl" style={{ color: "#6b7c5e" }}>
          ▶
        </span>
      </div>
      <span
        className="text-sm font-medium"
        style={{ color: "#5a3e28", opacity: 0.45 }}
      >
        הדביקי לינק לוידאו כאן
      </span>
    </div>
  );
}

export default function WorkshopsPage() {
  return (
    <main dir="rtl">
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 text-center"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#c9a97a" }}
          >
            סדנאות
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ color: "#5a3e28", lineHeight: 1.25 }}
          >
            סדנאות וחוויות קבוצתיות
          </h1>
          <p
            className="text-base md:text-lg"
            style={{ color: "#5a3e28", opacity: 0.7, lineHeight: 1.9 }}
          >
            מושלם ליום הולדת, מסיבת רווקות, ערב חברות —
            <br className="hidden md:block" />
            או כל רגע שרוצות לחוות משהו אמיתי ביחד
          </p>
        </div>
      </section>

      {/* Workshop sections */}
      {workshops.map((ws, i) => {
        const bg = i % 2 === 0 ? "#ffffff" : "#f5f0e8";
        // In RTL: flex-row puts first child on the right; flex-row-reverse puts first child on the left
        const rowClass = ws.imageRight ? "md:flex-row" : "md:flex-row-reverse";

        return (
          <section
            key={ws.id}
            id={ws.id}
            className="py-20 px-4 scroll-mt-24"
            style={{ backgroundColor: bg }}
          >
            <div className="max-w-5xl mx-auto">
              <div
                className={`flex flex-col ${rowClass} gap-10 md:gap-16 items-center`}
              >
                {/* Media column */}
                <div className="w-full md:w-5/12 flex flex-col gap-4 shrink-0">
                  <ImagePlaceholder icon={ws.icon} />
                  <VideoPlaceholder />
                </div>

                {/* Text column */}
                <div className="w-full md:w-7/12">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#c9a97a" }}
                  >
                    סדנה קבוצתית
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold mb-3"
                    style={{ color: "#5a3e28", lineHeight: 1.2 }}
                  >
                    {ws.title}
                  </h2>
                  <p
                    className="text-base font-semibold mb-6"
                    style={{ color: "#6b7c5e" }}
                  >
                    {ws.subtitle}
                  </p>
                  <p
                    className="text-sm mb-8"
                    style={{
                      color: "#5a3e28",
                      opacity: 0.82,
                      lineHeight: 1.95,
                    }}
                  >
                    {ws.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {/* למי זה מתאים */}
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "#f5f0e8" }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "#c9a97a" }}
                      >
                        למי זה מתאים
                      </p>
                      <ul className="space-y-2">
                        {ws.forWhom.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "#5a3e28", lineHeight: 1.7 }}
                          >
                            <span
                              style={{ color: "#c9a97a", flexShrink: 0, marginTop: "2px" }}
                            >
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* מה יוצאים עם מה */}
                    <div
                      className="rounded-xl p-4"
                      style={{ backgroundColor: "#eef2ee" }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "#6b7c5e" }}
                      >
                        מה יוצאים עם מה
                      </p>
                      <ul className="space-y-2">
                        {ws.takeaways.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "#5a3e28", lineHeight: 1.7 }}
                          >
                            <span
                              style={{ color: "#6b7c5e", flexShrink: 0, marginTop: "2px" }}
                            >
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={`${WA_BASE}${encodeURIComponent(ws.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
                  >
                    {ws.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: "#5a3e28" }}
      >
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#f5f0e8", lineHeight: 1.25 }}
          >
            לא בטוחה איזו סדנה מתאימה לך?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "#f5f0e8", opacity: 0.75, lineHeight: 1.9 }}
          >
            שלחי לי הודעה ונמצא יחד את החוויה הנכונה
            <br />
            עבורך ועבור הקבוצה שלך 🤍
          </p>
          <a
            href={`${WA_BASE}${encodeURIComponent(
              "שלום מיטל! אני מעוניינת לשמוע על הסדנאות שלך 🌟"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 rounded-full font-bold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: "#c9a97a", color: "#5a3e28" }}
          >
            לשיחה בוואטסאפ ←
          </a>
        </div>
      </section>
    </main>
  );
}
