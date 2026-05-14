"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const STORAGE_KEY = "numerology_profile";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/about", label: "הדרך שלי" },
  { href: "/services", label: "שירותים" },
  { href: "/workshops", label: "סדנאות" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צרי קשר" },
];

interface AuthUser {
  name: string;
  firstName: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((user) => {
        if (user?.name) {
          setAuthUser({ name: user.name, firstName: user.name.split(" ")[0] });
        }
      })
      .catch(() => {})
      .finally(() => setAuthLoaded(true));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem(STORAGE_KEY);
    setAuthUser(null);
    setIsOpen(false);
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ backgroundColor: "#f0ebe3", boxShadow: "0 1px 6px rgba(90,62,40,0.08)" }}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-xl font-bold text-brown group-hover:text-gold transition-colors duration-200">
            מיטל עדיקה
          </span>
          <span className="text-xs text-brown/60 font-light tracking-wider">
            נומרולוגיה | העצמת נשים
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-brown/80 hover:text-brown hover:bg-gold/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth area (desktop) */}
        {authLoaded && (
          <div className="hidden md:flex items-center">
            {authUser ? (
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#5a3e28" }}>
                <Link
                  href="/dashboard"
                  className="hover:opacity-80 transition-opacity"
                >
                  שלום {authUser.firstName} ✨
                </Link>
                <span className="opacity-30">|</span>
                <button
                  onClick={handleLogout}
                  className="hover:opacity-70 transition-opacity text-sm"
                  style={{ color: "#5a3e28" }}
                >
                  יציאה
                </button>
              </div>
            ) : (
              <Link
                href="/#energy"
                className="text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-gold/10"
                style={{ color: "#5a3e28" }}
              >
                כניסה
              </Link>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-5 py-2 bg-brown text-cream text-sm font-medium rounded-full hover:bg-brown-light transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
          קבעי שיחה
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-brown rounded-full hover:bg-gold/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="תפריט"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-gold/20"
            style={{ backgroundColor: "#f0ebe3" }}
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-brown font-medium hover:bg-gold/10 rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {authLoaded && (
                <li>
                  {authUser ? (
                    <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#c9a97a15", border: "1px solid #c9a97a30" }}>
                      <Link
                        href="/dashboard"
                        className="text-sm font-semibold"
                        style={{ color: "#5a3e28" }}
                        onClick={() => setIsOpen(false)}
                      >
                        שלום {authUser.firstName} ✨
                      </Link>
                      <span className="opacity-30 text-sm" style={{ color: "#5a3e28" }}>|</span>
                      <button
                        onClick={handleLogout}
                        className="text-sm font-medium"
                        style={{ color: "#5a3e28", opacity: 0.65 }}
                      >
                        יציאה
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/#energy"
                      className="block text-center px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
                      style={{ backgroundColor: "#c9a97a15", color: "#5a3e28", border: "1px solid #c9a97a30" }}
                      onClick={() => setIsOpen(false)}
                    >
                      כניסה לאזור האישי
                    </Link>
                  )}
                </li>
              )}

              <li className="mt-2">
                <Link
                  href="/contact"
                  className="block text-center px-5 py-3 bg-brown text-cream font-medium rounded-full hover:bg-brown-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  קבעי שיחה
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}