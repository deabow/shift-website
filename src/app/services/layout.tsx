import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا | Services",
  description:
    "خدمات حضور المتكاملة — إنتاج إعلامي، تصميم جرافيكي، تسويق رقمي، تطوير مواقع، وإدارة سوشيال ميديا.",
  openGraph: {
    title: "خدماتنا | Hodour حضور",
    description:
      "خمس خدمات متكاملة تبني لك حضور حقيقي في السوق المصري.",
  },
  twitter: {
    title: "خدماتنا | Hodour حضور",
    description:
      "خمس خدمات متكاملة تبني لك حضور حقيقي في السوق المصري.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
