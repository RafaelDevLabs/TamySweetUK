import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

import AppShell from "@/components/AppShell";
import { createSeoMetadata, DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE, getSiteUrl } from "@/lib/seo/metadata";

import "./globals.css";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  ...createSeoMetadata({
    title: DEFAULT_SEO_TITLE,
    description: DEFAULT_SEO_DESCRIPTION,
    path: "/",
  }),
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: "/design/brand-mark-minimal.svg",
  },
  title: {
    default: DEFAULT_SEO_TITLE,
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
