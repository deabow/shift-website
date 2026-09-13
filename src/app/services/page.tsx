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
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-theme-border bg-theme-card shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#9F0F1F]/40 hover:-translate-y-1"
    >
      <div className="relative h-full w-full p-7 md:p-8 flex flex-col justify-between">
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-2xl md:text-3xl font-black text-[#9F0F1F]/35 group-hover:text-[#9F0F1F] transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/10 text-[#9F0F1F] transition-all duration-300 group-hover:bg-[#9F0F1F] group-hover:text-[#F2D3B1] group-hover:shadow-[0_0_20px_rgba(159,15,31,0.3)]">
              <Icon size={19} strokeWidth={2} />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-theme-primary group-hover:text-[#9F0F1F] transition-colors mb-3 font-changa">
            {title}
          </h2>

          <p className="text-sm leading-relaxed text-theme-secondary/80 font-tajawal mb-6">
            {desc}
          </p>

          <ul className="space-y-3 mb-8">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2.5 text-xs md:text-sm text-theme-primary/90"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#9F0F1F]" />
                <span className="font-tajawal">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button with 44px min height & focus state */}
        <div className="pt-6 border-t border-theme-border flex items-center justify-between">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#9F0F1F]/10 border border-[#9F0F1F]/25 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#9F0F1F] transition-all duration-300 hover:bg-[#9F0F1F] hover:text-[#F2D3B1] hover:shadow-[0_0_25px_rgba(159,15,31,0.3)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
          >
            <span className="font-changa">
              {language === "ar" ? "استشارة على واتساب" : "Consult on WhatsApp"}
            </span>
            <Arrow size={14} />
          </a>
          <div className="w-2 h-2 rounded-full bg-[#9F0F1F]/30 group-hover:bg-[#FF4D1A] transition-colors" />
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
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8 bg-theme-bg transition-colors duration-300">
      {/* Dynamic Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#9F0F1F]/[0.05] blur-[180px]" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.services.title}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-changa">
          {language === "ar" ? (
            <>
              خمس خدمات متكاملة.{" "}
              <span className="text-[#9F0F1F]">حضور حقيقي في السوق.</span>
            </>
          ) : (
            <>
              Five services.{" "}
              <span className="text-[#9F0F1F]">Complete presence.</span>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-theme-secondary/80 md:text-lg font-tajawal">
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
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-theme-border bg-theme-card p-8 md:p-10 text-center sm:flex-row sm:justify-between sm:text-start relative overflow-hidden shadow-lg"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)]" />

        <div className="relative z-10 flex flex-col max-w-md">
          <p className="text-xl md:text-2xl font-extrabold text-theme-primary font-changa">
            {t.cta.notSure}
          </p>
          <p className="mt-1 text-sm text-theme-secondary/80 font-tajawal">
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
          className="relative z-10 shrink-0 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#9F0F1F] px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.35)] transition-all hover:bg-[#B91C28] hover:shadow-[0_0_35px_rgba(159,15,31,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
        >
          <span className="font-changa">{t.cta.talkToUs}</span>
          <Arrow className="w-4 h-4 text-[#F2D3B1]" />
        </a>
      </motion.div>
    </main>
  );
}
