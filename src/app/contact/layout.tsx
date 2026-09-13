import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا | Contact",
  description:
    "تواصل مع حضور — ابعتلنا رسالة أو كلمنا على واتساب وهنرد عليك في أقرب وقت.",
  openGraph: {
    title: "تواصل معنا | Hodour حضور",
    description:
      "ابعتلنا رسالة وهنرد عليك في أقرب وقت.",
  },
  twitter: {
    title: "تواصل معنا | Hodour حضور",
    description:
      "ابعتلنا رسالة وهنرد عليك في أقرب وقت.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
