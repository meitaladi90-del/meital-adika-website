import type { Metadata } from "next";
import NumerologyDashboard from "@/components/dashboard/NumerologyDashboard";

export const metadata: Metadata = {
  title: "האזור האישי שלך - מיטל עדיקה",
  description: "הלוח האישי שלך - שנה אישית, חודש אישי ויום אישי על פי הנומרולוגיה",
};

export default function DashboardPage() {
  return <NumerologyDashboard />;
}
