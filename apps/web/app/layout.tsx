import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://stxcanvas.xyz";

export const metadata: Metadata = {
  title: "The Million STX Grid",
  description:
    "A 100×100 collaborative pixel canvas living on the Stacks blockchain. Every pixel is a mainnet transaction.",
  openGraph: {
    title: "The Million STX Grid",
    description: "r/place on Bitcoin. Every pixel is a real transaction.",
    url: appUrl,
    images: [{ url: `${appUrl}/api/og`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Million STX Grid",
    description: "r/place on Bitcoin. Every pixel is a real transaction.",
    images: [`${appUrl}/api/og`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
