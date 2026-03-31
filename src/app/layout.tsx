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
  title: "CinePulse!",
  description: "Get the latest news and updates about your favorite movies.",
  keywords: ["movies", "cinema", "news", "updates"],
  authors: [{ name: "CinePulse", url: "https://cinepulse.com" }],
  openGraph: {
    title: "CinePulse!",
    description: "Get the latest news and updates about your favorite movies.",
    url: "https://cinepulse.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
