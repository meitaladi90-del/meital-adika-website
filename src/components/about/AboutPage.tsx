"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

const strengths = [
  {
    icon: "🔍",
    title: "דיוק ועומק",
    description:
      "כל קריאה נומרולוגית אצלי היא מסע עמוק לתוך המספרים הייחודיים שלך. אני לא מתעצלת — אני מנתחת כל מספר, כל צומת, כל דפוס עד שמתגלה התמונה השלמה.",
  },
  {
    icon: "💛",
    title: "חום ואמפתיה",
    description:
      "הרגשת שלא הבינו אותך? אצלי את בטוחה. אני יוצרת מרחב חם, ללא שיפוטיות, שבו את יכולה להיות בדיוק מי שאת — עם כל הפחדים, החלומות והספקות.",
  },
  {
    icon: "🛠",
    title: "כלים לחיים",
    description:
      "אני לא נותנת לך תחזיות — אני נותנת לך כלים. כל מפגש מסתיים עם מודעות ברורה ואמצעים מעשיים שאת יכולה ליישם ממש באותו רגע.",
  },
];

const milestones = [
  { year: "2015", text: "גילוי הנומרולוגיה אחרי תקופת משבר" },
  { year: "2017", text: "הסמכה כיועצת נומרולוגיה" },
  { year: "2019", text: "פתיחת פרקטיקה עצמאית" },
  { year: "2021", text: "הסמכה כמנחת מעגלי נשים" },
  { year: "2023", text: "למעלה מ-500 נשים שליוויתי" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function GoldBold({ children }: { children: React.ReactNode }) {
  return (
    <strong style={{ color: "#c9a97a", fontWeight: 700 }}>{children}</strong>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-brown to-brown/90 text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gold text-sm tracking-widest uppercase"
          >
            הסיפור שלי
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight"
          >
            הדרך שלי
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cream/75 text-xl leading-relaxed"
          >
            מאמנת נומרולוגיה, מנחת מעגלי נשים וליווי נשים לחיים מיושרים.
            <br />
            <span className="text-gold">עכשיו אני כאן בשבילך.</span>
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="max-w-[700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-right"
            style={{ fontSize: "17px", lineHeight: 1.9, color: "#5a3e28cc" }}
          >
            <p style={{ marginBottom: "1.5rem" }}>
              תואר במנהל עסקים. משרד שיווק. קריירה &ldquo;מסודרת&rdquo;.
              הכל By the book — ועדיין, משהו היה חסר.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              אני לא אשכח את היום הזה, שישבתי מול המסך במשרד ושאלתי את עצמי:
              &rdquo;מה באתי לעשות בעולם? מה הייעוד שלי?&ldquo;
              הבנתי שככה אני פשוט לא רוצה להמשיך. ידעתי שלשבת תחת פלורסנט
              מ-9:00 עד 18:00, לעבוד אצל מישהו אחר ולהרגיש כבויה — זה פשוט לא
              אני. משהו חייב להשתנות.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              התחלתי בשאלה שלא ידעתי לאן היא תיקח אותי: במה אני באמת טובה? מה
              ממלא אותי? והתשובה הייתה אחת — <GoldBold>אנשים.</GoldBold>
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              תמיד ידעתי שיש לי יכולת להרגיש <GoldBold>אנשים</GoldBold>,
              לדעת איזו עצה לתת ולגרום להם לראות את הפוטנציאל שבהם. נזכרתי
              בכל אותם ה<GoldBold>אנשים</GoldBold> שאמרו לי: &rdquo;את זוכרת
              שאז אמרת לי משהו? הקשבתי לך וזה שינה הכל.&ldquo; פתאום דברים
              התחילו להתחבר.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              החיפוש הזה הוביל אותי למקומות שלא ציפיתי. הנומרולוגיה תמיד
              משכה אותי ברקע — אבל הטריגר האמיתי היה אחותי. היא זרקה לי משפט
              שנשמע לי כמו סינית: &rdquo;מיטל, את בשנת משוב, את מתחילה להתחבר
              לאנרגיה הנקבית שלך.&ldquo;
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              לא הבנתי מה היא רוצה ממני — אבל אמרתי לעצמי: טוב, אני נרשמת
              לקורס. ומה שקרה בפועל — המספרים שלי פשוט התחילו להתעורר.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              כבר בשיעור הראשון הרגשתי שהגוף והנשמה שלי מסונכרנים. הגעתי
              הביתה.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              מאז עברתי מסע שלם. יציאה מאזור הנוחות למרות הפחדים, טיפולים
              אנרגטיים ושבירת תקרות זכוכית שהיו שם שנים. היום — כל מה שאני
              מעבירה הלאה, התנסיתי בו על בשרי.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              אני משלבת כלים ריאליים ופרקטיים עם עולם הרוח, ומשתמשת
              בנומרולוגיה כדי לאבחן מה קורה לך בפנים ולבנות תוכנית מדויקת
              להתעוררות שלך — לחיים שבהם תרגישי מלאה עם עצמך.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              כי לכל אחת מאיתנו יש תאריך לידה. והתאריך הזה אומר עלינו הרבה
              יותר ממה שאת חושבת.
            </p>
            <p>
              אם אני הצלחתי לשנות את התדר ולמצוא את האור שלי —
              גם את יכולה.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-brown/5">
        <div className="max-w-2xl mx-auto">
          <SectionTitle tag="המסע שלי" title="צמיחה שלב אחר שלב" />
          <div className="mt-12 relative">
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gold/30" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 pb-8 relative"
              >
                <div className="flex-none w-12 h-12 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-xs font-bold text-brown z-10">
                  {m.year}
                </div>
                <div className="pt-3">
                  <p className="text-brown font-medium leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gradient-to-br from-sage to-sage-dark text-cream text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl block mb-6">🌿</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              המשימה שלי
            </h2>
            <p className="text-cream/85 text-xl leading-relaxed">
              לעזור לכל אישה לגלות מחדש מי היא — לא מה שאמרו לה שהיא — ולחיות חיים
              שמרגישים מדויקים, מלאי שמחה ושפע אמיתי.
            </p>
            <p className="text-gold text-2xl font-bold mt-8">
              &rdquo;כשאישה מתעוררת, העולם מתעורר איתה.&ldquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strengths */}
      <section className="section-padding bg-cream">
        <div className="container-max">
          <SectionTitle
            tag="מה מייחד אותי"
            title="3 הדברים שנשים אומרות עלי"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-brown mb-3">{s.title}</h3>
                <p className="text-brown/70 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 font-bold rounded-full text-lg hover:shadow-[0_6px_24px_rgba(201,169,122,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            style={{ background: "#c9a97a", color: "#5a3e28" }}
          >
            השאירי פרטים ואחזור אלייך 🤍
          </Link>
        </motion.div>
      </section>
    </>
  );
}
