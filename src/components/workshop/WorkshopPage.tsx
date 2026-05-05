"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import RegistrationForm from "@/components/workshop/RegistrationForm";

const sessions = [
  {
    number: 1,
    title: "היכרות עם עצמך דרך המספרים",
    subtitle: "מפגש ראשון",
    description:
      "פגישה מלאת גילויים שבה נפענח את מפת הנומרולוגיה שלך. נכיר את מספר הנפש, הביטוי והמסלול — ונבין מה הם חושפים על ייעודך הייחודי.",
    icon: "🔢",
    color: "bg-brown text-cream",
  },
  {
    number: 2,
    title: "מיפוי הנשמה וגילוי הייעוד",
    subtitle: "מפגש שני",
    description:
      "נצלול עמוק לתוך דפוסים חוזרים, מתנות שלא מוצות ואמונות מגבילות. נמפה את מה שמחזיק אותך במקום ואת מה שמחכה לכבשים.",
    icon: "🌙",
    color: "bg-sage text-cream",
  },
  {
    number: 3,
    title: "שחרור חסמים ויצירת כוונות",
    subtitle: "מפגש שלישי",
    description:
      "עם הבנה עמוקה של עצמך, ניצור ביחד תוכנית עבודה אישית. טכניקות שחרור, עבודה עם הגוף וגיבוש כוונות ברורות לשינוי.",
    icon: "✨",
    color: "bg-terracotta text-cream",
  },
  {
    number: 4,
    title: "יישום, שגרה ומסלול קדימה",
    subtitle: "מפגש רביעי",
    description:
      "המפגש שבו הכל מתחבר. נבנה יחד שגרה יומית שתשמור על האנרגיה הגבוהה, ונגדיר צעדים קונקרטיים לחיים שמרגישים נכונים.",
    icon: "🦋",
    color: "bg-gold text-cream",
  },
];

const faqs = [
  {
    q: "מהי אורך כל מפגש?",
    a: "כל מפגש הוא בין 90 ל-120 דקות. המפגשים מתקיימים אחת לשבועיים.",
  },
  {
    q: "האם המפגשים מקוונים או פיזיים?",
    a: "ניתן לבחור — פגישה פיזית (אזור המרכז) או זום. שתי האפשרויות מלאות בנוכחות ועומק.",
  },
  {
    q: "מה קורה אם הפסדתי מפגש?",
    a: "המפגשים מוקלטים ונשלחים. בנוסף, יש אפשרות לקביעת מועד חלופי.",
  },
  {
    q: "האם ניתן לשלם בתשלומים?",
    a: "בהחלט! ניתן לפרוס ל-2-4 תשלומים. צרי קשר לסידור.",
  },
];

export default function WorkshopPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 text-center bg-gradient-to-b from-brown to-brown-dark text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #c9a97a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="relative max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-gold text-sm tracking-widest uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-6"
          >
            ✦ תוכנית מעמיקה ✦
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            סדנת העומק —
            <br />
            <span className="text-gold">מסע של 4 מפגשים</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-cream/75 text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            תוכנית אינטנסיבית ומעמיקה לנשים שמוכנות לפגוש את עצמן לעומק
            ולחיות חיים שמרגישים אמיתיים ומדויקים.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-gold">₪1,200</p>
              <p className="text-cream/60 text-sm">4 מפגשים • תמיכה מלאה</p>
            </div>
            <a href="#register" className="px-9 py-4 bg-gold text-cream font-semibold rounded-full text-lg hover:bg-gold-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              הרשמי עכשיו ←
            </a>
          </motion.div>
        </div>
      </section>

      {/* Journey Sessions */}
      <section className="section-padding bg-cream">
        <div className="container-max">
          <SectionTitle
            tag="המסע"
            title="4 מפגשים שישנו את חייך"
            subtitle="כל מפגש בנוי על הקודם — ויחד הם יוצרים תמורה עמוקה ואמיתית."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${session.color} rounded-2xl p-8`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    {session.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-70 mb-1">
                      {session.subtitle}
                    </p>
                    <h3 className="text-xl font-bold mb-3">{session.title}</h3>
                    <p className="opacity-80 leading-relaxed text-sm">{session.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-padding bg-brown/5">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle tag="מה כלול" title="הכל כלול במחיר" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
            {[
              "4 מפגשים אישיים עמוקים",
              "קריאת מפת נומרולוגיה מפורטת",
              "הקלטות של כל המפגשים",
              "חומרים ועבודות בית בין מפגשים",
              "גישה לקבוצת תמיכה בוואטסאפ",
              "מעקב אחרי המסע שלך",
              "ספרייה של טכניקות ותרגולים",
              "תמיכה בין מפגשים בצ'אט",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gold/20"
              >
                <span className="text-gold text-lg">✓</span>
                <span className="text-brown font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream">
        <div className="max-w-2xl mx-auto">
          <SectionTitle tag="שאלות נפוצות" title="כל מה שרצית לדעת" />
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gold/20"
              >
                <h3 className="font-bold text-brown mb-2">{faq.q}</h3>
                <p className="text-brown/70 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="section-padding bg-gradient-to-br from-brown to-brown-dark">
        <div className="max-w-xl mx-auto">
          <SectionTitle
            tag="הרשמה"
            title="מוכנה להתחיל?"
            subtitle="מלאי את הטופס ואחזור אליך תוך 24 שעות."
            light
          />
          <div className="mt-10">
            <RegistrationForm />
          </div>
        </div>
      </section>
    </>
  );
}
