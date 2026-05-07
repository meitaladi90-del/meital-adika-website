"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-terracotta to-terracotta-dark text-cream overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cream/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-cream/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

      <div className="container-max text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-3xl mb-4 block">🌟</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            המסע שלך מתחיל
            <br />
            בצעד אחד קטן
          </h2>
          <p className="text-cream/80 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            שיחת היכרות חינמית של 20 דקות - בואי נראה יחד איך אני יכולה לתמוך בך בדרך שלך.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-9 py-4 bg-cream text-brown font-semibold rounded-full text-lg hover:bg-gold-light hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              קבעי שיחה חינמית עכשיו
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972542268860"}?text=${encodeURIComponent("שלום מיטל! אשמח לקבוע שיחת היכרות 😊")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 border-2 border-cream/60 text-cream font-medium rounded-full text-lg hover:border-cream hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              שלחי הודעה בוואטסאפ
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
