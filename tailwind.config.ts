import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF0E9", // Hồng đào siêu nhạt
        "cream-deep": "#FCE3D9", // Hồng đào nhạt
        lavender: "#DCCDF6", // Tím pastel đậm đà hơn
        "lavender-deep": "#B59DEB", // Tím sâu hơn
        pink: "#FFCCDE", // Hồng pastel đậm
        "pink-deep": "#FF9EC3",
        mint: "#BAECD3", // Xanh mint đậm hơn xíu
        "mint-deep": "#70D5A8",
        peach: "#FFDBB8",
        "peach-deep": "#FFAA6E",
        ink: "#4A4458",
        "ink-light": "#8A8299",
        dusk: "#131C1A",
        "dusk-card": "#1A2623",
        "dusk-card2": "#22332E",
        "dusk-border": "#2E423C",
        moon: "#C9B8F0",
        "moon-soft": "#F5C9DE",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-24px) translateX(12px)" },
        },
        popin: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        popin: "popin 0.4s ease-out",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(180, 160, 220, 0.4)",
        "soft-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.55)",
        "glow-moon": "0 0 25px rgba(201, 184, 240, 0.2)",
        "glow-moon-soft": "0 0 25px rgba(245, 201, 222, 0.2)",
        "glow-mint": "0 0 25px rgba(186, 236, 211, 0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
