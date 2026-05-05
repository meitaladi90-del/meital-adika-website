"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

const services = [
  {
    icon: "🔢",
    title: "ייעוץ נומרולוגיה אישי",
    tagline: "קריאת מפת לידה • ייעוד • כוחות",
    description: "פגישה 1:1 מעמיקה בה נפענח יחד את מפת המספרים שלך וגלי מה הם חושפים על ייעודך, כוחותייך ואתגרייך.",
    color: "bg-brown",
    textColor: "text-cream",
    href: "/services#numerology",
  },
  {
    icon: "🎨",
    title: "סדנת לוח חזון",
    tagline: "קבוצה קטנה • יצירה • גיבוש כוונות",
    description: "בסדנה קבוצתית חמה ויוצרת נבנה ביחד לוח חזון ויזואלי שמייצג את החיים שאת רוצה ליצור.",
    color: "bg-terracotta",
    textColor: "text-cream",
    href: "/services#vision-board",
  },
  {
    icon: "🌸",
    title: "מעגל נשים",
    tagline: "מרחב בטוח • ריפוי • אנרגיה נשית",
    description: "מפגש מעמיק של נשים המגיעות לחלוק, לרפא ולהתחבר לאנרגיה הנשית הטבעית שבהן.",
    color: "bg-sage",
    textColor: "text-cream",
    href: "/services#womens-circle",
  },
  {
    icon: "🏡",
    title: "טיהור בית ומרחב",
    tagline: "ניקוי אנרגטי • בסמודג׳ • ריענון",
    description: "שירות מקיף לניקוי אנרגטי של הבית, כולל כלים וחומרים לטיפול עצמאי לאחר מכן.",
    color: "bg-gold",
    textColor: "text-brown",
    href: "/services#space-purification",
  },
];

export default function ServicesTeaser() {
  return (
    <section className="section-padding bg-gradient-to-b from-cream to-brown/5">
      <div className="container-max">
        <SectionTitle
          tag="שירותים"
          title="איך אני יכולה לעזור לך?"
          subtitle="כל שירות תוכנן כדי לתת לך כלים אמיתיים, תובנות מעמיקות וחוויה שתשנה את חייך."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={service.href}
                className={`block rounded-2xl p-8 ${service.color} ${service.textColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <p className="text-sm opacity-70 mb-3 tracking-wide">{service.tagline}</p>
                <p className="opacity-80 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>קראי עוד</span>
                  <span className="transition-transform group-hover:-translate-x-1">←</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-brown text-brown font-medium rounded-full hover:bg-brown hover:text-cream transition-all duration-300 hover:-translate-y-0.5"
          >
            לכל השירותים ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
