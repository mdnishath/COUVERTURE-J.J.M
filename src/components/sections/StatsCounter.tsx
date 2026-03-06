"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Stat, SectionStyle } from "@/lib/wordpress";

interface StatsCounterProps {
  stats: Stat[];
  sectionStyle?: SectionStyle;
}

function CounterItem({
  value,
  suffix,
  label,
  index,
  sectionStyle,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  sectionStyle?: SectionStyle;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
      style={{
        ...(sectionStyle?.cardBg ? { backgroundColor: sectionStyle.cardBg } : {}),
        ...(sectionStyle?.cardRadius ? { borderRadius: sectionStyle.cardRadius } : {}),
      }}
    >
      <div className="flex items-baseline justify-center gap-1">
        <motion.span
          className={`s-title text-5xl md:text-6xl font-heading font-bold ${sectionStyle?.titleColor ? '' : 'text-white'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          style={{
            fontSize: "var(--s-title-size, clamp(1.75rem, 2vw + 1rem, 2.625rem))",
            ...(sectionStyle?.titleColor ? { color: sectionStyle.titleColor } : {}),
          }}
        >
          {isInView ? value : 0}
        </motion.span>
        <span
          className={`text-2xl md:text-3xl font-heading font-bold ${sectionStyle?.subtitleColor ? '' : 'text-primary'}`}
          style={{
            ...(sectionStyle?.subtitleColor ? { color: sectionStyle.subtitleColor } : {}),
          }}
        >
          {suffix}
        </span>
      </div>
      <p
        className={`s-description font-heading font-medium text-sm mt-2 uppercase tracking-wider ${sectionStyle?.descriptionColor ? '' : 'text-gray-400'}`}
        style={{
          ...(sectionStyle?.descriptionColor ? { color: sectionStyle.descriptionColor } : {}),
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter({ stats, sectionStyle }: StatsCounterProps) {
  return (
    <div className="relative">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <CounterItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              index={index}
              sectionStyle={sectionStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
