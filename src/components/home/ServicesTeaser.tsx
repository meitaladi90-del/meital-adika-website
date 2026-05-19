import Link from "next/link";

const items = [
  { icon: "🔢", label: "ייעוץ אישי 1:1", href: "/services/personal" },
  { icon: "🎨", label: "סדנאות", href: "/services/workshops" },
  { icon: "🌸", label: "מעגל נשים", href: "/services/womens-circle" },
];

export default function ServicesTeaser() {
  return (
    <section className="section-padding bg-gradient-to-b from-cream to-cream/50" dir="rtl">
      <div className="container-max text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "#c9a97a" }}>
          שירותים
        </p>
        <div className="flex justify-center gap-10 md:gap-20 mb-10">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-20 h-20 flex items-center justify-center rounded-2xl text-4xl transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1"
                style={{ backgroundColor: "#f5f0e8", border: "1px solid rgba(201,169,122,0.3)" }}
              >
                {item.icon}
              </div>
              <span
                className="text-sm font-semibold transition-colors duration-200 group-hover:opacity-80"
                style={{ color: "#5a3e28" }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="text-sm font-medium hover:opacity-75 transition-opacity"
          style={{ color: "#c9a97a" }}
        >
          לכל השירותים ←
        </Link>
      </div>
    </section>
  );
}
