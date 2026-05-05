import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhoIsItFor from "@/components/home/WhoIsItFor";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import TestimonialSection from "@/components/home/TestimonialSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "מיטל עדיקה | נומרולוגיה והעצמת נשים",
  description:
    "גלי את עצמך דרך מספרים. מיטל עדיקה — מאמנת נומרולוגיה ומנחת העצמת נשים. ייעוץ אישי, סדנאות ומעגלי נשים.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIsItFor />
      <ServicesTeaser />
      <TestimonialSection />
      <CtaSection />
      <InstagramFeed />
    </>
  );
}
