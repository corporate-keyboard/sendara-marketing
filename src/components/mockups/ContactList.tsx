"use client";

import { motion } from "framer-motion";

const TIERS = [
  { tier: "P1", label: "Safest", count: 892, total: 2847, color: "bg-success", text: "text-success", blockRate: "<1%", bg: "bg-success/10" },
  { tier: "P2", label: "Warm", count: 1204, total: 2847, color: "bg-sendara-bright", text: "text-sendara-bright", blockRate: "1-3%", bg: "bg-sendara-bright/10" },
  { tier: "P3", label: "Cool", count: 531, total: 2847, color: "bg-warning", text: "text-warning", blockRate: "3-5%", bg: "bg-warning/10" },
  { tier: "P4", label: "Cold", count: 220, total: 2847, color: "bg-danger", text: "text-danger", blockRate: "5-15%", bg: "bg-danger/10", blocked: true },
];

const CONTACTS = [
  { name: "Ahmed K.", score: 82, tier: "P1", color: "text-success", avatar: "AK" },
  { name: "Sara M.", score: 45, tier: "P2", color: "text-sendara-bright", avatar: "SM" },
  { name: "Unknown", score: 5, tier: "P4", color: "text-danger", avatar: "?", ctwa: true },
];

export default function ContactList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-sendara-navy rounded-2xl border border-white/10 p-5 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sendara-teal/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0FB5BA" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-xs font-heading font-semibold text-white">Contact Segments</span>
        </div>
        <span className="text-[10px] font-body text-white/40">2,847 contacts</span>
      </div>

      {/* Tier breakdown */}
      <div className="space-y-2 mb-5">
        {TIERS.map((t, i) => (
          <motion.div
            key={t.tier}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <span className={`text-[10px] font-heading font-bold w-6 ${t.text}`}>{t.tier}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-body text-white/60">{t.label}</span>
                  <span className="text-[9px] font-body text-white/30">{t.count}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-body text-white/30">Block: {t.blockRate}</span>
                  {t.blocked && (
                    <span className="text-[7px] font-body font-medium text-danger bg-danger/10 px-1.5 py-0.5 rounded">CTWA Only</span>
                  )}
                </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(t.count / t.total) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  className={`h-full rounded-full ${t.color}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mb-3" />

      {/* Sample contacts */}
      <div className="space-y-2">
        {CONTACTS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.12 }}
            className="flex items-center gap-2.5 py-1"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-heading font-bold ${
              c.tier === "P4" ? "bg-danger/20 text-danger" : c.tier === "P1" ? "bg-success/20 text-success" : "bg-sendara-bright/20 text-sendara-bright"
            }`}>
              {c.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-body text-white/80">{c.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-body text-white/30">Score: {c.score}</span>
                  <span className={`text-[8px] font-heading font-bold ${c.color}`}>{c.tier}</span>
                  {c.ctwa && <span className="text-[7px] font-body text-danger bg-danger/10 px-1 py-0.5 rounded">CTWA</span>}
                </div>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                  className={`h-full rounded-full ${c.tier === "P1" ? "bg-success" : c.tier === "P2" ? "bg-sendara-bright" : c.tier === "P3" ? "bg-warning" : "bg-danger"}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
