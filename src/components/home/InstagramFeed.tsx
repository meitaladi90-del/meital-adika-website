"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const placeholderPosts = [
  { id: 1, bg: "bg-gold/20", emoji: "🔢", text: "המספר 7 בנומרולוגיה..." },
  { id: 2, bg: "bg-sage/20", emoji: "🌸", text: "מעגל נשים הערב..." },
  { id: 3, bg: "bg-terracotta/20", emoji: "✨", text: "כשהאות הנפשי מגיע..." },
  { id: 4, bg: "bg-brown/10", emoji: "🏡", text: "טיהור בית חדש..." },
  { id: 5, bg: "bg-gold/15", emoji: "💫", text: "יום הולדת ולוח הנשמה..." },
  { id: 6, bg: "bg-sage/15", emoji: "🦋", text: "שינוי מתחיל מבפנים..." },
];

export default function InstagramFeed() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <a
            href="https://www.instagram.com/meital.adika?igsh=OGJ2MTJsaDM5Nm80"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center">
              <Instagram size={18} className="text-white" />
            </div>
            <div className="text-right">
              <p className="font-bold text-brown group-hover:text-gold transition-colors">
                @meitaladika
              </p>
              <p className="text-sm text-brown/60">עקבי אחרי באינסטגרם ✨</p>
            </div>
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {placeholderPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/meital.adika?igsh=OGJ2MTJsaDM5Nm80"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`aspect-square rounded-xl ${post.bg} flex flex-col items-center justify-center gap-2 p-4 border border-gold/10 overflow-hidden group relative`}
            >
              <div className="text-3xl">{post.emoji}</div>
              <p className="text-xs text-brown/60 text-center leading-relaxed">
                {post.text}
              </p>
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/5 transition-colors duration-200 rounded-xl flex items-center justify-center">
                <Instagram
                  size={20}
                  className="text-brown/0 group-hover:text-brown/30 transition-colors duration-200"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
