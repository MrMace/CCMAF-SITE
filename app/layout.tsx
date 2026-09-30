import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-barlow" });

export const metadata: Metadata = {
  title: "Circle City Martial Arts & Fitness | Indianapolis",
  description:
    "Indianapolis martial arts gym: 10th Planet Jiu Jitsu, Gi Jiu Jitsu, kickboxing, boxing and kids classes. Your first class is free.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
