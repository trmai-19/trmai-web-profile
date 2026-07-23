import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trmai ^^ — Sleepy Corner",
  description: "Code - Sleep - Music - System - Data and him <3",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
