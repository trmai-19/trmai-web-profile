"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  return (
    <motion.div
      data-collide="true"
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      className={`group relative overflow-hidden rounded-4xl border p-6 shadow-soft transition-colors duration-1000 dark:shadow-soft-dark sm:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
