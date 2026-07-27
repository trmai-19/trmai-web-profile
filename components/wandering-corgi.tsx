"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CorgiState = "walking" | "angry" | "exploding";

interface WanderingCorgiProps {
  onCatch?: () => void;
}

export function WanderingCorgi({ onCatch }: WanderingCorgiProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [corgiState, setCorgiState] = useState<CorgiState>("walking");
  const stateRef = useRef<CorgiState>("walking");
  
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [facingRight, setFacingRight] = useState(true);
  const [walkDuration, setWalkDuration] = useState(3);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    setPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
    });
  }, []);

  const walkToNewPosition = () => {
    if (stateRef.current !== "walking") return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Tọa độ đích ngẫu nhiên (chỉ đi trong vùng màn hình)
    const targetX = Math.random() * (w - 100) + 50;
    const targetY = Math.random() * (h - 100) + 50;
    
    // Đảo mặt tùy theo hướng đi
    setFacingRight(targetX > position.x);
    
    setPosition({ x: targetX, y: targetY });

    // Tốc độ siêu nhanh: 250px / giây (khó bắt hơn)
    const distance = Math.sqrt(Math.pow(targetX - position.x, 2) + Math.pow(targetY - position.y, 2));
    const durationSec = distance / 250; 
    setWalkDuration(durationSec);
    
    timerRef.current = setTimeout(() => {
      walkToNewPosition();
    }, (durationSec * 1000) + Math.random() * 300 + 100); // Nghỉ siêu ngắn (0.1s - 0.4s)
  };

  const handleMouseEnter = () => {
    if (stateRef.current !== "walking") return;
    
    // Tỉ lệ 50/50: 1 là né (chạy liền), 0 là đứng yên cho bắt
    const shouldDodge = Math.floor(Math.random() * 2) === 1;
    if (shouldDodge) {
      if (timerRef.current) clearTimeout(timerRef.current);
      walkToNewPosition(); // Lập tức huỷ đường đi cũ, chọn hướng khác chạy trốn
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (stateRef.current !== "walking") return;
    
    const shouldDodge = Math.floor(Math.random() * 2) === 1;
    if (shouldDodge) {
      e.preventDefault(); // Chặn sự kiện click, không cho nổ
      if (timerRef.current) clearTimeout(timerRef.current);
      walkToNewPosition(); // Vọt chạy lẹ
    }
    // Nếu ra 0 (không né) thì để yên cho event truyền tới onClick
  };

  useEffect(() => {
    if (mounted && corgiState === "walking") {
      walkToNewPosition();
    }
  }, [mounted, corgiState]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCorgiClick = () => {
    if (stateRef.current === "walking") {
      stateRef.current = "angry";
      setCorgiState("angry");
      // Bay thẳng ra giữa màn hình
      setPosition({ x: window.innerWidth / 2 - 40, y: window.innerHeight / 2 - 30 });
      if (timerRef.current) clearTimeout(timerRef.current);
      
      // Giận dữ giữa màn hình trong 2s để dễ nhìn logo, sau đó vào thẳng game (không nổ)
      timerRef.current = setTimeout(() => {
        if (onCatch) onCatch();
        
        // Sau khi ném event lên cha, reset Corgi về walking để lúc user thoát game nó vẫn sống
        stateRef.current = "walking";
        setCorgiState("walking");
      }, 2000);
    }
  };

  if (!mounted) return null;

  const variants = {
    walking: {
      x: position.x,
      y: position.y,
      scaleX: facingRight ? 1 : -1,
      scaleY: 1,
      opacity: 1,
      rotate: [-1, 1, -1],
    },
    angry: {
      x: position.x,
      y: position.y,
      scaleX: 4, // Phóng to cực đại ở giữa màn hình
      scaleY: 4,
      opacity: 1,
      rotate: 0, // Không rung lắc
    },
    exploding: {
      x: position.x,
      y: position.y,
      scaleX: 5,
      scaleY: 5,
      opacity: 0,
      rotate: 0,
    }
  };

  const transitions: any = {
    walking: {
      x: { type: "tween", ease: "linear", duration: walkDuration },
      y: { type: "tween", ease: "linear", duration: walkDuration },
      rotate: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
    },
    angry: {
      scaleX: { duration: 0.5, type: "spring", bounce: 0.6 },
      scaleY: { duration: 0.5, type: "spring", bounce: 0.6 },
      x: { duration: 0 },
      y: { duration: 0 },
      rotate: { duration: 0 }, 
    },
    exploding: {
      scaleX: { duration: 0.3, ease: "easeOut" },
      scaleY: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.3, ease: "easeIn" },
    }
  };

  // Màu sắc của Corgi
  const corgiOrange = "#F29C38";
  const corgiDarkOrange = "#D87A1D";
  const corgiWhite = "#FFFFFF";
  const corgiPink = "#FF8DA1";
  const corgiBlack = "#333333";

  return (
    <>
      {/* Background tối đi khi đang chuẩn bị vào game */}
      <AnimatePresence>
        {corgiState !== "walking" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9998] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed select-none cursor-pointer drop-shadow-md"
      style={{ 
        marginLeft: -40, 
        marginTop: -30,
        zIndex: 9999
      }}
      onClick={handleCorgiClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      variants={variants}
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={corgiState}
      transition={
        corgiState === "walking"
          ? transitions.walking
          : transitions[corgiState as keyof typeof transitions]
      }
    >
      {corgiState === "exploding" && (
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path d="M 50 10 L 58 35 L 85 20 L 68 45 L 95 50 L 68 55 L 85 80 L 58 65 L 50 90 L 42 65 L 15 80 L 32 55 L 5 50 L 32 45 L 15 20 L 42 35 Z" fill={corgiOrange} />
          <path d="M 50 25 L 55 40 L 70 30 L 60 45 L 80 50 L 60 55 L 70 75 L 55 60 L 50 80 L 45 60 L 30 75 L 40 55 L 20 50 L 40 45 L 30 30 L 45 40 Z" fill="#FF4444" />
        </svg>
      )}

      {corgiState === "angry" && (
        // Khuôn mặt Corgi nhìn thẳng, giận dữ
        <svg width="80" height="80" viewBox="0 0 100 100">
          {/* Tai trái */}
          <path d="M 15 15 L 35 40 L 45 10 Z" fill={corgiOrange} />
          <path d="M 22 22 L 35 38 L 40 18 Z" fill={corgiPink} />
          {/* Tai phải */}
          <path d="M 85 15 L 65 40 L 55 10 Z" fill={corgiOrange} />
          <path d="M 78 22 L 65 38 L 60 18 Z" fill={corgiPink} />
          
          {/* Khuôn mặt chính (tròn) */}
          <circle cx="50" cy="55" r="35" fill={corgiOrange} />
          
          {/* Mảng trắng trên mặt */}
          <path d="M 50 35 C 20 35, 15 65, 15 75 C 30 90, 70 90, 85 75 C 85 65, 80 35, 50 35 Z" fill={corgiWhite} />
          <path d="M 50 20 L 40 40 L 60 40 Z" fill={corgiWhite} />

          {/* Cặp mắt tức giận > < */}
          <path d="M 25 45 L 40 52 L 30 57" fill="none" stroke={corgiBlack} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 75 45 L 60 52 L 70 57" fill="none" stroke={corgiBlack} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Ký hiệu tức giận (gân máu) ở trán */}
          <path d="M 80 25 L 85 20 L 85 25 L 90 25 L 85 30 L 85 25 Z" fill="none" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Mũi đen */}
          <ellipse cx="50" cy="65" rx="7" ry="5" fill={corgiBlack} />

          {/* Miệng gầm gừ (răng cưa) */}
          <path d="M 40 75 L 45 72 L 50 75 L 55 72 L 60 75" fill="none" stroke={corgiBlack} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {corgiState === "angry" && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[80px] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[10px] font-extrabold text-[#F29C38] tracking-wide"
          style={{ zIndex: 100000, WebkitTextStroke: "0.25px white", filter: "drop-shadow(0 0 2px rgba(242,156,56,0.8))" }}
        >
          MINIGAME GIẢI CỨU CORGI
        </motion.div>
      )}

      {corgiState === "walking" && (
        // Dáng Corgi đi bộ nhìn ngang (Chibi cutie)
        <svg width="80" height="60" viewBox="0 0 120 80">
          
          {/* Chân sau (bên khuất) */}
          <motion.rect x="35" y="55" width="12" height="18" rx="6" fill={corgiDarkOrange}
            animate={{ rotate: [-25, 25, -25] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
            style={{ originX: 0.5, originY: 0 }} 
          />
          {/* Chân trước (bên khuất) */}
          <motion.rect x="75" y="55" width="12" height="18" rx="6" fill={corgiDarkOrange}
            animate={{ rotate: [25, -25, 25] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
            style={{ originX: 0.5, originY: 0 }} 
          />

          {/* Đuôi cục bông */}
          <circle cx="20" cy="40" r="10" fill={corgiWhite} />
          
          {/* Thân béo tròn (Corgi body) */}
          <rect x="25" y="25" width="60" height="40" rx="20" fill={corgiOrange} />
          {/* Bụng trắng */}
          <path d="M 35 65 C 35 55, 80 55, 80 65 Z" fill={corgiWhite} />

          {/* Chân sau (bên ngoài) */}
          <motion.rect x="28" y="55" width="14" height="20" rx="7" fill={corgiWhite}
            animate={{ rotate: [25, -25, 25] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
            style={{ originX: 0.5, originY: 0 }} 
          />
          {/* Chân trước (bên ngoài) */}
          <motion.rect x="80" y="55" width="14" height="20" rx="7" fill={corgiWhite}
            animate={{ rotate: [-25, 25, -25] }} 
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
            style={{ originX: 0.5, originY: 0 }} 
          />

          {/* Cổ áo lông trắng (Fluffy collar) */}
          <circle cx="85" cy="40" r="18" fill={corgiWhite} />

          {/* Đầu tròn */}
          <circle cx="95" cy="30" r="18" fill={corgiOrange} />

          {/* Mõm trắng nhô ra */}
          <ellipse cx="108" cy="35" rx="10" ry="7" fill={corgiWhite} />
          {/* Mũi đen */}
          <circle cx="115" cy="32" r="3" fill={corgiBlack} />
          
          {/* Mắt lấp lánh */}
          <circle cx="102" cy="25" r="3.5" fill={corgiBlack} />
          <circle cx="103" cy="24" r="1" fill={corgiWhite} />

          {/* Lưỡi thè ra cực cute */}
          <path d="M 108 40 L 108 46 C 108 48, 112 48, 112 46 L 112 40 Z" fill={corgiPink} />

          {/* Tai to */}
          {/* Tai xa (trái) */}
          <path d="M 85 20 L 75 0 L 95 10 Z" fill={corgiDarkOrange} />
          {/* Tai gần (phải) */}
          <path d="M 95 18 L 90 -2 L 108 8 Z" fill={corgiOrange} />
          <path d="M 97 16 L 93 4 L 104 10 Z" fill={corgiPink} />

        </svg>
      )}
    </motion.div>
    </>
  );
}
