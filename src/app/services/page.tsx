import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "שירותים — מיטל עדיקה",
  description:
    "ייעוץ נומרולוגיה אישי, סדנת לוח חזון, מעגל נשים וטיהור בית ומרחב. גלי את השירות שנכון לך.",
  openGraph: {
    title: "שירותים — מיטל עדיקה",
    description: "כל השירותים לליווי, הנחייה והעצמה שלך.",
  },
};

export default function Page() {
  return <ServicesPage />;
}
