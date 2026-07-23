"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-11 rounded-full bg-lavender/60 shadow-soft dark:bg-dusk-card" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.08, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-lavender-deep/40 bg-white/70 shadow-soft backdrop-blur-sm dark:border-moon/20 dark:bg-dusk-card dark:shadow-soft-dark"
      aria-label="Chuyển đổi chế độ sáng / tối"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Moon size={18} className="text-moon-soft" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Sun size={18} className="text-peach-deep" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
