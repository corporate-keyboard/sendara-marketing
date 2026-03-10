"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import DashboardMockup from "@/components/mockups/DashboardMockup";

export default function Hero() {
  return (
    <section className="relative bg-sendara-navy min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-sendara-teal/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-sendara-bright/10 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs uppercase tracking-[3px] font-medium text-sendara-bright">
              FOR UAE REAL ESTATE AGENCIES
            </span>
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 text-balance">
              Stop Getting Blocked on WhatsApp.
            </h1>
            <p className="font-body text-base md:text-lg text-white/70 mb-8 max-w-lg">
              Sendara is the campaign engine that fills your pipeline and keeps
              your number alive. Automated warm-up, smart throttling, and
              AI-optimized templates — built for real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#lead-capture">
                <Button size="lg">Get a Call Back</Button>
              </a>
              <a href="#lead-capture">
                <Button variant="secondary" size="lg">
                  Join Early Access
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
