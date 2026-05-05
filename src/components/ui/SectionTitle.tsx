"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
  tag?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
  light = false,
  className,
  tag,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(center ? "text-center" : "text-right", className)}
    >
      {tag && (
        <span
          className={cn(
            "inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full",
            light
              ? "bg-cream/20 text-gold-light"
              : "bg-gold/10 text-gold-dark"
          )}
        >
          {tag}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          light ? "text-cream" : "text-brown"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl leading-relaxed max-w-2xl",
            center ? "mx-auto" : "",
            light ? "text-cream/80" : "text-brown/70"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-0.5 w-16",
          center ? "mx-auto" : "mr-0",
          light ? "bg-gold" : "bg-gold"
        )}
        style={{
          background: "linear-gradient(to right, transparent, #c9a97a, transparent)",
          width: "80px",
        }}
      />
    </motion.div>
  );
}
