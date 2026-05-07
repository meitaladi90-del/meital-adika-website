"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";

export default function TestimonialSection() {
  return (
    <section className="section-padding bg-brown overflow-hidden">
      <div className="container-max">
        <SectionTitle
          tag="המלצות"
          title="מה נשים אומרות עלי"
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="relative bg-cream/10 backdrop-blur rounded-2xl p-8 md:p-12 border border-gold/30">
            {/* Quote mark */}
            <div className="absolute -top-6 right-8 text-6xl text-gold font-serif leading-none">"</div>

            <p className="text-cream text-xl md:text-2xl leading-relaxed font-light">
              מיטל שינתה לי את החיים. אחרי פגישה אחת איתה הבנתי למה כל הדרך שעברתי הכינה אותי לרגע הזה.
              ה-ייעוץ הנומרולוגי היה מדויק בצורה שלא יכולתי לדמיין - כאילו היא קוראת את הנשמה שלי.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center text-gold font-bold text-lg">
                ר
              </div>
              <div>
                <p className="font-semibold text-cream">רחל כהן</p>
                <p className="text-gold/70 text-sm">ייעוץ נומרולוגיה אישי</p>
              </div>
              <div className="mr-auto flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold font-medium rounded-full hover:bg-gold hover:text-cream transition-all duration-300 hover:-translate-y-0.5"
          >
            עוד המלצות ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
