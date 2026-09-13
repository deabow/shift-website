"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  Camera,
  Palette,
  TrendingUp,
  Globe,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

const serviceKeys = [
  "mediaProduction",
  "graphicDesign",
  "digitalMarketing",
  "webDevelopment",
  "socialMediaManagement",
] as const;

const serviceIcons: LucideIcon[] = [Camera, Palette, TrendingUp, Globe, Users];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ServiceCard({
  icon: Icon,
  index,
  title,
  desc,
  bullets,
  whatsappText,
  language,
}: {
  icon: LucideIcon;
  index: number;
  title: string;
  desc: string;
  bullets: string[];
  whatsappText: string;
  language: string;
}) {
  const Arrow = language === "ar" ? ArrowLeft : ArrowRight;
  const href = `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] transition-all duration-500 hover:border-[#9F0F1F]/30 hover:shadow-[0_0_40px_rgba(159,15,31,0.1)]"
    >
      <div className="relative h-full w-full p-7 md:p-9 flex flex-col justify-between overflow-hidden">
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(242,211,177,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(242,211,177,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10" />

        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-2xl md:text-3xl font-black text-[#9F0F1F]/30 group-hover:text-[#9F0F1F] transition-colors duration-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F] transition-all duration-300 group-hover:border-[#9F0F1F]/40 group-hover:shadow-[0_0_20px_rgba(159,15,31,0.2)]">
              <Icon size={18} strokeWidth={1.8} />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-[#F2D3B1] group-hover:text-white transition-colors mb-3 font-changa">
            {title}
          </h2>

          <p className="text-sm leading-relaxed text-[#F2D3B1]/50 font-tajawal mb-6">
            {desc}
          </p>

          <ul className="space-y-3 mb-8">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2.5 text-xs md:text-sm text-[#F2D3B1]/70"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#9F0F1F]" />
                <span className="font-tajawal">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-[#F2D3B1]/[0.06] flex items-center justify-between">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F]/10 border border-[#9F0F1F]/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#9F0F1F] transition-all duration-300 hover:bg-[#9F0F1F] hover:text-[#F2D3B1] hover:shadow-[0_0_25px_rgba(159,15,31,0.3)]"
          >
            <span>
              {language === "ar" ? "استشارة على واتساب" : "Consult via WhatsApp"}
            </span>
            <Arrow size={13} />
          </a>
          <div className="w-2 h-2 rounded-full bg-[#9F0F1F]/30 group-hover:bg-[#9F0F1F] group-hover:shadow-[0_0_10px_#9F0F1F] transition-all" />
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#9F0F1F]/[0.04] blur-[200px]" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.services.title}</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#F2D3B1] md:text-5xl lg:text-6xl leading-[1.1] font-changa">
          {language === "ar" ? (
            <>
              خمس خدمات.{" "}
              <span className="text-[#9F0F1F]">حضور متكامل.</span>
            </>
          ) : (
            <>
              Five services.{" "}
              <span className="text-[#9F0F1F]">Complete presence.</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F2D3B1]/50 md:text-lg font-tajawal">
          {t.services.subtitle}
        </p>
        <div className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#9F0F1F]/50 to-transparent" />
      </motion.header>

      {/* Service Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {serviceKeys.map((key, idx) => {
          const service = t.services.items[key];
          const whatsappText =
            language === "ar"
              ? `أهلاً حضور، أنا مهتم بخدمة ${service.title}. ممكن نتكلم؟`
              : `Hello Hodour, I'm interested in ${service.title}. Can we talk?`;
          return (
            <ServiceCard
              key={key}
              icon={serviceIcons[idx]}
              index={idx}
              title={service.title}
              desc={service.desc}
              bullets={service.bullets}
              whatsappText={whatsappText}
              language={language}
            />
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-8 text-center sm:flex-row sm:justify-between sm:text-start relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)]" />

        <div className="relative z-10 flex flex-col">
          <p className="text-xl font-bold text-[#F2D3B1] md:text-2xl font-changa">
            {t.cta.notSure}
          </p>
          <p className="mt-1 text-sm text-[#F2D3B1]/50 font-tajawal">
            {t.cta.notSureDesc}
          </p>
        </div>

        <a
          href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
            language === "ar"
              ? "أهلاً حضور، محتاج مساعدة في اختيار الخدمة المناسبة ليا."
              : "Hello Hodour, I need help choosing the right service for my project."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] transition hover:shadow-[0_0_35px_rgba(159,15,31,0.4)]"
        >
          <span>{t.cta.talkToUs}</span>
          <Arrow className="w-4 h-4 text-[#F2D3B1]" />
        </a>
      </motion.div>
    </main>
  );
}
