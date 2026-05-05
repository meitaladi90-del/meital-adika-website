"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "שם נדרש"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().optional(),
  message: z.string().min(10, "אנא כתבי הודעה של לפחות 10 תווים"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972521234567";

export default function ContactPage() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-8 text-center bg-gradient-to-b from-cream to-cream/50">
        <div className="max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-brown mb-6"
          >
            בואי נדבר 💬
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brown/70 text-xl leading-relaxed"
          >
            שיחת היכרות חינמית של 20 דקות — בלי התחייבות, עם המון חום.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-brown mb-6">
                איך להגיע אלי?
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-none">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown">וואטסאפ / טלפון</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brown/70 hover:text-gold transition-colors"
                      dir="ltr"
                    >
                      +972-54-226-8860
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-none">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown">דואר אלקטרוני</p>
                    <a
                      href="mailto:meital.adika.consulting@gmail.com"
                      className="text-brown/70 hover:text-gold transition-colors"
                    >
                      meital.adika.consulting@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-none">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown">שעות זמינות</p>
                    <p className="text-brown/70">ראשון–חמישי, 9:00–20:00</p>
                    <p className="text-brown/70">שישי, 9:00–13:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-none">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown">מיקום</p>
                    <p className="text-brown/70">אזור המרכז, ישראל</p>
                    <p className="text-brown/50 text-sm">(זום זמין לכל מקום)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("שלום מיטל! אשמח לקבוע שיחת היכרות חינמית 😊")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 bg-[#25D366]/10 border-2 border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-none">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[#25D366]">שלחי הודעה בוואטסאפ</p>
                <p className="text-brown/60 text-sm">עונה בדרך כלל תוך שעה</p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {status === "success" ? (
              <div className="bg-sage/10 border border-sage/30 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🌸</div>
                <h3 className="text-2xl font-bold text-brown mb-3">ההודעה נשלחה!</h3>
                <p className="text-brown/70">אחזור אליך בהקדם. תודה שפנית! 💛</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-8 border border-gold/20 shadow-sm space-y-5"
              >
                <h2 className="text-xl font-bold text-brown mb-2">שלחי לי הודעה</h2>

                <div>
                  <label className="form-label">שם *</label>
                  <input
                    {...register("name")}
                    placeholder="שרה כהן"
                    className="form-input"
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="form-label">דואר אלקטרוני *</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="sarah@example.com"
                    dir="ltr"
                    className="form-input text-right"
                  />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="form-label">טלפון (אופציונלי)</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="052-000-0000"
                    dir="ltr"
                    className="form-input text-right"
                  />
                </div>

                <div>
                  <label className="form-label">הודעה *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="ספרי לי קצת על עצמך ומה מחפשת..."
                    className="form-textarea"
                  />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    אירעה שגיאה. נסי שוב או פני דרך וואטסאפ.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-brown text-cream font-semibold rounded-full hover:bg-brown-light hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" && (
                    <span className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                  )}
                  {status === "loading" ? "שולחת..." : "שלחי הודעה ←"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
