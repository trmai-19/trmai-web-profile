"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function WanderingCorgi() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [position, setPosition] = useState({ x: 200, y: 400 });
  const [facingRight, setFacingRight] = useState(true);
  const [walkDuration, setWalkDuration] = useState(4);

  useEffect(() => {
    if (!isMounted) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let currentX = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    let currentY = typeof window !== "undefined" ? window.innerHeight - 120 : 400;

    const step = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const targetX = Math.random() * (w - 140) + 70;
      const targetY = Math.random() * (h - 140) + 70;

      setFacingRight(targetX > currentX);
      setPosition({ x: targetX, y: targetY });

      const distance = Math.sqrt(
        Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
      );
      currentX = targetX;
      currentY = targetY;

      const durationSec = Math.max(2.5, distance / 120);
      setWalkDuration(durationSec);

      const pauseMs = Math.random() * 2000 + 1500;
      timeoutId = setTimeout(step, durationSec * 1000 + pauseMs);
    };

    timeoutId = setTimeout(step, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  // Màu sắc của Corgi
  const corgiOrange = "#F29C38";
  const corgiDarkOrange = "#D87A1D";
  const corgiWhite = "#FFFFFF";
  const corgiPink = "#FF8DA1";
  const corgiBlack = "#333333";

  return (
    <motion.div
      className="pointer-events-none fixed select-none drop-shadow-md z-0"
      style={{
        marginLeft: -40,
        marginTop: -30,
      }}
      animate={{
        x: position.x,
        y: position.y,
        scaleX: facingRight ? 1 : -1,
        scaleY: 1,
        rotate: [-1, 1, -1],
      }}
      transition={{
        x: { type: "tween", ease: "easeInOut", duration: walkDuration },
        y: { type: "tween", ease: "easeInOut", duration: walkDuration },
        rotate: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
      }}
    >
      <svg width="80" height="60" viewBox="0 0 120 80">
        <motion.rect
          x="35"
          y="55"
          width="12"
          height="18"
          rx="6"
          fill={corgiDarkOrange}
          animate={{ rotate: [-25, 25, -25] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0.5, originY: 0 }}
        />
        <motion.rect
          x="75"
          y="55"
          width="12"
          height="18"
          rx="6"
          fill={corgiDarkOrange}
          animate={{ rotate: [25, -25, 25] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0.5, originY: 0 }}
        />
        <circle cx="20" cy="40" r="10" fill={corgiWhite} />
        <rect x="25" y="25" width="60" height="40" rx="20" fill={corgiOrange} />
        <path d="M 35 65 C 35 55, 80 55, 80 65 Z" fill={corgiWhite} />
        <motion.rect
          x="28"
          y="55"
          width="14"
          height="20"
          rx="7"
          fill={corgiWhite}
          animate={{ rotate: [25, -25, 25] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0.5, originY: 0 }}
        />
        <motion.rect
          x="80"
          y="55"
          width="14"
          height="20"
          rx="7"
          fill={corgiWhite}
          animate={{ rotate: [-25, 25, -25] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          style={{ originX: 0.5, originY: 0 }}
        />
        <circle cx="85" cy="40" r="18" fill={corgiWhite} />
        <circle cx="95" cy="30" r="18" fill={corgiOrange} />
        <ellipse cx="108" cy="35" rx="10" ry="7" fill={corgiWhite} />
        <circle cx="115" cy="32" r="3" fill={corgiBlack} />
        <circle cx="102" cy="25" r="3.5" fill={corgiBlack} />
        <circle cx="103" cy="24" r="1" fill={corgiWhite} />
        <path
          d="M 108 40 L 108 46 C 108 48, 112 48, 112 46 L 112 40 Z"
          fill={corgiPink}
        />
        <path d="M 85 20 L 75 0 L 95 10 Z" fill={corgiDarkOrange} />
        <path d="M 95 18 L 90 -2 L 108 8 Z" fill={corgiOrange} />
        <path d="M 97 16 L 93 4 L 104 10 Z" fill={corgiPink} />
      </svg>
    </motion.div>
  );
}
