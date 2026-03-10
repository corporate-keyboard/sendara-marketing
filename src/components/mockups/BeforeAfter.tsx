"use client";

import { motion } from "framer-motion";

export default function BeforeAfter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-sendara-navy rounded-2xl border border-white/10 p-5 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-sendara-bright/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0FB5BA" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z" />
          </svg>
        </div>
        <span className="text-xs font-heading font-semibold text-white">AI Template Optimizer</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
        {/* Before card */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-danger/5 border border-danger/20 rounded-xl p-3.5"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] font-body font-medium text-danger bg-danger/10 px-2 py-0.5 rounded-full">BEFORE</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-heading font-bold text-danger">5/100</span>
              <span className="text-[9px] font-body text-danger bg-danger/10 px-1.5 py-0.5 rounded font-bold">F</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 mb-2.5">
            <p className="text-[9px] font-body text-white/60 leading-relaxed line-clamp-4">
              🔥 Hot Deal | Emaar South – Golf Lane Villa | Golf Course View 🔥 🏡 Single Row Villa 💰 GREAT PRICE ✅ Rare Opportunity! 📞 DM Now
            </p>
          </div>
          <div className="space-y-1">
            {[
              "5 emojis (-45pts)",
              "ALL CAPS: GREAT PRICE (-10pts)",
              "Spam: \"Hot Deal\" (-20pts)",
              "No opt-out (-25pts)",
            ].map((issue) => (
              <div key={issue} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D62828" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                <span className="text-[8px] font-body text-danger/80">{issue}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex"
        >
          <div className="bg-sendara-bright rounded-full w-8 h-8 flex items-center justify-center shadow-lg shadow-sendara-bright/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>

        {/* After card */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="bg-success/5 border border-success/20 rounded-xl p-3.5"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] font-body font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">AFTER — AI OPTIMIZED</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-heading font-bold text-success">90/100</span>
              <span className="text-[9px] font-body text-success bg-success/10 px-1.5 py-0.5 rounded font-bold">A</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-2.5 mb-2.5">
            <p className="text-[9px] font-body text-white/70 leading-relaxed">
              Hi {'{{1}}'}, a 5-bed villa in Emaar South just came up — single row with direct golf course views. 4,899 sq.ft BUA. The seller is motivated. Would you like the floor plan?
            </p>
            <div className="flex gap-1.5 mt-2">
              <span className="text-[8px] font-body text-sendara-bright bg-sendara-bright/10 px-2 py-1 rounded-md">Yes, send details</span>
              <span className="text-[8px] font-body text-white/40 bg-white/5 px-2 py-1 rounded-md">Not interested</span>
            </div>
          </div>
          <div className="space-y-1">
            {[
              "Personal greeting (+10)",
              "Specific details (+10)",
              "Quick reply buttons (+15)",
              "Opt-out included (+15)",
            ].map((strength) => (
              <div key={strength} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-[8px] font-body text-success/80">{strength}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
