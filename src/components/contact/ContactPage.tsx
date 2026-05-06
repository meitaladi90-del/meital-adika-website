"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  fullName: z.string().min(2, "שם מלא נדרש"),
  birthDate: z.string().min(1, "תאריך לידה נדרש"),
  phone: z.string().min(9, "מספר טלפון נדרש"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: "noreply@form.local",
          message: `תאריך לידה: ${data.birthDate}\nטלפון: ${data.phone}`,
          phone: data.phone,
          birthDate: data.birthDate,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-10 px-4 text-center bg-gradient-to-b from-cream to-cream/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <p className="text-gold text-sm tracking-widest uppercase mb-3">צרי קשר</p>
          <h1 className="text-4xl md:text-5xl font-bold text-brown">
            בואי נדבר 🤍
          </h1>
        </motion.div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4">
        <div className="max-w-[480px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(90,62,40,0.1)] p-8 md:p-10"
          >
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-5">🌸</div>
                <h3 className="text-2xl font-bold text-brown mb-3">קיבלתי!</h3>
                <p className="text-brown/70 leading-relaxed text-lg">
                  אחזור אליך תוך 24 שעות.
                  <br />
                  מחכה לדבר איתך!
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-brown leading-snug">
                    השאירי פרטים ואחזור אלייך
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* שם מלא */}
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">
                      שם מלא *
                    </label>
                    <input
                      {...register("fullName")}
                      placeholder="שרה כהן"
                      className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 text-brown placeholder-brown/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* תאריך לידה */}
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">
                      תאריך לידה *
                    </label>
                    <input
                      {...register("birthDate")}
                      type="date"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 text-brown focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200"
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>
                    )}
                  </div>

                  {/* טלפון */}
                  <div>
                    <label className="block text-sm font-medium text-brown mb-1.5">
                      טלפון *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="052-000-0000"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 text-brown placeholder-brown/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-right"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center">
                      משהו השתבש. נסי שוב.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 font-bold rounded-full text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_6px_24px_rgba(201,169,122,0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    style={{ background: "#c9a97a", color: "#5a3e28" }}
                  >
                    {status === "loading" && (
                      <span className="w-5 h-5 border-2 border-brown/40 border-t-brown rounded-full animate-spin" />
                    )}
                    {status === "loading" ? "שולחת..." : "שלחי פרטים ←"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
