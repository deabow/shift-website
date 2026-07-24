import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatFab } from "@/components/chat-fab";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ParticlesBackground } from "@/components/particles-background";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://shift-agency.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SHIFT | Antigravity Digital Agency",
    template: "%s | SHIFT",
  },
  description:
    "SHIFT crafts futuristic, high-performance digital experiences with a security-first mindset. Web, mobile, enterprise & cybersecurity.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SHIFT Agency",
    url: BASE_URL,
    title: "SHIFT | Antigravity Digital Agency",
    description:
      "Futuristic, high-performance digital experiences — web, mobile, enterprise, and cybersecurity.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIFT | Antigravity Digital Agency",
    description:
      "Futuristic, high-performance digital experiences — web, mobile, enterprise, and cybersecurity.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <LanguageProvider>
          <CustomCursor />
          <ParticlesBackground />
          <SiteNavbar />
          {children}
          <SiteFooter />
          <ChatFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
