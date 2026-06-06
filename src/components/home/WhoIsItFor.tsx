"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const cards = [
  {
    icon: "",
    title: "את בצומת דרכים",
    description:
      "את מרגישה שמשהו צריך להשתנות, אבל לא בטוחה לאיפה ללכת. את מחפשת בהירות, כיוון וחיבור מחודש לעצמך.",
    color: "from-sage/20 to-sage/5",
    border: "border-sage/30",
  },
  {
    icon: "",
    title: "את מחפשת את עצמך",
    description:
      "את יודעת שיש בך פוטנציאל עצום, אבל לא מצאת עדיין את הדרך לממש אותו. את רוצה לגלות את ייעודך ולחיות חיים שבהם תרגישי שאת מאושרת וקמה עם חשק ליום שמגיע.",
    color: "from-gold/20 to-gold/5",
    border: "border-gold/30",
  },
  {
    icon: "",
    title: "את מוכנה לשינוי",
    description:
      "את מוכנה לפגוש את עצמך לעומק, לצמוח ולהשיל את מה שכבר לא משרת אותך. את רוצה כלים שיעזרו לך לחיות את החיים שאת חולמת עליהם.",
    color: "from-terracotta/20 to-terracotta/5",
    border: "border-terracotta/30",
  },
];

export default function WhoIsItFor() {
  return (
    <>
      <section className="section-padding bg-cream">
        <div className="container-max">
          <SectionTitle title="זה לא במקרה שהגעת לכאן" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 bg-gradient-to-br ${card.color} border ${card.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center`}
              >
                {card.icon && <div className="text-4xl mb-4">{card.icon}</div>}
                <h3 className="text-xl font-bold text-brown mb-3">{card.title}</h3>
                <p className="text-brown/70 leading-relaxed">{card.description}</p>
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full py-14 px-4 text-center"
        dir="rtl"
        style={{ backgroundColor: "#5a3e28" }}
      >
        <p className="text-2xl md:text-3xl font-bold mb-5" style={{ color: "#c9a97a" }}>
          גם אני הייתי שם
        </p>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-5" style={{ color: "#f5f0e8", opacity: 0.85 }}>
          בתוך המטריקס של החיים. עובדת, מתפקדת, ומרגישה שמשהו חסר.
          <br className="hidden md:block" />
          בדרך גיליתי על עצמי דברים חדשים, חקרתי, והפכתי לגרסה הטובה ביותר של עצמי — היום אני חיה את החיים שתמיד רציתי, עיסוק שממלא אותי, שגרה שנעימה לי, וחיי אהבה.
        </p>
        <p className="text-2xl md:text-3xl font-bold" style={{ color: "#c9a97a" }}>
          לחיים שמרגישים נכונים לך
        </p>
      </motion.section>
    </>
  );
}
