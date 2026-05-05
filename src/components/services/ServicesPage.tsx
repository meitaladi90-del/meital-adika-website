"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

const services = [
  {
    id: "numerology",
    icon: "🔢",
    emoji_bg: "bg-brown/10",
    title: "ייעוץ נומרולוגיה אישי",
    tagline: "פגישה 1:1 • 90 דקות",
    price: "₪450",
    description:
      "פגישה מעמיקה ואישית שבה נפענח יחד את מפת המספרים שלך — מספר הנפש, מספר הביטוי, מספר המסלול ועוד. אגלה לך מה המספרים חושפים על ייעודך, כוחותייך, האתגרים שלך ואיך לנצל את האנרגיה הייחודית שלך.",
    includes: [
      "קריאת מפת לידה מפורטת",
      "ניתוח השם המלא",
      "שנת אישית ומה היא מביאה",
      "תובנות על מערכות יחסים",
      "כלים ליישום מיידי",
      "סיכום כתוב",
    ],
    cta: "קבעי פגישה",
    color: "border-brown",
    accent: "bg-brown text-cream",
  },
  {
    id: "vision-board",
    icon: "🎨",
    emoji_bg: "bg-terracotta/10",
    title: "סדנת לוח חזון",
    tagline: "קבוצה קטנה • 4 שעות",
    price: "₪290",
    description:
      "סדנה יצירתית ומהנה לקבוצה קטנה של נשים שבה בונות יחד לוח חזון ויזואלי שמייצג את החיים שאנחנו רוצות ליצור. שילוב של עבודה פנימית, כוונות, אמנות ואנרגיה קבוצתית.",
    includes: [
      "חומרים ליצירה כלולים",
      "גיבוש כוונות ומטרות",
      "עבודה עם תמונות וחזון",
      "טכניקות מניפסטציה",
      "הגדרת עדיפויות לשנה",
      "רעייה, הנאה ושיתוף",
    ],
    cta: "הצטרפי לסדנה",
    color: "border-terracotta",
    accent: "bg-terracotta text-cream",
  },
  {
    id: "womens-circle",
    icon: "🌸",
    emoji_bg: "bg-sage/10",
    title: "מעגל נשים",
    tagline: "קבוצה מוגבלת • 3 שעות",
    price: "₪180",
    description:
      "מפגש מעמיק ומקודש של נשים המגיעות לחלוק, לרפא ולהתחבר לאנרגיה הנשית הטבעית שבהן. כל מעגל כולל נושא שונה — ירח, גוף, פצעי ילדות, מנהיגות, שפע ועוד.",
    includes: [
      "פתיחה ומדיטציה מונחית",
      "שיחות עמוקות בנושא החודשי",
      "עבודה עם הגוף והנשמה",
      "כלים לעבודה עצמית בין מפגשים",
      "מרחב בטוח ומוחזק",
      "תה צמחים ואוכל קל",
    ],
    cta: "הצטרפי למעגל",
    color: "border-sage",
    accent: "bg-sage text-cream",
  },
  {
    id: "space-purification",
    icon: "🏡",
    emoji_bg: "bg-gold/10",
    title: "טיהור בית ומרחב",
    tagline: "ביקור בית • 2-3 שעות",
    price: "₪550",
    description:
      "ניקוי אנרגטי מקיף לבית שלך — אחרי מעבר דירה, פרידה, מחלה, תחושת תקיעות או סתם רצון לרענון. השירות כולל ביקור בית, עבודה עם בסמודג', קריסטלים ואמרות, והדרכה להמשך.",
    includes: [
      "ביקור בית + ניתוח אנרגטי",
      "טיהור בבסמודג' וקריסטלים",
      "מיקום קריסטלים ואמרות",
      "ספרייה של כוונות לכל חדר",
      "ערכה לטיפול עצמאי לאחר מכן",
      "מעקב ותמיכה בוואטסאפ",
    ],
    cta: "קבעי ביקור",
    color: "border-gold",
    accent: "bg-gold text-cream",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-8 text-center bg-gradient-to-b from-cream to-cream/50">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-brown mb-6"
          >
            השירותים שלי
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brown/70 text-xl leading-relaxed"
          >
            כל שירות תוכנן כדי לפגוש אותך בדיוק איפה שאת — עם כלים אמיתיים
            ותובנות שתיקחי הביתה.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`bg-white rounded-3xl p-8 md:p-10 border-2 ${service.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left */}
                <div className="flex-none">
                  <div
                    className={`w-16 h-16 rounded-2xl ${service.emoji_bg} flex items-center justify-center text-3xl mb-4`}
                  >
                    {service.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gold">{service.price}</p>
                    <p className="text-sm text-brown/50">{service.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-brown mb-3">
                    {service.title}
                  </h2>
                  <p className="text-brown/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <h3 className="font-semibold text-brown mb-3 text-sm uppercase tracking-wider">
                    מה כלול:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {service.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-brown/70">
                        <span className="text-gold mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center px-7 py-3 ${service.accent} font-medium rounded-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
                    >
                      {service.cta} ←
                    </Link>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972542268860"}?text=${encodeURIComponent(`שלום מיטל! אשמח לשמוע עוד על "${service.title}" 😊`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-7 py-3 border-2 border-[#25D366] text-[#25D366] font-medium rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300"
                    >
                      שאלי בוואטסאפ
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workshop CTA */}
      <section className="section-padding bg-brown text-cream text-center">
        <SectionTitle tag="מיוחד" title="סדנת העומק — מסע של 4 מפגשים" light />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-xl mx-auto"
        >
          <p className="text-cream/75 text-lg mb-8">
            תוכנית אינטנסיבית ומעמיקה לנשים שמוכנות לשינוי אמיתי. 4 מפגשים שישנו את מי שאת.
          </p>
          <Link
            href="/workshop"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gold text-cream font-semibold rounded-full text-lg hover:bg-gold-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            גלי את סדנת העומק ←
          </Link>
        </motion.div>
      </section>
    </>
  );
}
