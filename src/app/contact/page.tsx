import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "צרי קשר - מיטל עדיקה",
  description:
    "צרי קשר עם מיטל עדיקה לשאלות, שיחת היכרות חינמית או הרשמה לשירות. נגיעה בוואטסאפ תמיד פתוחה.",
  openGraph: {
    title: "צרי קשר - מיטל עדיקה",
    description: "שיחת היכרות חינמית של 20 דקות. בואי נדבר.",
  },
};

export default function Page() {
  return <ContactPageContent />;
}
