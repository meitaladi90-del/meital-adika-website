"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-brown-dark via-brown to-brown-dark">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-terracotta/8 blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #c9a97a 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-32">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* LEFT — Text (visually left on desktop, below on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-right"
          >
            {/* Brand */}
            <p className="text-gold/70 text-sm tracking-[0.25em] uppercase mb-3 font-light">
              נומרולוגיה · העצמת נשים
            </p>
            <h1
              className="font-bold leading-none mb-7"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "#c9a97a", letterSpacing: "-0.02em" }}
            >
              AdikAura
            </h1>

            {/* Divider */}
            <div className="flex justify-end mb-7">
              <div className="h-px w-20 bg-gradient-to-l from-gold/70 to-transparent" />
            </div>

            {/* Tagline */}
            <p
              className="leading-[1.85] mb-10 text-cream/85 max-w-md mr-0 ml-auto md:ml-0"
              style={{ fontSize: "18px" }}
            >
              מלווה נשים לגילוי הפוטנציאל המלא — דרך המספרים האישיים שלך,
              לחיים הרמוניים, מלאי משמעות, שפע ואהבה עצמית
            </p>

            {/* CTA */}
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-9 py-4 font-bold rounded-full text-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,122,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#c9a97a", color: "#5a3e28" }}
            >
              השאירי פרטים ואחזור אלייך 🤍
            </button>
          </motion.div>

          {/* RIGHT — Photo in organic blob */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-none flex justify-center"
          >
            <div className="relative">
              {/* Glow behind blob */}
              <div
                className="absolute inset-0 bg-gold/25 blur-2xl scale-110"
                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              />

              {/* Blob image container — static shape */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "clamp(220px, 28vw, 300px)",
                  height: "clamp(280px, 36vw, 390px)",
                  borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  border: "2px solid rgba(201,169,122,0.35)",
                }}
              >
                <Image
                  src="/meital-photo.jpg"
                  alt="מיטל עדיקה"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "top center" }}
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
