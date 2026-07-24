import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Exclusive SHIFT showcase — every project is a case study in craft. Brand identity, environmental branding, web development, and more.",
  openGraph: {
    title: "Portfolio | SHIFT Agency",
    description:
      "Exclusive SHIFT showcase — brand identity, environmental branding, and digital craft.",
  },
  twitter: {
    title: "Portfolio | SHIFT Agency",
    description:
      "Exclusive SHIFT showcase — brand identity, environmental branding, and digital craft.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
