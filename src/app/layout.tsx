import type { Metadata } from "next";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

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
  const initialLanguage = savedLang === "en" ? "en" : "ar";
  const dir = initialLanguage === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLanguage} dir={dir}>
      <body className="bg-[#0B0B0C] text-[#F2D3B1] antialiased">
        <LanguageProvider initialLanguage={initialLanguage}>
          <SiteNavbar />
          {children}
          <SiteFooter />
          <WhatsAppFab />
        </LanguageProvider>
      </body>
    </html>
  );
}
