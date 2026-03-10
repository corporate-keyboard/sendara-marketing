"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CampaignCard() {
  const [countdown, setCountdown] = useState(720);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 720 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

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
        <div>
          <div className="text-xs font-heading font-semibold text-white">Emaar South — New Listing Alert</div>
          <div className="text-[9px] font-body text-white/40 mt-0.5">Marketing template · Started 2h ago</div>
        </div>
        <span className="text-[9px] font-body font-medium text-success bg-success/10 px-2 py-1 rounded-full flex items-center gap-1">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-success"
          />
          In Progress
        </span>
      </div>

      {/* Batch progress */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-[9px] font-body text-white/50">Batch 4 of 6</span>
          <span className="text-[9px] font-body text-sendara-bright">67%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "67%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-sendara-bright rounded-full"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Sent", value: "623", color: "text-white" },
          { label: "Delivered", value: "99.2%", color: "text-success" },
          { label: "Read", value: "80.6%", color: "text-sendara-bright" },
          { label: "Replied", value: "67", color: "text-white" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
            className="text-center"
          >
            <div className={`text-sm font-heading font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-[8px] font-body text-white/30 mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Batch timeline */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map((batch) => (
          <div key={batch} className="flex items-center gap-2">
            {batch <= 3 ? (
              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
            ) : batch === 4 ? (
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(15,181,186,0)", "0 0 0 4px rgba(15,181,186,0.2)", "0 0 0 0 rgba(15,181,186,0)"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-5 rounded-full bg-sendara-bright flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-white/10" />
            )}
            {batch < 6 && <div className={`w-3 h-0.5 ${batch < 4 ? "bg-success/30" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Block rate + next batch */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-body text-white/40">Block Rate:</span>
          <span className="text-[10px] font-heading font-bold text-success">0.7%</span>
          <span className="text-[7px] font-body font-medium text-success bg-success/10 px-1.5 py-0.5 rounded">Safe</span>
        </div>
        <div className="text-[9px] font-body text-white/30">
          Next batch: <span className="text-sendara-bright font-medium">{minutes}:{seconds.toString().padStart(2, "0")}</span>
        </div>
      </div>

      {/* Contact tier bar */}
      <div>
        <div className="text-[8px] font-body text-white/30 mb-1">Audience Mix</div>
        <div className="h-2 rounded-full overflow-hidden flex">
          <motion.div initial={{ width: 0 }} whileInView={{ width: "40%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="bg-success h-full" />
          <motion.div initial={{ width: 0 }} whileInView={{ width: "45%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }} className="bg-sendara-bright h-full" />
          <motion.div initial={{ width: 0 }} whileInView={{ width: "15%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} className="bg-warning h-full" />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] font-body text-success">P1 40%</span>
          <span className="text-[7px] font-body text-sendara-bright">P2 45%</span>
          <span className="text-[7px] font-body text-warning">P3 15%</span>
        </div>
      </div>
    </motion.div>
  );
}
