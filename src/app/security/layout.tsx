import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Security isn't an add-on — it's our foundation. SHIFT delivers end-to-end encryption, penetration testing, zero-trust architecture, and compliance-ready systems.",
  openGraph: {
    title: "Security | SHIFT Agency",
    description:
      "End-to-end encryption, proactive pentesting, zero-trust architecture, and compliance-ready systems.",
  },
  twitter: {
    title: "Security | SHIFT Agency",
    description:
      "End-to-end encryption, proactive pentesting, zero-trust architecture, and compliance-ready systems.",
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
