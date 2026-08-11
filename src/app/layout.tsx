import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

// ── Heavy client components loaded lazily (reduces initial JS bundle) ──
const CustomCursor = dynamic(
  () => import("@/components/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const ParticlesBackground = dynamic(
  () =>
    import("@/components/particles-background").then(
      (m) => m.ParticlesBackground
    ),
  { ssr: false }
);
const ChatFab = dynamic(
  () => import("@/components/chat-fab").then((m) => m.ChatFab),
  { ssr: false }
);

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
  const cookieStore = cookies();
  const savedLang = cookieStore.get("language")?.value;
  const initialLanguage = savedLang === "ar" ? "ar" : "en";
  const savedTheme = cookieStore.get("theme")?.value;
  const initialTheme = savedTheme === "light" ? "light" : "dark";
  const dir = initialLanguage === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLanguage} dir={dir} className={initialTheme}>
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        <ThemeProvider initialTheme={initialTheme}>
          <LanguageProvider initialLanguage={initialLanguage}>
            <CustomCursor />
            <ParticlesBackground />
            <SiteNavbar />
            {children}
            <SiteFooter />
            <ChatFab />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
