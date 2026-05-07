import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תשלום הצליח - מיטל עדיקה",
  robots: { index: false },
};

export default function WorkshopSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-brown mb-4">ברוכה הבאה למסע!</h1>
        <p className="text-brown/70 text-lg leading-relaxed mb-8">
          ההרשמה ותשלום התקבלו בהצלחה. אישור נשלח לאימייל שלך.
          מיטל תחזור אליך תוך 24 שעות לתיאום המפגשים.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-7 py-3 bg-brown text-cream font-medium rounded-full hover:bg-brown-light transition-colors"
          >
            חזרה לדף הבית
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972542268860"}?text=${encodeURIComponent("שלום מיטל! נרשמתי לסדנת העומק ואשמח לתאם את המפגשים 😊")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border-2 border-[#25D366] text-[#25D366] font-medium rounded-full hover:bg-[#25D366] hover:text-white transition-colors"
          >
            שלחי הודעה בוואטסאפ
          </a>
        </div>
      </div>
    </div>
  );
}
