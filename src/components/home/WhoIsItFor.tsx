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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full py-20 px-4 text-center"
        dir="rtl"
        style={{ backgroundColor: "#f5f0e8" }}
      >
        {/* Divider top */}
        <div className="mx-auto mb-10" style={{ width: "60px", height: "2px", backgroundColor: "#c9a97a" }} />

        <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#5a3e28" }}>
          גם אני הייתי שם
        </h2>

        <div className="max-w-[650px] mx-auto text-center" style={{ color: "#5a3e28", fontSize: "18px", lineHeight: "1.9" }}>
          <p className="mb-5">
            בתוך המטריקס של החיים. עובדת, מתפקדת, ומרגישה שמשהו חסר.
          </p>
          <p className="mb-5">
            עד שיום אחד התעוררתי — והחלטתי לשנות כיוון ולחיות את חיי החופש שלי.
          </p>
          <p className="mb-5">
            בדרך גיליתי על עצמי דברים חדשים, חקרתי, והפכתי לגרסה הטובה ביותר של עצמי — היום אני חיה את החיים שתמיד רציתי, עיסוק שממלא אותי, שגרה שנעימה לי, וחיי אהבה.
          </p>
          <p>
            ועכשיו אני כאן כדי ללוות אותך בדרך שלך — להתעוררות שלך.
          </p>
        </div>

        <p className="mt-8 font-bold" style={{ color: "#c9a97a", fontSize: "22px" }}>
          לחיים שמרגישים נכונים לך.
        </p>

        {/* Divider bottom */}
        <div className="mx-auto mt-10" style={{ width: "60px", height: "2px", backgroundColor: "#c9a97a" }} />
      </motion.section>
    </>
  );
}
