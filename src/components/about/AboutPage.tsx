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
            שלום, אני מיטל 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cream/75 text-xl leading-relaxed"
          >
            מאמנת נומרולוגיה, מנחת מעגלי נשים וחרא של אישה שעברה דרך.
            <br />
            <span className="text-gold">עכשיו אני כאן בשבילך.</span>
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Portrait placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-first md:order-last"
            >
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-gold/30 to-terracotta/20 flex items-center justify-center border border-gold/20 overflow-hidden">
                  <div className="text-center text-brown/40">
                    <div className="text-6xl mb-4">🌺</div>
                    <p className="text-sm">תמונה של מיטל</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-gold/20 -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-sage/20 -z-10" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5 text-brown/80 leading-relaxed text-lg"
            >
              <p>
                לפני כעשר שנים, מצאתי את עצמי בצומת דרכים. הייתי{" "}
                <strong className="text-brown">אישה מוצלחת על הנייר</strong> — עבודה טובה,
                משפחה, בית — אבל משהו בפנים כאב. תחושה שאני לא חיה את החיים שנועדו לי.
              </p>
              <p>
                אז נפלה לידי ספרות על נומרולוגיה. בהתחלה הייתי ספקנית, אבל הנתונים דיברו
                בעד עצמם. המספרים שלי תיארו אותי{" "}
                <strong className="text-brown">ברמת דיוק שהרעידה אותי</strong>.
              </p>
              <p>
                התחלתי ללמוד לעומק, להסמך, ולעבוד עם נשים. ואז הגילוי האמיתי — כשנשים
                מבינות את עצמן דרך המספרים, משהו נפתח בהן.{" "}
                <strong className="text-gold">הן הופכות למי שהן תמיד היו.</strong>
              </p>
              <p>
                מאז ליוויתי למעלה מ-500 נשים בדרך לחיים שמרגישים נכונים. זה הייעוד שלי.
                זה למה אני קמה בבוקר.
              </p>
            </motion.div>
          </div>
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
              "כשאישה מתעוררת, העולם מתעורר איתה."
            </p>
          </motion.div>
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
          <h2 className="text-3xl font-bold text-brown mb-4">
            רוצה להכיר אותי בעצמך?
          </h2>
          <p className="text-brown/70 mb-8 text-lg">
            בואי לשיחת היכרות חינמית ונראה יחד איך אני יכולה לתמוך בך.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 bg-brown text-cream font-semibold rounded-full text-lg hover:bg-brown-light hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            קבעי שיחה חינמית ←
          </Link>
        </motion.div>
      </section>
    </>
  );
}
