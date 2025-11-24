import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethon | Air-Gapped AI for Critical Institutions",
  description: "Private, offline AI systems powered by Ollama, ChromaDB, and air-gapped infrastructure. Secure AI for governments, healthcare, and financial institutions.",
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

