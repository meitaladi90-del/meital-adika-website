"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

const testimonials = [
  "/testimonials/testimonial-1.jpeg",
  "/testimonials/testimonial-2.jpeg",
  "/testimonials/testimonial-3.jpeg",
  "/testimonials/testimonial-4.jpeg",
  "/testimonials/testimonial-5.jpeg",
  "/testimonials/testimonial-6.jpeg",
];

export default function TestimonialSection() {
  return (
    <section className="section-padding bg-brown overflow-hidden">
      <div className="container-max">
        <SectionTitle
          tag="המלצות"
          title="מה נשים אומרות עלי"
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-gold/30 shadow-lg"
            >
              <Image
                src={src}
                alt={`המלצת לקוחה ${i + 1}`}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold text-gold font-medium rounded-full hover:bg-gold hover:text-cream transition-all duration-300 hover:-translate-y-0.5"
          >
            עוד המלצות ←
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
