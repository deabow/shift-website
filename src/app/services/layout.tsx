import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SHIFT delivers full-stack web engineering, mobile apps, enterprise systems, and cybersecurity. Custom solutions built with Next.js, Flutter, React Native, and secure-by-design architecture.",
  openGraph: {
    title: "Services | SHIFT Agency",
    description:
      "Gravity-defying digital solutions — web, mobile, enterprise, and cybersecurity.",
  },
  twitter: {
    title: "Services | SHIFT Agency",
    description:
      "Gravity-defying digital solutions — web, mobile, enterprise, and cybersecurity.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
