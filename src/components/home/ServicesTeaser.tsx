import Link from "next/link";
import Image from "next/image";

const items = [
  { image: "/services/consulting.jpeg", label: "ייעוץ אישי 1:1", href: "/services/personal" },
  { image: "/services/workshop.jpeg", label: "סדנאות", href: "/services/workshops" },
  { image: "/services/womens-circle.jpeg", label: "מעגל נשים", href: "/services/womens-circle" },
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
                className="w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1"
                style={{ border: "1px solid rgba(201,169,122,0.3)" }}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
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
