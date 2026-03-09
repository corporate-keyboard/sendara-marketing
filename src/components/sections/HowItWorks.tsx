"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-sendara-off-white py-20 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>HOW IT WORKS</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4">
            From connect to campaign in minutes.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-sendara-teal/20" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-sendara-teal flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="font-heading font-bold text-white text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-xl md:text-2xl text-sendara-navy mb-3">
                {step.title}
              </h3>
              <p className="font-body text-base text-sendara-navy/70 max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
