import type { Metadata } from "next";

import AppShell from "@/components/AppShell";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TamysweetUK",
    template: "%s | TamysweetUK",
  },
  description:
    "Family-raised kittens in the UK, cared for with love from day one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body className="shell">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
