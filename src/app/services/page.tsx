"use client";


import {
  AppWindowMac,
  ShieldCheck,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Custom Web Development",
      description:
        "High-end web platforms with Next.js, enterprise-grade performance tuning, and technical SEO architecture.",
      icon: AppWindowMac,
      points: ["Next.js App Router", "Core Web Vitals", "SEO-first structure"],
    },
    {
      title: "Mobile App Solutions",
      description:
        "Cross-platform mobile delivery using Flutter or React Native with production-ready API integration.",
      icon: Smartphone,
      points: [
        "Flutter / React Native",
        "Shared business logic",
        "Store deployment support",
      ],
    },
    {
      title: "Enterprise Systems",
      description:
        "Custom ERP workflows, management dashboards, and scalable internal tooling built for operational clarity.",
      icon: Workflow,
      points: ["Custom ERP modules", "Role-based dashboards", "Automated reporting"],
    },
    {
      title: "Cybersecurity & Pentesting",
      description:
        "Secure coding standards and vulnerability assessment pipelines to reduce risk before and after launch.",
      icon: ShieldCheck,
      points: ["Secure SDLC", "Vulnerability scanning", "Pentest remediation"],
    },
  ];

  return (
    <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-16 pt-10 md:px-8">
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_10px_55px_rgb(0,0,0,0.5)] backdrop-blur-sm md:p-14">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
          Services
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Technical power for high-growth digital products.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
          SHIFT delivers full-stack engineering, mobile execution, enterprise
          systems, and security depth for ambitious teams that need speed
          without compromise.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const ServiceIcon = service.icon as LucideIcon;
            return (
            <article
              key={service.title}
              className="group rounded-2xl border border-[#8B5CF6]/45 bg-white/[0.04] p-6 shadow-[0_14px_40px_rgb(0,0,0,0.45)] backdrop-blur-md transition hover:border-[#8B5CF6]/75 hover:shadow-[0_18px_55px_rgba(139,92,246,0.22)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-xl border border-[#8B5CF6]/60 bg-[#8B5CF6]/15 p-2.5 text-[#C4B5FD]">
                  <ServiceIcon size={19} />
                </div>
                <a
                  href="https://wa.me/201211050297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#7C3AED]"
                >
                  Get Started
                </a>
              </div>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="text-sm text-zinc-200/95">
                    <span className="mr-2 text-[#8B5CF6]">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
