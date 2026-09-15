import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Alexandria } from "next/font/google";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

// ── Lazy-loaded client components ──
const WhatsAppFab = dynamic(
  () => import("@/components/whatsapp-fab").then((m) => m.WhatsAppFab),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);

const ChatFab = dynamic(
  () => import("@/components/chat-fab").then((m) => m.ChatFab),
  { ssr: false }
);

const BASE_URL = "https://hodour.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2D3B1" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "حضور | Hodour — شركة إعلانات وتسويق متكاملة وإنتاج إعلامي",
    template: "%s | Hodour حضور",
  },
  description:
    "حضور (Hodour) — شركة إعلانات وتسويق متكاملة وإنتاج إعلامي وسينمائي في مصر. نقدم خدمات الإنتاج السينمائي، تصوير الدرون 4K، تصميم الهوية البصرية، الحملات الإعلانية الممولة، وتطوير المواقع والمنصات الرقمية.",
  keywords: [
    "شركة تسويق في مصر",
    "شركة إعلانات مصر",
    "إنتاج إعلامي وسينمائي",
    "تصوير بالدرون",
    "تصميم هوية بصرية",
    "حملات إعلانية ممولة",
    "تطوير مواقع وتطبيقات",
    "تسويق رقمي في مصر",
    "سوشيال ميديا",
    "شركة دعاية وإعلان",
    "Hodour Agency",
    "Marketing Agency Egypt",
    "Media Production Egypt",
    "Digital Marketing Cairo",
    "Web Development Egypt"
  ],
  authors: [{ name: "حضور | Hodour Agency", url: BASE_URL }],
  creator: "Hodour Agency",
  publisher: "Hodour Agency",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    siteName: "Hodour حضور",
    url: BASE_URL,
    title: "حضور | Hodour — شركة إعلانات وتسويق متكاملة وإنتاج إعلامي",
    description:
      "إنتاج إعلامي وسينمائي، تصميم جرافيكي وهوية بصرية، تسويق رقمي وإعلانات ممولة، تطوير مواقع وتطبيقات — كل ما تحتاجه لصناعة حضور حقيقي ومؤثر في السوق.",
    images: [
      {
        url: "/portfolio-media/kamal-abou-ali-law-video-cover.jpeg",
        width: 1200,
        height: 630,
        alt: "حضور | Hodour Marketing & Advertising Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حضور | Hodour — شركة إعلانات وتسويق متكاملة",
    description:
      "إنتاج إعلامي، تصميم جرافيكي، تسويق رقمي، تطوير مواقع، وإدارة سوشيال ميديا.",
    images: ["/portfolio-media/kamal-abou-ali-law-video-cover.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Marketing & Advertising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const savedLang = cookieStore.get("language")?.value;
  const savedTheme = cookieStore.get("hodour-theme")?.value as "dark" | "light" | undefined;
  const initialLanguage = savedLang === "en" ? "en" : "ar";
  const initialTheme = savedTheme === "dark" ? "dark" : "light";
  const dir = initialLanguage === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLanguage} dir={dir} className={initialTheme} data-theme={initialTheme} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('hodour-theme') || 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${alexandria.variable} ${alexandria.className} font-alexandria bg-theme-bg text-theme-primary antialiased min-h-screen transition-colors duration-300`}>
        <ThemeProvider initialTheme={initialTheme}>
          <LanguageProvider initialLanguage={initialLanguage}>
            <ScrollProgress />
            <CustomCursor />
            <SiteNavbar />
            {children}
            <SiteFooter />
            <WhatsAppFab />
            <ChatFab />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
