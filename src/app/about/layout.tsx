import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "SHIFT builds digital growth engines — not just websites. Security-first engineering, future-stack technology, and Arabic-first mindset.",
  openGraph: {
    title: "About | SHIFT Agency",
    description:
      "We build digital growth engines — security-first, performance-obsessed, Arabic-first.",
  },
  twitter: {
    title: "About | SHIFT Agency",
    description:
      "We build digital growth engines — security-first, performance-obsessed, Arabic-first.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
