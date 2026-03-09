"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: "99.2", suffix: "%", label: "Average delivery rate" },
  { value: "14", suffix: " days", label: "To full sending capacity" },
  { value: "5", suffix: "x", label: "More messages than manual" },
  { value: "0", suffix: "", label: "Numbers lost to blocking" },
];

export default function Stats() {
  return (
    <section className="bg-sendara-navy py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-sendara-bright mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-sm text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <blockquote className="font-body text-lg md:text-xl text-white/80 italic mb-4">
            &ldquo;We were sending 200 messages a day manually and still getting flagged. Sendara got us to 800/day with a Green quality rating in three weeks.&rdquo;
          </blockquote>
          <p className="font-body text-sm text-sendara-bright">
            — Marketing Director, Top 10 Dubai Brokerage
          </p>
        </motion.div>
      </div>
    </section>
  );
}
