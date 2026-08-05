function MarqueeGroup({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="mx-6 whitespace-nowrap font-display text-5xl font-extrabold text-lavender-deep/25 dark:text-moon/10 sm:text-7xl"
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const words = [
    "Software Engineering",
    "Backend Systems",
    "Algorithms",
    "Data Science",
    "System Architecture",
  ];
  const text = words.join("   •   ") + "   •  ";

  return (
    <div
      className="relative w-full overflow-hidden py-6 sm:py-10"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeGroup text={text} />
        <MarqueeGroup text={text} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent dark:from-dusk sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent dark:from-dusk sm:w-32" />
    </div>
  );
}
