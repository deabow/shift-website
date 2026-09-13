import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | About",
  description:
    "حضور شركة إعلانات وتسويق متكاملة في مصر. بنساعدك تتشاف صح في السوق المصري.",
  openGraph: {
    title: "من نحن | Hodour حضور",
    description:
      "حضور مش مجرد اسم. هو وعد بحضور حقيقي في السوق.",
  },
  twitter: {
    title: "من نحن | Hodour حضور",
    description:
      "حضور مش مجرد اسم. هو وعد بحضور حقيقي في السوق.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
