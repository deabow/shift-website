import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أعمالنا | Portfolio",
  description:
    "نماذج من أعمال حضور — تصوير، تصميم، تسويق، ومواقع إلكترونية.",
  openGraph: {
    title: "أعمالنا | Hodour حضور",
    description:
      "نماذج من شغلنا اللي بيتكلم عن نفسه.",
  },
  twitter: {
    title: "أعمالنا | Hodour حضور",
    description:
      "نماذج من شغلنا اللي بيتكلم عن نفسه.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
