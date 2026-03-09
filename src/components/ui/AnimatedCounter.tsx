"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({ value, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * numericValue);
      setDisplayValue(currentValue.toString());

      if (current >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
