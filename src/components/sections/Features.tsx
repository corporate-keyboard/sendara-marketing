"use client";

import { motion } from "framer-motion";
import { Flame, Shield, Sparkles, Users, Send, Link } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Shield,
  Sparkles,
  Users,
  Send,
  Link,
};

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>FEATURES</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4">
            Everything you need to campaign safely.
          </h2>
        </motion.div>

        <div className="space-y-24">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Flame;
            const isEven = i % 2 === 1;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={isEven ? "md:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-sendara-teal-light flex items-center justify-center mb-4">
                    <Icon className="text-sendara-teal" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-sendara-navy mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-sendara-navy/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className={isEven ? "md:order-1" : ""}>
                  {/* Abstract feature visual */}
                  <div className="bg-gradient-to-br from-sendara-teal-light to-white rounded-2xl p-8 border border-sendara-teal/10">
                    <div className="space-y-3">
                      <div className="h-3 bg-sendara-teal/10 rounded-full w-3/4" />
                      <div className="h-3 bg-sendara-teal/10 rounded-full w-1/2" />
                      <div className="h-3 bg-sendara-teal/10 rounded-full w-5/6" />
                      <div className="mt-6 flex gap-3">
                        <div className="h-20 flex-1 bg-sendara-teal/5 rounded-xl border border-sendara-teal/10" />
                        <div className="h-20 flex-1 bg-sendara-bright/5 rounded-xl border border-sendara-bright/10" />
                      </div>
                      <div className="h-2 bg-gradient-to-r from-sendara-teal to-sendara-bright rounded-full w-2/3 mt-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
