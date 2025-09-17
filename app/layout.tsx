import type React from "react";
import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/components.css";
import "../styles/layout.css";
import "../styles/pages.css";
import "../styles/auth.css";
import "../styles/additional-pages.css";
import "../styles/app/auth/page.css";

export const metadata: Metadata = {
  title: "QuickBite - Digital Menu & Ordering",
  description: "Order delicious food in seconds with our digital menu system",
  generator: "Prakash Raj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Open+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}