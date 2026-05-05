import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "אודות — מיטל עדיקה",
  description:
    "הכירי את מיטל עדיקה — מאמנת נומרולוגיה ומנחת העצמת נשים. הסיפור שלה, הכוחות הייחודיים שלה ומשימתה.",
  openGraph: {
    title: "אודות מיטל עדיקה",
    description: "הסיפור שלי, הדרך שעברתי ולמה הלב שלי בליווי נשים.",
  },
};

export default function Page() {
  return <AboutPage />;
}
