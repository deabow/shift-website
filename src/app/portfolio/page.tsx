"use client";

import { BentoPortfolio } from "@/components/bento-portfolio";

export default function PortfolioPage() {
  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-6 md:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0B0B0C]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.04),transparent_70%)]" />

      {/* Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(242,211,177,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(242,211,177,0.006)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Portfolio Showcase */}
      <BentoPortfolio />
    </main>
  );
}
