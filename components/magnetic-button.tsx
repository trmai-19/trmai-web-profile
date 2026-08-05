"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  href: string;
  label: string;
  children: ReactNode;
  colorClass?: string;
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

export function MagneticButton({
  href,
  label,
  children,
  colorClass = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isHoverable = useSyncExternalStore(subscribeHover, getHoverSnapshot, getServerHoverSnapshot);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: relX * 0.35, y: relY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.5 }}
      whileHover={isHoverable ? { scale: 1.08 } : {}}
      whileTap={{ scale: 0.9 }}
      className={`flex h-16 w-16 items-center justify-center rounded-full border shadow-soft transition-colors duration-300 sm:h-[4.5rem] sm:w-[4.5rem] ${colorClass}`}
    >
      {children}
    </motion.a>
  );
}
