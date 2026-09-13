"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0B0B0C]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.05),transparent_70%)]" />

      {/* ── Header ── */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.about.badge}</span>
        </div>

        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-[#F2D3B1] md:text-5xl lg:text-6xl leading-[1.1] font-changa">
          {t.about.title}{" "}
          <span className="text-[#9F0F1F]">{t.about.titleAccent}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#F2D3B1]/55 md:text-lg font-tajawal">
          {t.about.description}
        </p>

        {/* Mission card */}
        <div className="mt-10 w-full max-w-3xl rounded-3xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/[0.04] p-8 backdrop-blur-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9F0F1F] font-changa">
            {language === "ar" ? "رسالتنا" : "Our Mission"}
          </p>
          <p className="mt-3 text-lg font-bold leading-relaxed text-[#F2D3B1] md:text-xl font-tajawal">
            &ldquo;{t.about.mission}&rdquo;
          </p>
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className="mx-auto mt-20 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#9F0F1F]/40 to-transparent" />

      {/* ── Why Hodour ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16"
      >
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9F0F1F] font-changa">
            {pillars.title}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F2D3B1] md:text-4xl font-changa">
            {pillars.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.items.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              className="group relative rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-7 flex flex-col transition-all duration-500 hover:border-[#9F0F1F]/30 hover:shadow-[0_0_40px_rgba(159,15,31,0.08)]"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-xl font-bold text-[#9F0F1F]/30 group-hover:text-[#9F0F1F] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>

              <h3 className="text-xl font-extrabold tracking-tight text-[#F2D3B1] group-hover:text-white transition-colors font-changa">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F2D3B1]/50 font-tajawal">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 flex flex-col items-center gap-6 rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-8 text-center relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)]" />

        <div className="relative z-10">
          <p className="text-xl font-extrabold text-[#F2D3B1] md:text-2xl font-changa">
            {language === "ar"
              ? "جاهز تبني حضورك في السوق؟"
              : "Ready to build your market presence?"}
          </p>
          <p className="mt-1 text-sm text-[#F2D3B1]/50 font-tajawal">
            {language === "ar"
              ? "كلمنا وهنبدأ نرسملك خطة تسويق تناسب مشروعك."
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
          className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-[#9F0F1F] px-7 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] transition hover:shadow-[0_0_35px_rgba(159,15,31,0.4)]"
        >
          <span>{t.cta.talkToUs}</span>
          <Arrow className="w-4 h-4 text-[#F2D3B1]" />
        </a>
      </motion.div>
    </main>
  );
}
