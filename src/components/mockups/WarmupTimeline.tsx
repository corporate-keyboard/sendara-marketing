"use client";

import { motion } from "framer-motion";

const PHASES = [
  { phase: 0, days: "1-2", limit: "0", tiers: "\u2014", goal: "Setup & verify", status: "done" },
  { phase: 1, days: "3-9", limit: "50/day", tiers: "P1", goal: "Establish quality", status: "done" },
  { phase: 2, days: "10-16", limit: "150/day", tiers: "P1, P2", goal: "Expand reach", status: "done" },
  { phase: 3, days: "17-23", limit: "500/day", tiers: "P1, P2", goal: "50% of Tier 1", status: "done" },
  { phase: 4, days: "24-30", limit: "1,000/day", tiers: "P1, P2, P3", goal: "Trigger Tier 1\u21922", status: "active" },
  { phase: 5, days: "31-44", limit: "5,000/day", tiers: "P1, P2, P3", goal: "Scale Tier 2", status: "upcoming" },
  { phase: 6, days: "45-58", limit: "10,000/day", tiers: "P1, P2, P3", goal: "Trigger Tier 2\u21923", status: "upcoming" },
  { phase: 7, days: "59+", limit: "Tier limit", tiers: "P1, P2, P3", goal: "Full campaign mode", status: "upcoming" },
];

export default function WarmupTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-sendara-navy rounded-2xl border border-white/10 p-5 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-sendara-bright/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0FB5BA" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <span className="text-xs font-heading font-semibold text-white">Warm-Up Progress</span>
        <span className="ml-auto text-[9px] font-body text-sendara-bright bg-sendara-bright/10 px-2 py-0.5 rounded-full">Day 27</span>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "52%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute left-[11px] top-2 w-0.5 bg-sendara-bright"
        />

        <div className="space-y-1">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              {/* Circle indicator */}
              <div className="relative z-10 flex-shrink-0 mt-1">
                {p.status === "done" ? (
                  <div className="w-[22px] h-[22px] rounded-full bg-sendara-teal flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                ) : p.status === "active" ? (
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(15,181,186,0)", "0 0 0 6px rgba(15,181,186,0.2)", "0 0 0 0 rgba(15,181,186,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-[22px] h-[22px] rounded-full bg-sendara-bright flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full bg-white/10 border border-white/10" />
                )}
              </div>

              {/* Content */}
              {p.status === "active" ? (
                <div className="flex-1 bg-sendara-bright/10 border border-sendara-bright/20 rounded-lg p-3 mb-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-heading font-semibold text-sendara-bright">Phase {p.phase}</span>
                    <span className="text-[9px] font-body text-white/40">Days {p.days}</span>
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="text-[9px] font-body text-white/50">Daily Limit: <span className="text-white/80">{p.limit}</span></div>
                    <div className="text-[9px] font-body text-white/50">Contacts: <span className="text-white/80">{p.tiers}</span></div>
                    <div className="text-[9px] font-body text-white/50">Batch: <span className="text-white/80">100 x 6/day</span></div>
                    <div className="text-[9px] font-body text-white/50">Goal: <span className="text-sendara-bright">{p.goal}</span></div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[8px] font-body text-white/30">Progress</span>
                      <span className="text-[8px] font-body text-sendara-bright">65%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-sendara-bright rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`flex-1 flex items-center justify-between py-1.5 ${p.status === "upcoming" ? "opacity-40" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-heading font-medium ${p.status === "done" ? "text-white/70" : "text-white/30"}`}>
                      Phase {p.phase}
                    </span>
                    <span className="text-[9px] font-body text-white/30">{p.limit}</span>
                  </div>
                  <span className="text-[9px] font-body text-white/20">{p.days}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
