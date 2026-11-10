"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { colors, projects, totalTechnologies, yearsOfExperience } from "@/lib/data";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
  emoji: string;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplay(value);
      return;
    }
    setDisplay(0);
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const stats: StatItem[] = [
    {
      label: "Years Experience",
      value: yearsOfExperience(),
      suffix: "+",
      color: colors.teal,
      emoji: "⚡",
    },
    {
      label: "Projects Shipped",
      value: projects.length,
      suffix: "",
      color: colors.coral,
      emoji: "🚀",
    },
    {
      label: "Technologies",
      value: totalTechnologies(),
      suffix: "+",
      color: colors.yellow,
      emoji: "🧰",
    },
    {
      label: "Banking Modules (Maker-Checker)",
      value: 7,
      suffix: "",
      color: colors.lilac,
      emoji: "🏦",
    },
  ];

  return (
    <section aria-label="Career statistics" className="py-12 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-base border-2 border-ink bg-white shadow-brutal overflow-hidden flex flex-col"
            >
              <div
                className="h-3 border-b-2 border-ink"
                style={{ backgroundColor: stat.color }}
              />
              <div className="p-5 sm:p-6 text-center flex-1 flex flex-col justify-center">
                <div className="text-3xl sm:text-4xl font-heading text-ink mb-1 flex items-center justify-center gap-2">
                  <span aria-hidden="true" className="text-2xl">
                    {stat.emoji}
                  </span>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-ink/80">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
