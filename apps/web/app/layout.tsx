import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "The Million STX Grid — r/place on Bitcoin",
  description: "A 100x100 collaborative pixel canvas on the Stacks blockchain. Paint pixels, own them forever.",
  openGraph: {
    title: "The Million STX Grid",
    description: "r/place on Bitcoin — paint pixels on a decentralized canvas.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
