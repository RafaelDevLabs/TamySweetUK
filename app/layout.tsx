import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

import AppShell from "@/components/AppShell";
import { createSeoMetadata, getSiteUrl } from "@/lib/seo/metadata";

import "./globals.css";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  ...createSeoMetadata({
    title: "TamysweetUK",
    description: "Family-raised kittens in the UK, cared for with love from day one.",
    path: "/",
  }),
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: "/design/brand-mark-minimal.svg",
  },
  title: {
    default: "TamysweetUK",
    template: "%s | TamysweetUK",
  },
  applicationName: "TamysweetUK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body className={`shell ${playfairDisplay.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
