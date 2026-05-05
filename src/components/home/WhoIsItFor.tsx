"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

const cards = [
  {
    icon: "🌿",
    title: "את בצומת דרכים",
    description:
      "את מרגישה שמשהו צריך להשתנות, אבל לא בטוחה לאיפה ללכת. את מחפשת בהירות, כיוון וחיבור מחודש לעצמך.",
    color: "from-sage/20 to-sage/5",
    border: "border-sage/30",
  },
  {
    icon: "✨",
    title: "את מחפשת את עצמך",
    description:
      "את יודעת שיש בך פוטנציאל עצום, אבל לא מצאת עדיין את הדרך לממש אותו. את רוצה לגלות את ייעודך ולחיות חיים אותנטיים.",
    color: "from-gold/20 to-gold/5",
    border: "border-gold/30",
  },
  {
    icon: "🦋",
    title: "את מוכנה לשינוי",
    description:
      "את בשלה לפעול, לצמוח ולהשיל את מה שכבר לא משרת אותך. את רוצה כלים אמיתיים שיעזרו לך לחיות את החיים שתמיד חלמת עליהם.",
    color: "from-terracotta/20 to-terracotta/5",
    border: "border-terracotta/30",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-max">
        <SectionTitle
          tag="מי זה בשבילך?"
          title="את לא לבד במסע הזה"
          subtitle="המקום הזה נבנה במיוחד עבורך — אישה שמוכנה לפגוש את עצמה לעומק ולחיות חיים שמרגישים נכונים."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 bg-gradient-to-br ${card.color} border ${card.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-brown mb-3">{card.title}</h3>
              <p className="text-brown/70 leading-relaxed">{card.description}</p>

              {/* Decorative corner */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
