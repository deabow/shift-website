import type { Metadata } from "next";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Alexandria } from "next/font/google";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
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

const BASE_URL = "https://hodour.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "حضور | Hodour — شركة إعلانات وتسويق متكاملة",
    template: "%s | Hodour حضور",
  },
  description:
    "حضور — شركة إعلانات وتسويق متكاملة في مصر. إنتاج إعلامي، تصميم جرافيكي، تسويق رقمي، تطوير مواقع، وإدارة سوشيال ميديا.",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "Hodour حضور",
    url: BASE_URL,
    title: "حضور | Hodour — شركة إعلانات وتسويق متكاملة",
    description:
      "إنتاج إعلامي، تصميم جرافيكي، تسويق رقمي، تطوير مواقع، وإدارة سوشيال ميديا — كل اللي محتاجه عشان يكون ليك حضور حقيقي في السوق.",
  },
  twitter: {
    card: "summary_large_image",
    title: "حضور | Hodour — شركة إعلانات وتسويق متكاملة",
    description:
      "إنتاج إعلامي، تصميم جرافيكي، تسويق رقمي، تطوير مواقع، وإدارة سوشيال ميديا.",
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
            <SiteNavbar />
            {children}
            <SiteFooter />
            <WhatsAppFab />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
