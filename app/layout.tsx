import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { IoChatbubblesSharp } from "react-icons/io5";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalika Manavgyan Secondary School",
  description: "Kalika Manavgyan Secondary School",
  icons: {
    icon: "/logo.png", // This will use logo.png from the public folder as favicon
    apple: "/logo.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Toaster />
        {/* Floating Chat Button */}
        <Link
          href="/chat"
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-50 flex items-center gap-2"
          aria-label="Open Chat"
        >
          <IoChatbubblesSharp size={24} />
          <span className="hidden sm:inline">Chat with Kalika</span>
        </Link>
      </body>
    </html>
  );
}
