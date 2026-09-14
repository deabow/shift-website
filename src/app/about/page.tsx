"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { ArrowLeft, ArrowRight, Quote, Sparkles, CheckCircle2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutPage() {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const pillars = t.about.pillars;

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8 bg-theme-bg transition-colors duration-300">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-theme-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.06),transparent_70%)]" />

      {/* ── Header ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.about.badge}</span>
        </div>

        <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-changa">
          {t.about.title}{" "}
          <span className="text-[#9F0F1F]">{t.about.titleAccent}</span>
        </h1>

        <p className="mx-auto mt-6 text-base leading-relaxed text-theme-secondary/80 md:text-xl font-tajawal max-w-3xl">
          {t.about.description}
        </p>

        {/* ── Seamless Integrated Mission Container ── */}
        <div className="relative w-full max-w-3xl mt-8 rounded-3xl border border-theme-border bg-gradient-to-b from-theme-card/60 via-theme-card to-theme-card p-8 md:p-10 shadow-md overflow-hidden text-center">
          {/* Ambient Top Connector Gradient Flow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#9F0F1F] to-transparent" />
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#9F0F1F]/15 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#9F0F1F] text-[#F2D3B1] shadow-[0_0_20px_rgba(159,15,31,0.35)] mb-4">
              <Quote className="w-5 h-5 fill-current" />
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-changa">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A]" />
              <span>{language === "ar" ? "رسالتنا وجوهر وجودنا" : "Our Core Mission"}</span>
            </div>

            <blockquote className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-theme-primary font-tajawal">
              &ldquo;{t.about.mission}&rdquo;
            </blockquote>

            <p className="mt-4 text-xs font-mono text-theme-muted uppercase tracking-wider">
              {language === "ar" ? "حضور — صُنّاع الحضور الحقيقي" : "Hodour — Makers of True Presence"}
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#9F0F1F]/40 to-transparent" />

      {/* ── Why Hodour / Pillars ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16"
      >
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] mb-2 font-changa">
            {pillars.title}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-theme-primary font-changa">
            {pillars.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              className="group relative rounded-3xl border border-theme-border bg-theme-card p-7 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#9F0F1F]/40 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-bold text-[#9F0F1F]/40 group-hover:text-[#9F0F1F] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#9F0F1F]/20 group-hover:bg-[#FF4D1A] transition-colors" />
                </div>

                <h3 className="text-xl font-extrabold tracking-tight text-theme-primary group-hover:text-[#9F0F1F] transition-colors font-changa">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-theme-secondary/80 font-tajawal">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-theme-border flex items-center gap-2 text-xs font-bold text-[#9F0F1F]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-changa">
                  {language === "ar" ? "قيمة أساسية في حضور" : "Core Hodour Value"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Bottom Call To Action ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 flex flex-col items-center gap-6 rounded-3xl border border-theme-border bg-theme-card p-8 md:p-12 text-center relative overflow-hidden shadow-lg"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)]" />

        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-theme-primary font-changa">
            {language === "ar"
              ? "جاهز تبني حضورك في السوق؟"
              : "Ready to build your market presence?"}
          </h2>
          <p className="mt-2 text-sm text-theme-secondary/80 font-tajawal">
            {language === "ar"
              ? "كلمنا وهنبدأ نرسملك خطة تسويق متكاملة تناسب طموح مشروعك."
              : "Talk to us and we'll craft a marketing plan tailored to your project."}
          </p>
        </div>

        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || "201211050297"}?text=${encodeURIComponent(
            language === "ar"
              ? "أهلاً حضور، أنا مهتم بمعرفة المزيد عن خدماتكم."
              : "Hello Hodour, I'd like to learn more about your services."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-8 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.35)] transition-all hover:bg-[#B91C28] hover:shadow-[0_0_35px_rgba(159,15,31,0.5)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
        >
          <span className="font-changa">{t.cta.talkToUs}</span>
          <Arrow className="w-4 h-4 text-[#F2D3B1]" />
        </a>
      </motion.div>
    </main>
  );
}
