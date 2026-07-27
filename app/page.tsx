"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  Heart,
  GraduationCap,
  Cake,
  Footprints,
  Moon as MoonIcon,
  Briefcase,
  Target,
  ImagePlus,
  Sparkles,
  Code,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SleepyCat } from "@/components/sleepy-cat";
import { BentoCard } from "@/components/bento-card";
import { Marquee } from "@/components/marquee";
import { MagneticButton } from "@/components/magnetic-button";

import { FloatingSpirits } from "@/components/floating-spirits";
import { SpiritBasket } from "@/components/spirit-basket";
import { WanderingCorgi } from "@/components/wandering-corgi";
import { CorgiMinigame } from "@/components/corgi-minigame";

const headline = "Code - Sleep - Music - System - Data and him <3";

function CodeforcesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="10" width="5" height="10" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="9.5" y="4" width="5" height="16" rx="1.5" fill="currentColor" />
      <rect x="17" y="7" width="5" height="13" rx="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Home() {
  const [isGameActive, setIsGameActive] = useState(false);
  const words = headline.split(" ");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream transition-colors duration-1000 dark:bg-dusk">
      <FloatingSpirits />
      <SpiritBasket />
      <WanderingCorgi onCatch={() => setIsGameActive(true)} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-lavender/40 blur-3xl dark:bg-moon/10" />
        <div className="absolute -right-20 top-40 h-80 w-80 animate-float rounded-full bg-pink/40 blur-3xl dark:bg-moon-soft/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-slow rounded-full bg-mint/40 blur-3xl dark:bg-mint-deep/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 lg:px-10 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-lg font-bold tracking-wide text-lavender-deep dark:text-mint"
          >
            trmai.dev
          </motion.span>
        </div>

        {/* Nút chuyển đổi Theme cố định góc dưới bên trái (nhích lên xíu để không đè nút Next.js dev) */}
        <div className="fixed bottom-24 left-6 z-[110] sm:bottom-12 pointer-events-auto">
          <ThemeToggle />
        </div>

        <section className="mt-10 flex flex-col items-start gap-10 sm:mt-16 sm:flex-row sm:items-center sm:justify-between pointer-events-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-lavender-deep/30 bg-white/60 px-4 py-1.5 text-sm font-semibold text-ink-light shadow-soft backdrop-blur-sm dark:border-mint/20 dark:bg-dusk-card dark:text-cream/70"
            >
              <Sparkles size={14} className="text-pink-deep dark:text-moon-soft" />
              welcome to my sleepy corner
            </motion.div>

            <motion.h1
              data-collide="true"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-extrabold leading-tight text-ink dark:text-cream sm:text-6xl"
            >
              Hi, I&apos;m Trmai{" "}
              <span className="inline-block animate-float">^^</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.045, delayChildren: 0.35 }}
              className="mt-5 flex flex-wrap font-display text-xl font-semibold text-lavender-deep dark:text-mint sm:text-2xl"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="mr-2 mt-1 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <motion.div
            id="cat-container"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-40 w-40 shrink-0 sm:h-52 sm:w-52"
          >
            <SleepyCat className="h-full w-full" />
          </motion.div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-5 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 pointer-events-auto">
          <BentoCard
            index={0}
            className="border-lavender-deep/30 bg-lavender/50 dark:border-moon/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(201,184,240,0.3)]"
          >
            <h3 className="font-display text-lg font-bold text-ink dark:text-cream">
              About Me
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-ink-light dark:text-cream/70 sm:text-base">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-pink-deep dark:bg-dusk-card2 dark:text-moon-soft">
                  <Heart size={16} />
                </span>
                Status: Lovesick
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-lavender-deep dark:bg-dusk-card2 dark:text-moon">
                  <GraduationCap size={16} />
                </span>
                Education: Information Systems @ UIT
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-peach-deep dark:bg-dusk-card2 dark:text-peach">
                  <Cake size={16} />
                </span>
                Age: 20
              </li>
            </ul>
          </BentoCard>

          <BentoCard
            index={1}
            className="border-pink-deep/30 bg-pink/50 dark:border-moon-soft/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(245,201,222,0.3)]"
          >
            <div className="absolute right-5 top-5 flex items-end gap-0.5 text-lavender-deep/70 dark:text-mint/50">
              <motion.span
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="font-display text-xs font-bold"
              >
                z
              </motion.span>
              <motion.span
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="font-display text-sm font-bold"
              >
                Z
              </motion.span>
              <motion.span
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="font-display text-base font-bold"
              >
                Z
              </motion.span>
            </div>
            <h3 className="font-display text-lg font-bold text-ink dark:text-cream">
              Hobbies
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-ink-light dark:text-cream/70 sm:text-base">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-mint-deep dark:bg-dusk-card2 dark:text-mint">
                  <Footprints size={16} />
                </span>
                Badminton, Long walks, Animations
              </li>
            </ul>
          </BentoCard>

          <BentoCard
            index={2}
            className="group relative flex aspect-[4/5] sm:aspect-auto min-h-[280px] overflow-hidden items-center justify-center border-2 border-lavender-deep/50 bg-white/40 dark:border-moon/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(201,184,240,0.3)] sm:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            {/* Hướng dẫn: Đặt 2 file ảnh vào thư mục D:\TRMAI\trmai-profile\public\ */}
            {/* Ảnh cho Light Mode */}
            <img 
              src="/avatar-light.jpg" 
              alt="Avatar Light" 
              className="absolute inset-0 z-10 h-full w-full object-cover object-[0%_center] scale-110 transition-transform duration-500 group-hover:scale-[1.15] dark:hidden" 
              onError={(e) => {
                // Nếu chưa có ảnh thì hiển thị placeholder
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Ảnh cho Dark Mode */}
            <img 
              src="/avatar-dark.jpg" 
              alt="Avatar Dark" 
              className="absolute inset-0 z-10 hidden h-full w-full object-cover object-[30%_bottom] origin-bottom scale-[1.3] transition-transform duration-500 group-hover:scale-[1.35] dark:block" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Placeholder nằm dưới (z-0), sẽ bị ảnh (z-10) che khuất nếu ảnh load thành công */}
            <div className="relative z-0 flex flex-col items-center gap-3 px-6 text-center text-ink-light dark:text-cream/70">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-deep/20 dark:bg-moon/10">
                <ImagePlus size={26} />
              </div>
              <p className="font-display text-sm font-bold text-ink dark:text-cream">
                Chưa có ảnh
              </p>
              <p className="max-w-[180px] text-xs font-semibold">
                Lưu 2 file tên <b>avatar-light.jpg</b> và <b>avatar-dark.jpg</b> vào thư mục public để xem!
              </p>
            </div>
          </BentoCard>

          <BentoCard
            index={3}
            className="border-mint-deep/30 bg-mint/50 dark:border-mint/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(186,236,211,0.3)] sm:col-span-2 lg:col-span-2"
          >
            <h3 className="font-display text-lg font-bold text-ink dark:text-cream">
              What&apos;s Next
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-ink-light dark:text-cream/70 sm:text-base">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-mint-deep dark:bg-dusk-card2 dark:text-mint">
                  <Briefcase size={16} />
                </span>
                Status: Open to work!
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-peach-deep dark:bg-dusk-card2 dark:text-peach">
                  <Target size={16} />
                </span>
                Goal: Seeking fresher / internship opportunities
              </li>
              <li className="flex items-start gap-3 sm:items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-blue-500 dark:bg-dusk-card2 dark:text-blue-400">
                  <Code size={16} />
                </span>
                <span className="mt-1.5 sm:mt-0">
                  Roles: Full-stack Development, Software Engineer, Backend Engineer, Data Science
                </span>
              </li>
            </ul>
          </BentoCard>
        </section>

        <div className="mt-20 sm:mt-28">
          <Marquee />
        </div>

        <section className="mt-16 flex flex-col items-center gap-8 text-center sm:mt-20 pointer-events-auto">
          <div>
            <h2 data-collide="true" className="font-display text-2xl font-extrabold text-ink dark:text-cream sm:text-3xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-2 font-semibold text-ink-light dark:text-cream/70">
              Thanks for visiting my sleepy corner!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <MagneticButton
              href="https://www.facebook.com/dt.mai.1910/"
              label="Facebook"
              colorClass="border-lavender-deep/30 bg-lavender/60 text-lavender-deep dark:border-dusk-border dark:bg-dusk-card dark:text-moon"
            >
              <FacebookIcon />
            </MagneticButton>
            <MagneticButton
              href="https://github.com/trmai-19"
              label="GitHub"
              colorClass="border-pink-deep/30 bg-pink/60 text-pink-deep dark:border-dusk-border dark:bg-dusk-card dark:text-moon-soft"
            >
              <GithubIcon />
            </MagneticButton>
            <MagneticButton
              href="https://www.linkedin.com/in/trúc-mai-đặng-1a8329418"
              label="LinkedIn"
              colorClass="border-mint-deep/30 bg-mint/60 text-mint-deep dark:border-dusk-border dark:bg-dusk-card dark:text-mint"
            >
              <LinkedinIcon />
            </MagneticButton>
            <MagneticButton
              href="https://codeforces.com/profile/dtmai"
              label="Codeforces"
              colorClass="border-peach-deep/30 bg-peach/60 text-peach-deep dark:border-dusk-border dark:bg-dusk-card dark:text-peach"
            >
              <CodeforcesIcon />
            </MagneticButton>
          </div>
        </section>
      </div>

      {isGameActive && <CorgiMinigame onClose={() => setIsGameActive(false)} />}
    </main>
  );
}
