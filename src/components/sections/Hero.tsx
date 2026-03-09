"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

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
                <Button size="lg">Book a Demo</Button>
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
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Abstract dashboard mockup */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <div className="flex-1 h-6 bg-white/5 rounded-md ml-4" />
                </div>
                {/* Quality rating card */}
                <div className="bg-gradient-to-br from-sendara-teal/20 to-sendara-bright/10 rounded-xl p-4 mb-4 border border-sendara-teal/20">
                  <div className="text-xs text-sendara-bright font-body uppercase tracking-wider mb-2">
                    Quality Rating
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-heading font-bold text-white">
                      Green
                    </span>
                    <span className="text-success text-sm mb-1">
                      &#9650; Healthy
                    </span>
                  </div>
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-sendara-teal to-sendara-bright rounded-full" />
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Sent Today", value: "847" },
                    { label: "Delivered", value: "99.2%" },
                    { label: "Warm-Up", value: "Phase 4" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-lg p-3">
                      <div className="text-[10px] text-white/40 font-body uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-lg font-heading font-semibold text-white mt-1">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success text-sm">&#10003;</span>
                </div>
                <div>
                  <div className="text-xs font-body font-medium text-sendara-navy">
                    Campaign Delivered
                  </div>
                  <div className="text-[10px] text-sendara-navy/50">
                    847 messages sent safely
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
