import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatFab } from "@/components/chat-fab";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHIFT | Antigravity Digital Agency",
  description:
    "SHIFT crafts futuristic, high-performance digital experiences with a security-first mindset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <SiteNavbar />
        {children}
        <SiteFooter />
        <ChatFab />
      </body>
    </html>
  );
}
