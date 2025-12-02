import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethon | Private AI Systems for Builders",
  description:
    "The infrastructure studio for agencies and founders. Build custom AI systems in days, own the code, and keep premium margins.",
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



