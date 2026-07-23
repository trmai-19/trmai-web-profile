"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SleepyCatProps {
  className?: string;
}

export function SleepyCat({ className = "" }: SleepyCatProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <motion.div
      // Chỉnh scale lớn hơn chút để bù lại viewBox mở rộng
      className={`relative -translate-x-6 sm:-translate-x-10 scale-[1.15] sm:scale-125 ${className}`}
      animate={{
        y: [0, -3, 0],
        scaleY: [1, 0.94, 1],
        scaleX: [1, 1.05, 1]
      }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        // Mở rộng viewBox sang trái (âm 20) và phải (tổng 280) để không bị cắt tai nghe và đuôi
        viewBox="-20 0 280 200"
        className="h-full w-full drop-shadow-[0_8px_20px_rgba(255,175,207,0.7)] dark:drop-shadow-[0_8px_20px_rgba(255,175,207,0.25)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bóng đổ mặt đất */}
        <ellipse cx="110" cy="165" rx="95" ry="14" className="fill-lavender-deep/30 dark:fill-black/40" />

        {/* --- CÁI GỐI TỰA LƯNG (Dark mode) --- */}
        <motion.path
          d="M 140 165 C 140 135, 220 135, 235 150 C 250 165, 230 175, 190 175 C 150 175, 140 175, 140 165 Z"
          className="fill-moon-soft drop-shadow-sm"
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, x: isDark ? 0 : 20 }}
          transition={{ duration: 1.0, delay: isDark ? 1.2 : 0, ease: "easeInOut" }}
        />
        
        {/* Lớp áo ngoài của cục bột */}
        <g fill="#FFF5FA">
          {/* Đuôi */}
          <path d="M 185 145 C 235 145, 235 105, 210 100" fill="none" stroke="#FFF5FA" strokeWidth="26" strokeLinecap="round" />
          
          {/* Tai trái */}
          <path d="M 35 100 C 25 50, 60 40, 80 80 Z" />
          {/* Tai phải */}
          <path d="M 185 100 C 195 50, 160 40, 140 80 Z" />
          
          {/* Thân béo tròn bẹp dài */}
          <path d="M 20 145 C 20 85, 60 75, 110 75 C 160 75, 200 85, 200 145 C 200 180, 20 180, 20 145 Z" />
        </g>

        {/* Tai trong */}
        <path d="M 43 95 C 35 60, 58 55, 73 80 Z" className="fill-[#FFAFCF]" opacity="0.6" />
        <path d="M 177 95 C 185 60, 162 55, 147 80 Z" className="fill-[#FFAFCF]" opacity="0.6" />

        {/* Má hồng bự chảy xệ */}
        <ellipse cx="45" cy="140" rx="18" ry="10" className="fill-[#FFAFCF]" opacity="0.5" />
        <ellipse cx="175" cy="140" rx="18" ry="10" className="fill-[#FFAFCF]" opacity="0.5" />

        {/* --- KHUÔN MẶT CHUYỂN TRẠNG THÁI (Đóng/mở mắt từ từ) --- */}
        <motion.g
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Mắt cười tít thò lò ^ ^ */}
          <path d="M 55 125 Q 65 115 75 125" fill="none" stroke="#4A4458" strokeWidth="5" strokeLinecap="round" />
          <path d="M 145 125 Q 155 115 165 125" fill="none" stroke="#4A4458" strokeWidth="5" strokeLinecap="round" />
          
          {/* Miệng hát há to vui vẻ */}
          <path d="M 102 130 C 102 145, 118 145, 118 130 Z" className="fill-pink-deep" />
          {/* Lưỡi nhỏ xíu trong miệng */}
          <path d="M 105 135 C 105 142, 115 142, 115 135 Z" className="fill-pink" />
        </motion.g>

        <motion.g
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Asleep Eyes - Mắt nhắm */}
          <line x1="55" y1="130" x2="75" y2="130" stroke="#8A8299" strokeWidth="4" strokeLinecap="round" />
          <line x1="145" y1="130" x2="165" y2="130" stroke="#8A8299" strokeWidth="4" strokeLinecap="round" />
          
          {/* Miệng nhắm khi ngủ */}
          <ellipse cx="110" cy="135" rx="3.5" ry="5.5" className="fill-[#FFAFCF]" />
        </motion.g>

        {/* --- CÁC PHỤ KIỆN ANIMATED --- */}

        {/* Chăn đắp (Đắp chăn sau khi nhắm mắt) */}
        <motion.g
          initial={false}
          animate={{ y: isDark ? 0 : 60, opacity: isDark ? 1 : 0 }}
          transition={{ duration: 1.2, delay: isDark ? 1.2 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Chăn chỉ đắp ngang bụng/phía dưới, không che mặt */}
          <path 
            d="M 10 175 C 10 145, 90 145, 120 145 C 180 145, 220 140, 225 175 Z" 
            className="fill-mint drop-shadow-[0_-2px_8px_rgba(207,246,228,0.5)]" 
          />
          {/* Nếp gấp chăn */}
          <path d="M 60 155 C 90 160, 140 160, 170 155" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
          <path d="M 100 145 C 120 150, 140 150, 160 145" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
        </motion.g>

        {/* Tai nghe (Cất tai nghe đầu tiên khi đi ngủ) */}
        <motion.g
          initial={false}
          animate={{ y: isDark ? -50 : 0, opacity: isDark ? 0 : 1 }}
          transition={{ duration: 1.2, delay: isDark ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Vòng qua đầu */}
          <path d="M 15 110 C 15 0, 205 0, 205 110" fill="none" stroke="#E5E7EB" strokeWidth="12" strokeLinecap="round" />
          <path d="M 15 110 C 15 0, 205 0, 205 110" fill="none" stroke="#F9FAFB" strokeWidth="6" strokeLinecap="round" />
          
          {/* Ốp tai nghe trái */}
          <rect x="-12" y="85" width="30" height="50" rx="14" className="fill-pink-deep" />
          <rect x="-7" y="90" width="20" height="40" rx="10" className="fill-pink" opacity="0.8" />
          
          {/* Ốp tai nghe phải */}
          <rect x="195" y="85" width="30" height="50" rx="14" className="fill-pink-deep" />
          <rect x="200" y="90" width="20" height="40" rx="10" className="fill-pink" opacity="0.8" />
        </motion.g>
      </svg>

      {/* Bong bóng Zzz hoặc Nốt nhạc (delay tương ứng) */}
      <AnimatePresence mode="wait">
        {mounted && isDark ? (
          <motion.div
            key="zzz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, delay: 2.0 }} // Đợi đắp chăn xong mới khò khò
          >
            {/* Zzz bubbles */}
            <motion.span animate={{ y: [-4, -20, -4], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute right-8 top-0 font-display text-xl font-bold text-moon/70">Z</motion.span>
            <motion.span animate={{ y: [-4, -24, -4], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute right-0 top-4 font-display text-3xl font-bold text-moon/60">z</motion.span>
            <motion.span animate={{ y: [-4, -28, -4], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.6 }} className="absolute right-4 top-14 font-display text-4xl font-extrabold text-moon/50">Z</motion.span>
          </motion.div>
        ) : mounted ? (
          <motion.div
            key="music"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, delay: 2.0 }} // Đợi đeo tai nghe xong mới có nhạc
          >
            {/* Music notes bay bổng */}
            <motion.span animate={{ y: [-4, -25, -4], x: [0, 12, 0], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute right-4 top-0 font-display text-2xl font-bold text-pink-deep">♪</motion.span>
            <motion.span animate={{ y: [0, -30, 0], x: [0, -15, 0], opacity: [0, 1, 0], scale: [0.7, 1.1, 0.7] }} transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} className="absolute left-8 top-2 font-display text-3xl font-bold text-lavender-deep">♫</motion.span>
            <motion.span animate={{ y: [10, -15, 10], x: [0, 8, 0], opacity: [0, 1, 0], scale: [0.9, 1.3, 0.9] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute right-12 -top-4 font-display text-xl font-bold text-mint-deep">♩</motion.span>
            <motion.span animate={{ y: [5, -20, 5], x: [0, -10, 0], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 2.0 }} className="absolute left-4 top-10 font-display text-2xl font-bold text-pink">♬</motion.span>
            <motion.span animate={{ y: [-4, -30, -4], x: [0, -15, 0], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-14 -top-4 font-display text-3xl font-bold text-lavender-deep">♫</motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
