import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aethon - AI Automation Platform",
  description: "Transform your business with AI agents that work 24/7. Scout, Eve, and Shadow automate your sales, customer service, and operations.",
  keywords: ["AI automation", "AI agents", "business automation", "lead generation", "customer service", "workflow automation"],
  authors: [{ name: "Aethon Team" }],
  openGraph: {
    title: "Aethon - AI Automation Platform",
    description: "Transform your business with AI agents that work 24/7",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
