"use client";

import { motion } from "framer-motion";
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

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c9a97a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block text-gold text-sm font-medium tracking-widest uppercase border border-gold/30 px-4 py-1.5 rounded-full">
            ✦ נומרולוגיה · העצמת נשים ✦
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6"
        >
          גלי את מי
          <br />
          <span className="text-gold">שאת באמת</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-cream/75 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10"
        >
          ליווי נשים בדרך לחיים מיושרים,
          <br />
          מלאי משמעות, שפע ואהבה עצמית
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold text-cream font-semibold rounded-full text-lg hover:bg-gold-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
          >
            קבעי שיחת היכרות חינם
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 border-2 border-cream/40 text-cream font-medium rounded-full text-lg hover:border-cream hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            גלי את השירותים
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

      {/* Decorative numbers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {["3", "7", "11", "22", "9", "1"].map((num, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.06, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute text-gold font-bold"
            style={{
              fontSize: `${Math.random() * 60 + 40}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            {num}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
