"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  fullName: z.string().min(2, "שם מלא נדרש"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().min(9, "מספר טלפון נדרש"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, workshop: "סדנת העומק — 4 מפגשים" }),
      });

      if (!res.ok) throw new Error("שגיאה בשליחה");

      const json = await res.json();

      // If there's a Stripe checkout URL, redirect
      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-cream rounded-2xl p-8 text-center"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-brown mb-3">נרשמת בהצלחה!</h3>
        <p className="text-brown/70 leading-relaxed">
          אימייל אישור נשלח אליך. אחזור אליך תוך 24 שעות לסיום תיאום המפגשים.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-cream/10 backdrop-blur rounded-2xl p-8 space-y-5"
    >
      <div>
        <label className="block text-cream/80 text-sm font-medium mb-1.5">
          שם מלא *
        </label>
        <input
          {...register("fullName")}
          placeholder="שרה כהן"
          className="w-full px-4 py-3 rounded-xl bg-white/90 text-brown placeholder-brown/40 border border-transparent focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
        />
        {errors.fullName && (
          <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-cream/80 text-sm font-medium mb-1.5">
          דואר אלקטרוני *
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="sarah@example.com"
          dir="ltr"
          className="w-full px-4 py-3 rounded-xl bg-white/90 text-brown placeholder-brown/40 border border-transparent focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-right"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-cream/80 text-sm font-medium mb-1.5">
          טלפון *
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="052-000-0000"
          dir="ltr"
          className="w-full px-4 py-3 rounded-xl bg-white/90 text-brown placeholder-brown/40 border border-transparent focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-right"
        />
        {errors.phone && (
          <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-cream/80 text-sm font-medium mb-1.5">
          ספרי לי עליך (אופציונלי)
        </label>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="מה מוביל אותך לכאן? מה את מחפשת?"
          className="w-full px-4 py-3 rounded-xl bg-white/90 text-brown placeholder-brown/40 border border-transparent focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          אירעה שגיאה. נסי שוב או צרי קשר בוואטסאפ.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-gold text-cream font-semibold rounded-full text-lg hover:bg-gold-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" && (
          <span className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
        )}
        {status === "loading" ? "שולחת..." : "שלחי הרשמה ←"}
      </button>

      <p className="text-cream/50 text-xs text-center">
        לאחר ההרשמה תועברי לתשלום מאובטח דרך Stripe
      </p>
    </form>
  );
}
