import type { Metadata } from "next";
import WorkshopPageContent from "@/components/workshop/WorkshopPage";

export const metadata: Metadata = {
  title: "סדנת העומק - מסע של 4 מפגשים | מיטל עדיקה",
  description:
    "תוכנית אינטנסיבית של 4 מפגשים לנשים שמוכנות לשינוי אמיתי. נומרולוגיה, העצמה וכלים לחיים. הרשמי עכשיו.",
  openGraph: {
    title: "סדנת העומק - 4 מפגשים שישנו את חייך",
    description: "מסע עמוק לתוך מי שאת - דרך מספרים, כוונות ועבודה פנימית.",
  },
};

export default function Page() {
  return <WorkshopPageContent />;
}
