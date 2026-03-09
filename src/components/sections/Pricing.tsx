"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { PRICING } from "@/lib/constants";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>PRICING</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4">
            Simple pricing. No surprises.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                tier.highlighted
                  ? "bg-white border-2 border-sendara-teal shadow-xl scale-105"
                  : "bg-sendara-off-white border border-gray-100"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sendara-teal text-white text-xs font-body font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading font-semibold text-xl text-sendara-navy">{tier.name}</h3>
              <div className="mt-4 mb-2">
                <span className="font-heading font-bold text-4xl text-sendara-navy">{tier.price}</span>
                <span className="font-body text-sendara-navy/50">{tier.period}</span>
              </div>
              <p className="font-body text-sm text-sendara-navy/60 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="text-success flex-shrink-0 mt-0.5" size={16} />
                    <span className="font-body text-sm text-sendara-navy/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#lead-capture">
                <Button
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
