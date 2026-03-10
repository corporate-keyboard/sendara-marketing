"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const STATES = [
  {
    label: "All systems normal",
    color: "text-success",
    bg: "bg-success/10",
    rating: "HIGH",
    ratingColor: "text-success",
    blockRate: 0.8,
    readRate: 78,
    replyRate: 12,
  },
  {
    label: "Quality dropped — Volume reduced 50%",
    color: "text-warning",
    bg: "bg-warning/10",
    rating: "MEDIUM",
    ratingColor: "text-warning",
    blockRate: 2.1,
    readRate: 52,
    replyRate: 6,
  },
  {
    label: "Quality restored — Full volume resumed",
    color: "text-success",
    bg: "bg-success/10",
    rating: "HIGH",
    ratingColor: "text-success",
    blockRate: 0.9,
    readRate: 74,
    replyRate: 11,
  },
];

export default function QualityCard() {
  const [stateIndex, setStateIndex] = useState(0);
  const state = STATES[stateIndex];

  useEffect(() => {
    const delays = [3500, 7000, 10500];
    const cycleLength = 10500;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function scheduleRound(offset: number) {
      if (cancelled) return;
      timers.push(setTimeout(() => { if (!cancelled) setStateIndex(1); }, offset + delays[0]));
      timers.push(setTimeout(() => { if (!cancelled) setStateIndex(2); }, offset + delays[1]));
      timers.push(setTimeout(() => { if (!cancelled) setStateIndex(0); }, offset + delays[2]));
    }

    scheduleRound(0);

    const interval = setInterval(() => {
      scheduleRound(0);
    }, cycleLength);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  const metrics = [
    { label: "Block Rate", value: state.blockRate, max: 5, danger: 2, unit: "%" },
    { label: "Read Rate", value: state.readRate, max: 100, good: 65, unit: "%" },
    { label: "Reply Rate", value: state.replyRate, max: 30, good: 5, unit: "%" },
  ];

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
        <div className="w-7 h-7 rounded-lg bg-sendara-teal/20 flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0FB5BA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <span className="text-xs font-heading font-semibold text-white">Quality Shield</span>
      </div>

      {/* Rating display */}
      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <motion.div
            animate={{
              boxShadow:
                state.rating === "HIGH"
                  ? [
                      "0 0 0 0 rgba(45,106,79,0)",
                      "0 0 0 12px rgba(45,106,79,0.15)",
                      "0 0 0 0 rgba(45,106,79,0)",
                    ]
                  : [
                      "0 0 0 0 rgba(231,111,81,0)",
                      "0 0 0 12px rgba(231,111,81,0.15)",
                      "0 0 0 0 rgba(231,111,81,0)",
                    ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={state.rating}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`text-lg font-heading font-bold ${state.ratingColor}`}
              >
                {state.rating}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-2.5 mb-4">
        {metrics.map((metric) => {
          const isGood = metric.danger
            ? metric.value <= metric.danger
            : metric.value >= (metric.good ?? 0);
          const barColor = isGood ? "bg-success" : metric.danger ? "bg-danger" : "bg-warning";
          const textColor = isGood ? "text-success" : metric.danger ? "text-danger" : "text-warning";

          return (
            <div key={metric.label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[9px] font-body text-white/40">{metric.label}</span>
                <span className={`text-[9px] font-body font-medium ${textColor}`}>
                  {metric.value}
                  {metric.unit}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${barColor}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Status ticker */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className={`${state.bg} rounded-lg px-3 py-2`}
        >
          <span className={`text-[10px] font-body font-medium ${state.color}`}>
            {state.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
