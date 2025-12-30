import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethon | AI Voice Infrastructure for Agencies",
  description:
    "Build and sell voice automations 60% cheaper than Retell or Vapi. We handle the tech, you keep the margins. Templates and partnerships for AI agencies.",
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



