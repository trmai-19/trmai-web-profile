"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  Code,
  FileText,
  ExternalLink,
  Mail,
  Server,
  Database,
  Award,
  Layers,
  ImagePlus,
  BookOpen,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SleepyCat } from "@/components/sleepy-cat";
import { BentoCard } from "@/components/bento-card";
import { Marquee } from "@/components/marquee";
import { MagneticButton } from "@/components/magnetic-button";
import { FloatingSpirits } from "@/components/floating-spirits";
import { WanderingCorgi } from "@/components/wandering-corgi";

const headline = "Software Engineering • Scalable Systems • Algorithms & Data";

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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Home() {
  const words = headline.split(" ");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream transition-colors duration-1000 dark:bg-dusk">
      <FloatingSpirits />
      <WanderingCorgi />

      {/* Nền mờ tạo chiều sâu */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-lavender/40 blur-3xl dark:bg-moon/10" />
        <div className="absolute -right-20 top-40 h-80 w-80 animate-float rounded-full bg-pink/40 blur-3xl dark:bg-moon-soft/10" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-slow rounded-full bg-mint/40 blur-3xl dark:bg-mint-deep/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8 pointer-events-none">
        {/* Thanh Header trên cùng */}
        <div className="flex items-center justify-between pointer-events-auto">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-lg font-bold tracking-wide text-lavender-deep dark:text-mint"
          >
            trmai.dev
          </motion.span>

          <motion.a
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            href="/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-lavender-deep/30 bg-white/70 px-4 py-1.5 text-xs font-bold text-lavender-deep shadow-soft backdrop-blur-md transition-all duration-300 hover:border-lavender-deep hover:bg-lavender-deep hover:text-white dark:border-mint/30 dark:bg-dusk-card dark:text-mint dark:hover:border-mint dark:hover:bg-mint dark:hover:text-dusk sm:text-sm"
          >
            <FileText size={15} className="transition-transform group-hover:scale-110" />
            <span>CV / Resume</span>
          </motion.a>
        </div>

        {/* Nút chuyển đổi Theme cố định góc dưới bên trái */}
        <div className="fixed bottom-24 left-6 z-[110] sm:bottom-12 pointer-events-auto">
          <ThemeToggle />
        </div>

        {/* 1. HERO SECTION */}
        <section className="mt-10 flex flex-col items-start gap-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between pointer-events-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-lavender-deep/30 bg-white/70 px-4 py-1.5 text-xs font-semibold text-ink-light shadow-soft backdrop-blur-sm dark:border-mint/20 dark:bg-dusk-card dark:text-cream/80 sm:text-sm"
            >
              <Sparkles size={14} className="text-pink-deep dark:text-moon-soft" />
              Information Systems @ UIT • Software & Systems Engineering
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-extrabold leading-tight text-ink dark:text-cream sm:text-6xl"
            >
              Hi, I&apos;m Dang Truc Mai{" "}
              <span className="inline-block animate-float text-3xl sm:text-5xl">✨</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.04, delayChildren: 0.25 }}
              className="mt-4 flex flex-wrap font-display text-lg font-semibold text-lavender-deep dark:text-mint sm:text-2xl"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mr-2 mt-1 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm font-medium leading-relaxed text-ink-light dark:text-cream/70 sm:text-base"
            >
              Passionate about turning complex operational challenges into dependable, production-ready software. Driven by strong algorithmic foundations, clean architecture, and building impactful data-driven solutions.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-2xl bg-lavender-deep px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:scale-105 hover:bg-lavender-deep/90 hover:shadow-lg dark:bg-mint dark:text-dusk dark:hover:bg-mint/90"
              >
                <FileText size={16} />
                <span>View Resume</span>
                <ExternalLink size={14} className="opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="mailto:trucmai19102006@gmail.com"
                className="group flex items-center gap-2 rounded-2xl border border-lavender-deep/30 bg-white/60 px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:scale-105 hover:bg-white dark:border-moon/30 dark:bg-dusk-card dark:text-cream dark:hover:bg-dusk-card2"
              >
                <Mail size={16} className="text-pink-deep dark:text-moon-soft" />
                <span>Contact Me</span>
              </a>

              <a
                href="https://github.com/trmai-19"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-2xl border border-lavender-deep/30 bg-white/60 px-4 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:scale-105 hover:bg-white dark:border-moon/30 dark:bg-dusk-card dark:text-cream dark:hover:bg-dusk-card2"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  <GithubIcon />
                </span>
                <span>GitHub</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            id="cat-container"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-36 w-36 shrink-0 sm:h-48 sm:w-48"
          >
            <SleepyCat className="h-full w-full" />
          </motion.div>
        </section>

        {/* 2. EDUCATION & BACKGROUND SECTION (TÁCH RIÊNG ĐỘC LẬP) */}
        <section className="mt-14 sm:mt-20 pointer-events-auto">
          <BentoCard
            index={0}
            className="border-lavender-deep/30 bg-lavender/40 dark:border-moon/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(201,184,240,0.25)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-lavender-deep dark:bg-dusk-card2 dark:text-moon">
                <GraduationCap size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink dark:text-cream sm:text-xl">
                  Education & Honors
                </h3>
                <p className="text-xs font-semibold text-lavender-deep dark:text-mint">
                  Academic journey & Competitive programming
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Đại học UIT */}
              <div className="flex flex-col justify-between rounded-3xl border border-lavender-deep/20 bg-white/70 p-4 dark:border-moon/20 dark:bg-dusk-card2/80">
                <div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-lavender-deep dark:text-moon" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-lavender-deep dark:text-mint">
                      University
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-bold text-ink dark:text-cream">
                    VNU-HCM UIT
                  </h4>
                  <p className="mt-1 text-xs font-medium text-ink-light dark:text-cream/70">
                    Bachelor of Management Information Systems
                  </p>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 rounded-xl bg-lavender/50 px-2.5 py-1 text-xs font-bold text-lavender-deep dark:bg-moon/20 dark:text-moon">
                  <span>CGPA: 8.3 / 10.0</span>
                  <span className="text-[10px] font-normal opacity-80">(2024 - Present)</span>
                </div>
              </div>

              {/* THPT Chuyên */}
              <div className="flex flex-col justify-between rounded-3xl border border-lavender-deep/20 bg-white/70 p-4 dark:border-moon/20 dark:bg-dusk-card2/80">
                <div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-pink-deep dark:text-moon-soft" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-pink-deep dark:text-moon-soft">
                      High School
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-bold text-ink dark:text-cream">
                    Nguyen Chi Thanh Gifted High School
                  </h4>
                  <p className="mt-1 text-xs font-medium text-ink-light dark:text-cream/70">
                    Class of Informatics, Lam Dong
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-ink-light dark:text-cream/60">
                  Sep 2021 - May 2024
                </div>
              </div>

              {/* Thành tích giải thuật */}
              <div className="flex flex-col justify-between rounded-3xl border border-lavender-deep/20 bg-white/70 p-4 dark:border-moon/20 dark:bg-dusk-card2/80">
                <div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-peach-deep dark:text-peach" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-peach-deep dark:text-peach">
                      Competitions
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-bold text-ink dark:text-cream">
                    Competitive Programming
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs font-medium text-ink-light dark:text-cream/70">
                    <li>• <b>2nd Prize</b> ICPC Vietnam National 2023</li>
                    <li>• <b>3rd Prize</b> ICPC Asia Hue Regional 2023</li>
                    <li>• Participant VOI 2024</li>
                  </ul>
                </div>
              </div>
            </div>
          </BentoCard>
        </section>

        {/* 3. PROFILE AVATAR + TECH STACK (CẶP ĐÔI CÂN XỨNG HOÀN TOÀN) */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch pointer-events-auto">
          {/* Cột 1: Profile Avatar (Cùng chiều cao 100% với thẻ Tech Stack) */}
          <div className="flex w-full lg:col-span-5">
            <BentoCard
              index={1}
              className="group relative flex h-full min-h-[380px] w-full overflow-hidden items-center justify-center !p-0 border-2 border-lavender-deep/50 bg-white/40 shadow-soft dark:border-moon/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(201,184,240,0.3)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-light.jpg"
                alt="Dang Truc Mai"
                className="absolute inset-0 z-10 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 dark:hidden"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-dark.jpg"
                alt="Dang Truc Mai"
                className="absolute inset-0 z-10 hidden h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 dark:block"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Placeholder */}
              <div className="relative z-0 flex flex-col items-center gap-3 p-6 text-center text-ink-light dark:text-cream/70">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-deep/20 dark:bg-moon/10">
                  <ImagePlus size={26} />
                </div>
                <p className="font-display text-sm font-bold text-ink dark:text-cream">
                  Dang Truc Mai
                </p>
                <p className="max-w-[200px] text-xs font-semibold">
                  Lưu 2 file <b>avatar-light.jpg</b> và <b>avatar-dark.jpg</b> vào thư mục public!
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Cột 2: Technical Stack */}
          <div className="flex w-full flex-col lg:col-span-7">
            <BentoCard
              index={2}
              className="flex h-full flex-col justify-between border-pink-deep/30 bg-pink/40 dark:border-moon-soft/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(245,201,222,0.25)]"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-pink-deep dark:bg-dusk-card2 dark:text-moon-soft">
                    <Code size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink dark:text-cream sm:text-xl">
                      Technical Stack & Skills
                    </h3>
                    <p className="text-xs font-semibold text-pink-deep dark:text-moon-soft">
                      Core languages, frameworks & system tools
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4 text-xs font-semibold text-ink-light dark:text-cream/80 sm:text-sm">
                  {/* Languages */}
                  <div className="rounded-2xl border border-pink-deep/15 bg-white/60 p-3.5 dark:border-moon-soft/15 dark:bg-dusk-card2/70">
                    <div className="flex items-center gap-2 text-ink dark:text-cream">
                      <Code size={15} className="text-peach-deep dark:text-peach" />
                      <span className="font-bold">Programming Languages</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Java", "C++", "Python", "SQL", "TypeScript", "JavaScript"].map((item) => (
                        <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-xs dark:bg-dusk-card dark:text-cream">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div className="rounded-2xl border border-pink-deep/15 bg-white/60 p-3.5 dark:border-moon-soft/15 dark:bg-dusk-card2/70">
                    <div className="flex items-center gap-2 text-ink dark:text-cream">
                      <Server size={15} className="text-lavender-deep dark:text-moon" />
                      <span className="font-bold">Backend & Architecture</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Spring Boot", "Spring Security", "Spring Data JPA / Hibernate", "RESTful APIs", "JWT & RBAC"].map((item) => (
                        <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-xs dark:bg-dusk-card dark:text-cream">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Databases & Tools */}
                  <div className="rounded-2xl border border-pink-deep/15 bg-white/60 p-3.5 dark:border-moon-soft/15 dark:bg-dusk-card2/70">
                    <div className="flex items-center gap-2 text-ink dark:text-cream">
                      <Database size={15} className="text-mint-deep dark:text-mint" />
                      <span className="font-bold">Databases, DevOps & Frontend</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Oracle DB", "SQLite", "Docker", "Git", "React", "Electron", "JavaFX"].map((item) => (
                        <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-xs dark:bg-dusk-card dark:text-cream">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 text-xs font-medium text-ink-light/80 dark:text-cream/60">
                Focus: High-concurrency backend design, transaction reliability & clean RESTful API standards.
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 4. FEATURED PROJECTS SECTION (RỘNG RÃI, CHUYÊN NGHIỆP) */}
        <section className="mt-14 sm:mt-20 pointer-events-auto">
          <BentoCard
            index={3}
            className="border-mint-deep/30 bg-mint/40 dark:border-mint/40 dark:bg-dusk-card dark:!shadow-[0_0_25px_rgba(186,236,211,0.25)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-mint-deep dark:bg-dusk-card2 dark:text-mint">
                  <Layers size={20} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink dark:text-cream sm:text-xl">
                    Featured Projects
                  </h3>
                  <p className="text-xs font-semibold text-mint-deep dark:text-mint">
                    Production deployments & Leadership experience
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-mint-deep/30 bg-white/80 px-3 py-1 text-xs font-bold text-mint-deep dark:border-mint/30 dark:bg-dusk-card2 dark:text-mint">
                2 Major Works
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Project 1: OptiCare */}
              <div className="flex flex-col justify-between rounded-3xl border border-mint-deep/20 bg-white/70 p-5 transition-all duration-300 hover:bg-white/95 hover:shadow-soft dark:border-mint/20 dark:bg-dusk-card2/80 dark:hover:bg-dusk-card2">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-ink dark:text-cream">
                      OptiCare — Eye Clinic System
                    </h4>
                    <span className="shrink-0 rounded-md bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                      Solo Commercial
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs font-medium leading-relaxed text-ink-light dark:text-cream/70 sm:text-sm">
                    Engineered a layered RESTful backend with <b>70+ endpoints</b> across sales/POS, inventory, and reporting. Migrated <b>2,000+ real customer profiles</b>, 1,700+ inventory items, and successfully ran a 2-week clinic UAT.
                  </p>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["Java", "Spring Boot", "React", "Electron", "SQLite", "Gemini API"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-mint/50 px-2.5 py-0.5 text-[11px] font-semibold text-mint-deep dark:bg-mint/15 dark:text-mint"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://github.com/trmai-19/opticare-management-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-lavender-deep hover:underline dark:text-mint"
                >
                  <span>View Repository & Documentation</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Project 2: Pharmacy Management */}
              <div className="flex flex-col justify-between rounded-3xl border border-mint-deep/20 bg-white/70 p-5 transition-all duration-300 hover:bg-white/95 hover:shadow-soft dark:border-mint/20 dark:bg-dusk-card2/80 dark:hover:bg-dusk-card2">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-ink dark:text-cream">
                      Pharmacy Management System
                    </h4>
                    <span className="shrink-0 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      Tech Lead (Team 4)
                    </span>
                  </div>

                  <p className="mt-2.5 text-xs font-medium leading-relaxed text-ink-light dark:text-cream/70 sm:text-sm">
                    Led a 4-person team to construct the full application. Designed Spring Boot backend architecture, JavaFX UI, and Oracle DB with complex <b>PL/SQL triggers & stored procedures</b> for data integrity.
                  </p>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {["Java", "Spring Boot", "JavaFX", "Oracle DB", "Docker", "PL/SQL"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-lavender/50 px-2.5 py-0.5 text-[11px] font-semibold text-lavender-deep dark:bg-moon/15 dark:text-moon"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://github.com/trmai-19/Pharmacy-Management-System"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-lavender-deep hover:underline dark:text-mint"
                >
                  <span>View Repository & Documentation</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </BentoCard>
        </section>

        {/* 5. DẢI CHỮ CHẠY (GIỮ NGUYÊN) */}
        <div className="mt-20 sm:mt-28">
          <Marquee />
        </div>

        {/* 6. CONNECT SECTION */}
        <section className="mt-16 flex flex-col items-center gap-8 text-center sm:mt-20 pointer-events-auto">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink dark:text-cream sm:text-3xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-2 text-sm font-semibold text-ink-light dark:text-cream/70 sm:text-base">
              Open for Software Engineering, Backend Development & Data Science Internship roles. Let&apos;s build something impactful together!
            </p>
            <p className="mt-1 text-xs font-medium text-lavender-deep dark:text-mint">
              trucmai19102006@gmail.com • Ho Chi Minh City
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <MagneticButton
              href="mailto:trucmai19102006@gmail.com"
              label="Email"
              colorClass="border-mint-deep/30 bg-mint/60 text-mint-deep dark:border-dusk-border dark:bg-dusk-card dark:text-mint"
            >
              <MailIcon />
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
              colorClass="border-lavender-deep/30 bg-lavender/60 text-lavender-deep dark:border-dusk-border dark:bg-dusk-card dark:text-moon"
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
            <MagneticButton
              href="https://www.facebook.com/dt.mai.1910/"
              label="Facebook"
              colorClass="border-lavender-deep/30 bg-lavender/60 text-lavender-deep dark:border-dusk-border dark:bg-dusk-card dark:text-moon"
            >
              <FacebookIcon />
            </MagneticButton>
          </div>
        </section>
      </div>
    </main>
  );
}
