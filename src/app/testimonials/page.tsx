import type { Metadata } from "next";
import TestimonialsPageContent from "@/components/testimonials/TestimonialsPage";

export const metadata: Metadata = {
  title: "המלצות — מיטל עדיקה",
  description:
    "קראי מה נשים אומרות על הסדנאות, ייעוץ הנומרולוגיה ומעגלי הנשים של מיטל עדיקה.",
  openGraph: {
    title: "המלצות — מיטל עדיקה",
    description: "נשים אמיתיות, שינויים אמיתיים.",
  },
};

export default function Page() {
  return <TestimonialsPageContent />;
}
