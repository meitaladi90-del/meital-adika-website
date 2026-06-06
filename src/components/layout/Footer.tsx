import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972542268860";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">מיטל עדיקה</h3>
            <p className="text-cream/60 text-sm mb-1">נומרולוגיה | העצמת נשים</p>
            <p className="text-cream/70 text-sm leading-relaxed mt-4">
              ליווי נשים בדרך לחיים מיושרים, מלאי משמעות, שפע ואהבה עצמית.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/meital.adika?igsh=OGJ2MTJsaDM5Nm80"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
              <a
                href="mailto:meital.adika.consulting@gmail.com"
                className="text-cream/60 hover:text-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "בית" },
                { href: "/about", label: "אודות" },
                { href: "/services", label: "שירותים" },
                { href: "/workshop", label: "סדנת העומק" },
                { href: "/testimonials", label: "המלצות" },
                { href: "/contact", label: "צרי קשר" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold mb-4">יצירת קשר</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Phone size={15} />
                  <span dir="ltr">+972-54-226-8860</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:meital.adika.consulting@gmail.com"
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Mail size={15} />
                  meital.adika.consulting@gmail.com
                </a>
              </li>
              <li className="pt-4">
                <Link
                  href="/contact"
                  className="inline-block px-5 py-2 border border-gold text-gold rounded-full text-sm hover:bg-gold hover:text-cream transition-all duration-200"
                >
                  קבעי שיחת היכרות
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/40"
        >
          <p>© {new Date().getFullYear()} מיטל עדיקה. כל הזכויות שמורות.</p>
          <p>עוצב ופותח באהבה</p>
        </div>
      </div>
    </footer>
  );
}
