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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="talentapp:project_verification" content="d4a72751b5be8207991d7ff498ebedf7e21d75b6a28f33dd03d6127a18fb8b249576f010ba3c89716444b8030bc21a93fe8c07fd8dabb43853695c3477d1cea3" />
      </head>
      <body>{children}</body>
    </html>
  );
}
