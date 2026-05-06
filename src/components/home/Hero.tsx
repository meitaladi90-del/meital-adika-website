"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-brown to-brown-dark">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-terracotta/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-sage/10 blur-3xl" />
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #c9a97a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">

        {/* Brand title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-cream tracking-tight mb-10"
          style={{ letterSpacing: "-0.02em" }}
        >
          Adik<span className="text-gold">Aura</span>
        </motion.h1>

        {/* Portrait image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-10"
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl scale-110" />

          <div className="relative w-[220px] h-[280px] md:w-[280px] md:h-[360px] rounded-[50%] overflow-hidden border-4 border-gold/40 shadow-2xl">
            <Image
              src="/meital-photo.jpg"
              alt="מיטל עדיקה"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        {/* Hebrew tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center leading-relaxed max-w-xl mx-auto mb-10"
          style={{ fontSize: "18px", color: "#f5f0e8" }}
        >
          מלווה נשים לגילוי הפוטנציאל המלא — דרך המספרים האישיים שלך,
          <br className="hidden sm:block" />
          לחיים הרמוניים, מלאי משמעות, שפע ואהבה עצמית
        </motion.p>

        {/* Single CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Link
            href="/contact"
            className="px-10 py-4 bg-gold text-cream font-semibold rounded-full text-lg hover:bg-gold-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
          >
            לתיאום ייעוץ
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
        >
          <span className="text-xs tracking-widest">גללי למטה</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
