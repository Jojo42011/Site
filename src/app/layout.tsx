import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aethon | Build Custom Voice Automations for Agency Owners",
  description:
    "Build or create custom voice automations that sell. Configure however you want on the dashboard. Deploy in minutes, start selling today. Calendar, CRM, and Twilio—all in one dashboard.",
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



