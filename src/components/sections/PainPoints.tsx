"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionLabel from "@/components/ui/SectionLabel";

const PAIN_STATS = [
  {
    value: "73",
    suffix: "%",
    label: "of agencies have been flagged or restricted",
  },
  {
    value: "7",
    suffix: " days",
    label: "for Low quality to permanently drop tier",
  },
  {
    value: "0",
    prefix: "AED ",
    suffix: "",
    label: "what banned campaigns earn",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-white py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>THE PROBLEM</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4 max-w-3xl mx-auto text-balance">
            Your WhatsApp number is one bad campaign away from being blocked.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {PAIN_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-sendara-off-white"
            >
              <div className="text-5xl md:text-6xl font-heading font-bold text-danger mb-4">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="font-body text-base text-sendara-navy/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
