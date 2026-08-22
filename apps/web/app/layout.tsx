import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canvas",
  description: "Collaborative drawing board",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Oswald:wght@400;700;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/canvas.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
