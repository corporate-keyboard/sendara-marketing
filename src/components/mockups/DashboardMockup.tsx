"use client";

import { motion } from "framer-motion";

export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-sendara-navy rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-sendara-teal" />
            <span className="text-[10px] font-heading font-light tracking-[2px] text-white/80">sendara</span>
          </div>
          <span className="text-[10px] text-white/30">|</span>
          <span className="text-[10px] font-body text-white/50">Agency Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-success"
          />
          <span className="text-[9px] font-body text-white/40">Connected</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-10 border-r border-white/5 py-4 flex flex-col items-center gap-3">
          {["bg-sendara-teal", "bg-sendara-bright/50", "bg-white/20", "bg-white/20", "bg-white/20"].map((color, i) => (
            <div key={i} className={`w-5 h-5 rounded-md ${i === 0 ? color : "bg-white/10"}`} />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 space-y-3">
          {/* Stat cards row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Current Tier", value: "Tier 2", sub: "10,000 limit", color: "text-sendara-bright", badge: true },
              { label: "Quality Rating", value: "High", sub: "Green", color: "text-success", dot: true },
              { label: "Warm-Up Phase", value: "Phase 4", sub: "57%", color: "text-sendara-bright", progress: 57 },
              { label: "Daily Usage", value: "847 / 1,000", sub: "85%", color: "text-white", progress: 85 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white/5 rounded-lg p-2.5 border border-white/5"
              >
                <div className="text-[8px] font-body text-white/40 uppercase tracking-wider">{stat.label}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  {stat.dot && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-success"
                    />
                  )}
                  {stat.badge ? (
                    <span className={`text-[10px] font-heading font-semibold ${stat.color} bg-sendara-bright/20 px-1.5 py-0.5 rounded`}>{stat.value}</span>
                  ) : (
                    <span className={`text-sm font-heading font-semibold ${stat.color}`}>{stat.value}</span>
                  )}
                </div>
                {stat.progress !== undefined ? (
                  <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full ${stat.progress > 80 ? "bg-warning" : "bg-sendara-bright"}`}
                    />
                  </div>
                ) : (
                  <div className="text-[8px] font-body text-white/30 mt-0.5">{stat.sub}</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Chart area */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/5 rounded-lg p-2.5 border border-white/5"
          >
            <div className="text-[8px] font-body text-white/40 uppercase tracking-wider mb-2">7-Day Send Volume</div>
            <svg viewBox="0 0 300 60" className="w-full h-12">
              <defs>
                <linearGradient id="dashboardChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0FB5BA" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0FB5BA" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 L43,38 L86,42 L129,30 L172,25 L215,18 L258,22 L300,15 L300,60 L0,60 Z"
                fill="url(#dashboardChartGrad)"
              />
              <motion.path
                d="M0,45 L43,38 L86,42 L129,30 L172,25 L215,18 L258,22 L300,15"
                fill="none"
                stroke="#0FB5BA"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </svg>
          </motion.div>

          {/* Bottom cards */}
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="bg-white/5 rounded-lg p-2.5 border border-white/5"
            >
              <div className="text-[8px] font-body text-white/40 uppercase tracking-wider">Active Campaigns</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-lg font-heading font-bold text-white">3</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <div className="w-2 h-2 rounded-full bg-sendara-bright" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="bg-white/5 rounded-lg p-2.5 border border-white/5"
            >
              <div className="text-[8px] font-body text-white/40 uppercase tracking-wider">Templates</div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-lg font-heading font-bold text-white">12</span>
                <span className="text-[9px] font-body text-white/40">Active</span>
                <span className="text-[9px] font-body text-warning">2 Paused</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: 10 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-3 right-3 bg-sendara-teal/90 backdrop-blur rounded-lg px-3 py-2 shadow-lg max-w-[180px]"
      >
        <div className="text-[9px] font-body font-medium text-white">Tier upgrade available!</div>
        <div className="text-[8px] font-body text-white/70 mt-0.5">62% of Tier 2 capacity used over 7 days</div>
      </motion.div>
    </motion.div>
  );
}
