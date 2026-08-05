"use client";

import { motion } from "framer-motion";
import { type ReactNode, useSyncExternalStore } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

const subscribeHover = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(hover: hover)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getHoverSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover)").matches;
};

const getServerHoverSnapshot = () => false;

export function BentoCard({ children, className = "", index = 0 }: BentoCardProps) {
  const isHoverable = useSyncExternalStore(subscribeHover, getHoverSnapshot, getServerHoverSnapshot);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={isHoverable ? { y: -4 } : {}}
      className={`group relative overflow-hidden rounded-4xl border p-6 shadow-soft transition-colors duration-500 dark:shadow-soft-dark sm:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
