"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SpiritBasket() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    
    // Lắng nghe sự kiện chuyển theme
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleDragStart = () => {
    window.dispatchEvent(new Event("drag-basket-start"));
  };

  const handleDragEnd = () => {
    window.dispatchEvent(new Event("drag-basket-end"));
    // Báo cho Canvas biết thả giỏ ra để giải phóng tinh linh
    window.dispatchEvent(new Event("release-spirits"));
  };

  const colors = {
    glassFill: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.25)",
    glassStroke: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.6)",
    highlight: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.4)",
    rimFill: isDark ? "#4A4458" : "#E2B897",
    rimStroke: isDark ? "#6D6481" : "#C79571",
  };

  return (
    <motion.div
      id="spirit-basket"
      drag
      dragSnapToOrigin={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2, rotate: -5 }}
      className="fixed bottom-10 right-10 z-[100] h-28 w-28 cursor-grab active:cursor-grabbing drop-shadow-2xl"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-28 h-28 drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_4px_12px_rgba(201,184,240,0.5)] transition-all duration-300"
      >
        {/* Bình thuỷ tinh tròn ú (Bể cá) */}
        <path
          d="M 35 15 L 85 15 C 87 18, 87 22, 85 25 L 80 25 C 115 45, 115 100, 80 110 L 40 110 C 5 100, 5 45, 40 25 L 35 25 C 33 22, 33 18, 35 15 Z"
          fill="rgba(255, 255, 255, 0.15)"
          stroke={isDark ? "rgba(201,184,240,0.8)" : "rgba(255,255,255,0.9)"}
          strokeWidth="3"
        />
        {/* Điểm sáng bóng trên kính (tròn hơn) */}
        <path
          d="M 20 60 C 20 40, 35 35, 45 32"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Dây thừng nơ nhỏ ở cổ bình */}
        <g transform="translate(10, 0)">
          <path
            d="M 30 25 Q 50 28 70 25"
            fill="none"
            stroke="#D4A373"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Nơ */}
          <path
            d="M 50 26 C 55 35, 65 38, 55 42 C 48 38, 52 35, 50 26 Z"
            fill="#D4A373"
          />
          <path
            d="M 50 26 C 45 35, 35 38, 45 42 C 52 38, 48 35, 50 26 Z"
            fill="#D4A373"
          />
        </g>
      </svg>
    </motion.div>
  );
}
