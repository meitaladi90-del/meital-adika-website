import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.meitaladika.co.il";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "מיטל עדיקה | נומרולוגיה והעצמת נשים",
    template: "%s | מיטל עדיקה",
  },
  description:
    "מיטל עדיקה — מאמנת נומרולוגיה ומנחת העצמת נשים. גלי את עצמך דרך מספרים, סדנאות ומעגלי נשים. ייעוץ אישי, סדנת לוח חזון, מעגל נשים וטיהור בית.",
  keywords: [
    "נומרולוגיה",
    "העצמת נשים",
    "מאמנת נשים",
    "לוח חזון",
    "מעגל נשים",
    "טיהור בית",
    "קוד נפשי",
    "פיתוח עצמי",
    "ישראל",
  ],
  authors: [{ name: "מיטל עדיקה" }],
  creator: "מיטל עדיקה",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteUrl,
    siteName: "מיטל עדיקה",
    title: "מיטל עדיקה | נומרולוגיה והעצמת נשים",
    description:
      "גלי את עצמך דרך מספרים. ליווי נשים לחיים מיושרים, מלאי משמעות ושפע.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "מיטל עדיקה - נומרולוגיה והעצמת נשים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מיטל עדיקה | נומרולוגיה והעצמת נשים",
    description: "גלי את עצמך דרך מספרים. ליווי נשים לחיים מיושרים ומלאי משמעות.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "מיטל עדיקה - נומרולוגיה והעצמת נשים",
  description:
    "מאמנת נומרולוגיה ומנחת העצמת נשים. ייעוץ אישי, סדנאות ומעגלי נשים.",
  url: siteUrl,
  telephone: "+972521234567",
  email: "meital@meitaladika.co.il",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  priceRange: "₪₪",
  serviceArea: {
    "@type": "Country",
    name: "ישראל",
  },
  offers: [
    {
      "@type": "Offer",
      name: "ייעוץ נומרולוגיה אישי",
      description: "קריאת מפת לידה אישית, גילוי ייעוד וכוחות",
    },
    {
      "@type": "Offer",
      name: "סדנת לוח חזון",
      description: "יצירת לוח חזון ויזואלי, גיבוש כוונות ועתיד רצוי",
    },
    {
      "@type": "Offer",
      name: "מעגל נשים",
      description: "מרחב בטוח לריפוי, חיבור ואנרגיה נשית",
    },
    {
      "@type": "Offer",
      name: "טיהור בית ומרחב",
      description: "ניקוי אנרגטי, בסמודג' וחיזוק טוב",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-heebo bg-cream text-brown antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
