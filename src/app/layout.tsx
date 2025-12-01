import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethon | Air-Gapped AI for Critical Institutions",
  description: "The infrastructure platform for AI agencies. Build custom agents for your clients in 2-3 days. Own the code, own the relationship, own 80%+ margins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



