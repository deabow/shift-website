"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Film,
  Palette,
  Globe,
  TrendingUp,
  Building,
  Briefcase,
  Store,
  HeartPulse,
  Laptop,
  Layers,
  Clock,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

interface IndustryOption {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: typeof Building;
}

interface GoalOption {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  icon: typeof Film;
}

interface TimelineOption {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
}

const INDUSTRIES: IndustryOption[] = [
  { id: "real_estate", nameAr: "عقارات وتطوير استثماري", nameEn: "Real Estate & Development", icon: Building },
  { id: "legal", nameAr: "مكاتب محاماة واستشارات", nameEn: "Legal & Professional Services", icon: Briefcase },
  { id: "retail", nameAr: "تجارة، مطاعم وضيافة", nameEn: "Retail, Dining & Hospitality", icon: Store },
  { id: "medical", nameAr: "عيادات ورعاية صحية", nameEn: "Healthcare & Clinics", icon: HeartPulse },
  { id: "tech", nameAr: "شركات ناشئة وتقنية", nameEn: "Startups & Technology", icon: Laptop },
];

const GOALS: GoalOption[] = [
  {
    id: "cinema",
    nameAr: "إنتاج سينمائي وتصوير درون 4K",
    nameEn: "Cinematic Film & 4K Drone",
    descAr: "فيديوهات إعلانية مبهرة وتصوير جوي احترافي",
    descEn: "Commercial brand films & certified drone footage",
    icon: Film,
  },
  {
    id: "identity",
    nameAr: "هوية بصرية وتصميم فاخر",
    nameEn: "Brand Identity & Design",
    descAr: "بناء ثقة وهيبة بصرية تُميزك عن المنافسين",
    descEn: "Complete executive visual guidelines and assets",
    icon: Palette,
  },
  {
    id: "web",
    nameAr: "منصة رقمية وموقع فائق السرعة",
    nameEn: "Next.js High-Speed Platform",
    descAr: "موقع تفاعلي سريع لتحويل الزوار لعملاء موثقين",
    descEn: "Responsive web portal built for high conversion",
    icon: Globe,
  },
  {
    id: "marketing",
    nameAr: "حملات إعلانية ممولة ونمو مبيعات",
    nameEn: "Paid Ads & Data-Driven Growth",
    descAr: "إدارة إعلانات Meta و Google بعائد استثماري واضح",
    descEn: "Targeted campaigns with transparent ROI tracking",
    icon: TrendingUp,
  },
  {
    id: "all_in_one",
    nameAr: "منظومة حضور متكاملة (360°)",
    nameEn: "360° All-in-One Presence",
    descAr: "تصوير + هوية + منصة + حملات مبيعات شاملة",
    descEn: "Full-service package combining all creative disciplines",
    icon: Layers,
  },
];

const TIMELINES: TimelineOption[] = [
  { id: "fast", nameAr: "إطلاق سريع (أسبوعين)", nameEn: "Fast Track (2 Weeks)", descAr: "تركيز مكثف على الأولويات الأكثر تأثيراً", descEn: "Intensive focus on highest-impact deliverables" },
  { id: "standard", nameAr: "تنفيذ قياسي (3 - 4 أسابيع)", nameEn: "Standard (3 - 4 Weeks)", descAr: "خطة متكاملة مع مراجعات دقيقة واختبارات", descEn: "Full execution with iterative reviews & QA" },
  { id: "strategic", nameAr: "مشروع استراتيجي موسع (شهرين+)", nameEn: "Strategic (2+ Months)", descAr: "بناء منصات ضخمة وإنتاج سينمائي متعدد المواقع", descEn: "Multi-location filming & custom enterprise architecture" },
];

export function InteractiveProjectPlanner() {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("real_estate");
  const [selectedGoal, setSelectedGoal] = useState<string>("cinema");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];
  const currentGoal = GOALS.find((g) => g.id === selectedGoal) || GOALS[0];
  const currentTimeline = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[1];

  // Dynamic recommendation logic
  const getRecommendation = () => {
    const indName = language === "ar" ? currentIndustry.nameAr : currentIndustry.nameEn;
    const goalName = language === "ar" ? currentGoal.nameAr : currentGoal.nameEn;
    const timeName = language === "ar" ? currentTimeline.nameAr : currentTimeline.nameEn;

    let packageNameAr = `حزمة الحضور لـ ${currentIndustry.nameAr}`;
    let packageNameEn = `Tailored Presence for ${currentIndustry.nameEn}`;
    let deliverablesAr: string[] = [];
    let deliverablesEn: string[] = [];

    if (selectedGoal === "cinema") {
      packageNameAr = `حزمة الإنتاج السينمائي والتوثيق الجوي 4K — ${currentIndustry.nameAr}`;
      packageNameEn = `4K Drone & Cinema Package — ${currentIndustry.nameEn}`;
      deliverablesAr = [
        "يوم تصوير سينمائي كامل بكاميرات 4K وتصوير درون مرخص",
        "مونتاج وتعديل ألوان سينمائي مخصص (Color Grading)",
        "فيديو رئيسي للترويج + 3 فيديوهات قصيرة مخصصة للريلز والتيك توك",
        "جلسة تصوير فوتوغرافي تجاري احترافي للموقع والفريق",
      ];
      deliverablesEn = [
        "Full-day 4K cinematography & licensed drone flight",
        "Cinematic editing & bespoke master color grading",
        "1 Master showcase film + 3 social cutdowns (Reels/TikTok)",
        "Executive commercial photography session for team & site",
      ];
    } else if (selectedGoal === "web") {
      packageNameAr = `منظومة المنصة الرقمية السريعة — ${currentIndustry.nameAr}`;
      packageNameEn = `Next.js Digital Portal — ${currentIndustry.nameEn}`;
      deliverablesAr = [
        "تصميم وتطوير موقع تفاعلي متقدم بنظام Next.js 14 فائق السرعة",
        "نظام حجز واستقبال طلبات واستشارات مع ربط فوري بالواتساب",
        "تهيئة كاملة لمحركات البحث (SEO) مع دعم اللغتين العربية والإنجليزية",
        "لوحة تحكم إدارية سريعة وسهلة لإدارة المحتوى والعملاء",
      ];
      deliverablesEn = [
        "Bespoke high-performance Next.js 14 web application",
        "Instant consultation booking with seamless WhatsApp webhook",
        "Complete Technical SEO & bilingual Arabic/English structure",
        "Lightweight administrative dashboard for direct content control",
      ];
    } else if (selectedGoal === "identity") {
      packageNameAr = `منظومة الهوية البصرية والمكانة المؤسسية — ${currentIndustry.nameAr}`;
      packageNameEn = `Visual Identity & Executive Branding — ${currentIndustry.nameEn}`;
      deliverablesAr = [
        "تصميم الشعار والهوية البصرية المتكاملة ودليل المعايير (Brand Book)",
        "حزمة قوالب سوشيال ميديا جاهزة للتعديل والنشر اليومي",
        "تصميم المطبوعات الرسمية والكروت والبروفايل التعريفي الفاخر",
        "تنسيق الألوان والخطوط مع جاهزية العرض الرقمي والطباعي",
      ];
      deliverablesEn = [
        "Comprehensive brand identity, logo suite & official Brand Book",
        "Curated editable social media template library for daily posting",
        "Executive corporate print stationery, business cards & company profile",
        "Harmonized typography and color psychology tuned for market trust",
      ];
    } else if (selectedGoal === "marketing") {
      packageNameAr = `حملة التسويق الرقمي ونمو المبيعات — ${currentIndustry.nameAr}`;
      packageNameEn = `Paid Ads & Growth Campaign — ${currentIndustry.nameEn}`;
      deliverablesAr = [
        "استراتيجية واستهداف دقيق للجمهور المهتم على Meta و Google Ads",
        "صناعة وتصميم 12 تصميم وفيديو إعلاني عالي التحويل (High-CTR)",
        "إعداد بيكسل التتبع وتهيئة مسار الشراء وتجميع بيانات العملاء المحتملين",
        "تقارير أداء دورية شفافة لمتابعة تكلفة العميل والعائد الإعلاني",
      ];
      deliverablesEn = [
        "Targeted audience segmentation on Meta & Google Ads platforms",
        "12 high-converting ad creatives & micro-video motion assets",
        "Full conversion pixel tracking & lead capture funnel optimization",
        "Bi-weekly transparent KPI reports analyzing CAC & ROAS",
      ];
    } else {
      packageNameAr = `منظومة الحضور المتكاملة 360° — ${currentIndustry.nameAr}`;
      packageNameEn = `360° Complete Presence Architecture — ${currentIndustry.nameEn}`;
      deliverablesAr = [
        "إنتاج سينمائي وتصوير جوي بالدرون بدقة 4K للمشروعات والمؤسسة",
        "تطوير موقع إلكتروني ومنصة رقمية تفاعلية سريعة",
        "بناء الهوية البصرية الكاملة وتصميمات المنصات",
        "إطلاق وإدارة حملات إعلانية ممولة موجهة لجلب التعاقدات والمبيعات",
      ];
      deliverablesEn = [
        "4K drone cinematography & master commercial video production",
        "Next.js responsive interactive web portal & booking workflow",
        "Complete corporate visual identity & digital branding guidelines",
        "Full-funnel paid advertising campaign driving qualified leads",
      ];
    }

    const whatsappMessage =
      language === "ar"
        ? `أهلاً حضور، استخدمت "مخطط مشروعك التفاعلي" في موقعكم:
- المجال: ${indName}
- الهدف: ${goalName}
- الإطار الزمني: ${timeName}
- الحزمة المقترحة: ${packageNameAr}

حابب أستلم التفاصيل والعرض الفني المخصص لمشروعي.`
        : `Hello Hodour, I used the "Interactive Project Planner" on your website:
- Industry: ${indName}
- Focus: ${goalName}
- Timeline: ${timeName}
- Recommended Plan: ${packageNameEn}

I'd like to receive the tailored proposal for my project.`;

    return {
      packageName: language === "ar" ? packageNameAr : packageNameEn,
      deliverables: language === "ar" ? deliverablesAr : deliverablesEn,
      whatsappUrl: `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`,
    };
  };

  const recommendation = getRecommendation();

  const handleOpenAiChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hodour-open-chat"));
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24" id="project-planner">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-alexandria bg-[#9F0F1F]/[0.08] dark:bg-[#FF4D1A]/10 border border-[#9F0F1F]/20 px-4 py-1.5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D1A] animate-pulse" />
          <span>{language === "ar" ? "تجربة تفاعلية ذكية" : "Smart Interactive Tool"}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-alexandria leading-tight">
          {language === "ar" ? (
            <>
              صمّم حضور مشروعك <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">في 30 ثانية</span>
            </>
          ) : (
            <>
              Plan Your Presence <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">in 30 Seconds</span>
            </>
          )}
        </h2>
        <p className="mt-3 text-sm md:text-base text-theme-secondary/80 font-alexandria">
          {language === "ar"
            ? "اختر نوع نشاطك وأولوياتك لتحصل فوراً على توصية دقيقة ومخرجات عمل واضحة تناسب ميزانيتك وهدفك."
            : "Select your industry and core priority to receive an instant tailored scope and deliverables roadmap."}
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="relative rounded-3xl border border-theme-border bg-theme-card p-6 md:p-12 shadow-xl overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.15),transparent_70%)]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(255,77,26,0.12),transparent_70%)]" />

        {/* Step Indicator Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-theme-border pb-6 mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => {
              const isPassed = step >= s;
              const isCurrent = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (s <= step || step === 4) setStep(s as 1 | 2 | 3 | 4);
                    }}
                    className={`h-8 w-8 md:h-9 md:w-9 rounded-xl flex items-center justify-center font-alexandria text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#9F0F1F] text-[#F2D3B1] shadow-[0_0_15px_rgba(159,15,31,0.4)] scale-105"
                        : isPassed
                        ? "bg-[#9F0F1F]/15 text-[#9F0F1F] dark:text-[#FF4D1A] border border-[#9F0F1F]/30"
                        : "bg-theme-surface text-theme-muted border border-theme-border/60"
                    }`}
                  >
                    {s === 4 ? "✓" : s}
                  </button>
                  {s < 4 && (
                    <div
                      className={`w-6 md:w-10 h-[2px] rounded-full transition-colors ${
                        step > s ? "bg-[#9F0F1F]" : "bg-theme-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-end">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F0F1F] dark:text-[#FF4D1A] font-alexandria">
              {step === 1 && (language === "ar" ? "الخطوة 1: مجال النشاط" : "Step 1: Industry")}
              {step === 2 && (language === "ar" ? "الخطوة 2: الأولوية الأساسية" : "Step 2: Core Priority")}
              {step === 3 && (language === "ar" ? "الخطوة 3: الإطار الزمني" : "Step 3: Timeline")}
              {step === 4 && (language === "ar" ? "النتيجة: خطتك المخصصة" : "Result: Your Tailored Plan")}
            </span>
          </div>
        </div>

        {/* Step Views with AnimatePresence */}
        <div className="relative z-10 min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: INDUSTRY ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-theme-primary font-alexandria">
                    {language === "ar" ? "ما هو مجال عملك أو قطاع مشروعك؟" : "What is your industry or project type?"}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-theme-secondary/80 font-alexandria">
                    {language === "ar"
                      ? "نحن نخصص الحلول بناءً على طبيعة السوق وجمهورك المستهدف."
                      : "We tailor marketing architectures based on your specific audience dynamics."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {INDUSTRIES.map((ind) => {
                    const Icon = ind.icon;
                    const isSelected = selectedIndustry === ind.id;
                    const name = language === "ar" ? ind.nameAr : ind.nameEn;
                    return (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`group relative flex items-center gap-4 p-5 rounded-2xl border text-start transition-all duration-200 ${
                          isSelected
                            ? "border-[#9F0F1F] bg-[#9F0F1F]/10 dark:bg-[#9F0F1F]/20 shadow-md ring-2 ring-[#9F0F1F]/30"
                            : "border-theme-border bg-theme-surface/50 hover:border-[#9F0F1F]/40 hover:bg-theme-surface"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isSelected
                              ? "bg-[#9F0F1F] text-[#F2D3B1]"
                              : "bg-theme-card border border-theme-border text-theme-primary group-hover:text-[#9F0F1F]"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-theme-primary font-alexandria leading-snug">
                            {name}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D1A]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_20px_rgba(159,15,31,0.35)] transition hover:bg-[#B91C28] active:scale-95"
                  >
                    <span className="font-alexandria">{language === "ar" ? "التالي: اختر الأولوية" : "Next: Choose Goal"}</span>
                    <Arrow className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: GOAL ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-theme-primary font-alexandria">
                    {language === "ar" ? "ما هي أولويتك القصوى في الوقت الحالي؟" : "What is your main current priority?"}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-theme-secondary/80 font-alexandria">
                    {language === "ar"
                      ? "هل تبحث عن تأثير بصري سينمائي، هوية، منصة ويب، أم مبيعات سريعة؟"
                      : "Are you looking for visual cinema, brand presence, rapid web conversion, or direct sales?"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GOALS.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = selectedGoal === goal.id;
                    const name = language === "ar" ? goal.nameAr : goal.nameEn;
                    const desc = language === "ar" ? goal.descAr : goal.descEn;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`group relative flex items-start gap-4 p-5 rounded-2xl border text-start transition-all duration-200 ${
                          isSelected
                            ? "border-[#9F0F1F] bg-[#9F0F1F]/10 dark:bg-[#9F0F1F]/20 shadow-md ring-2 ring-[#9F0F1F]/30"
                            : "border-theme-border bg-theme-surface/50 hover:border-[#9F0F1F]/40 hover:bg-theme-surface"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors mt-0.5 ${
                            isSelected
                              ? "bg-[#9F0F1F] text-[#F2D3B1]"
                              : "bg-theme-card border border-theme-border text-theme-primary group-hover:text-[#9F0F1F]"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-theme-primary font-alexandria leading-snug">
                            {name}
                          </p>
                          <p className="mt-1 text-xs text-theme-secondary/80 font-alexandria leading-relaxed">
                            {desc}
                          </p>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#FF4D1A] mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-theme-border bg-theme-surface px-6 text-xs font-bold text-theme-secondary hover:text-theme-primary transition"
                  >
                    <span className="font-alexandria">{language === "ar" ? "السابق" : "Back"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_20px_rgba(159,15,31,0.35)] transition hover:bg-[#B91C28] active:scale-95"
                  >
                    <span className="font-alexandria">{language === "ar" ? "التالي: الجدول الزمني" : "Next: Timeline"}</span>
                    <Arrow className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: TIMELINE ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-theme-primary font-alexandria">
                    {language === "ar" ? "ما هو الإطار الزمني المطلوب لتنفيذ المشروع؟" : "What is your target launch timeline?"}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-theme-secondary/80 font-alexandria">
                    {language === "ar"
                      ? "سنحدد وتيرة العمل وتجهيز فرق التصوير والتطوير وفق جدولك."
                      : "We align our filming crew and engineering sprint around your schedule."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIMELINES.map((time) => {
                    const isSelected = selectedTimeline === time.id;
                    const name = language === "ar" ? time.nameAr : time.nameEn;
                    const desc = language === "ar" ? time.descAr : time.descEn;
                    return (
                      <button
                        key={time.id}
                        type="button"
                        onClick={() => setSelectedTimeline(time.id)}
                        className={`group relative flex flex-col justify-between p-6 rounded-2xl border text-start transition-all duration-200 ${
                          isSelected
                            ? "border-[#9F0F1F] bg-[#9F0F1F]/10 dark:bg-[#9F0F1F]/20 shadow-md ring-2 ring-[#9F0F1F]/30"
                            : "border-theme-border bg-theme-surface/50 hover:border-[#9F0F1F]/40 hover:bg-theme-surface"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9F0F1F]/15 text-[#9F0F1F] dark:text-[#FF4D1A]">
                              <Clock className="w-5 h-5" />
                            </div>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-[#FF4D1A]" />}
                          </div>
                          <p className="text-base font-bold text-theme-primary font-alexandria">
                            {name}
                          </p>
                          <p className="mt-2 text-xs text-theme-secondary/80 font-alexandria leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-theme-border bg-theme-surface px-6 text-xs font-bold text-theme-secondary hover:text-theme-primary transition"
                  >
                    <span className="font-alexandria">{language === "ar" ? "السابق" : "Back"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#9F0F1F] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.4)] transition hover:bg-[#B91C28] active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-[#FF4D1A]" />
                    <span className="font-alexandria">{language === "ar" ? "عرض التوصية والخطة الفورية" : "View My Plan"}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: RESULT / RECOMMENDATION ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Result Banner */}
                <div className="rounded-2xl border border-[#9F0F1F]/30 bg-gradient-to-br from-[#9F0F1F]/15 via-theme-card to-theme-surface p-6 md:p-8 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#9F0F1F] text-[#F2D3B1] px-3 py-1 text-[11px] font-bold uppercase tracking-wider font-alexandria mb-3 shadow">
                        <Sparkles className="w-3 h-3 text-[#FF4D1A]" />
                        <span>{language === "ar" ? "الخطة الموصى بها لمشروعك" : "Recommended Architecture"}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-theme-primary font-alexandria leading-snug">
                        {recommendation.packageName}
                      </h3>
                      <p className="mt-2 text-xs md:text-sm text-theme-secondary/80 font-alexandria">
                        {language === "ar"
                          ? `مخصصة لقطاع (${currentIndustry.nameAr}) • بهدف (${currentGoal.nameAr}) • جدول (${currentTimeline.nameAr})`
                          : `Tuned for (${currentIndustry.nameEn}) • Goal (${currentGoal.nameEn}) • Timeline (${currentTimeline.nameEn})`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#9F0F1F] dark:text-[#FF4D1A] hover:underline font-alexandria shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === "ar" ? "إعادة تخصيص الخطة" : "Change Preferences"}</span>
                    </button>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-6 border-t border-theme-border/60">
                    <p className="text-xs font-bold uppercase tracking-wider text-theme-muted font-alexandria mb-4">
                      {language === "ar" ? "أهم مخرجات العمل التي ستحصل عليها:" : "Key Deliverables Included in this Scope:"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recommendation.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-theme-surface/70 border border-theme-border/50 text-xs md:text-sm text-theme-primary font-alexandria"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FF4D1A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <a
                      href={recommendation.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_4px_25px_rgba(37,211,102,0.35)] transition hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span className="font-alexandria">
                        {language === "ar" ? "استلم العرض والخطة عبر واتساب" : "Get Proposal on WhatsApp"}
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={handleOpenAiChat}
                      className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-theme-border bg-theme-card px-6 text-xs font-bold text-theme-primary hover:border-[#9F0F1F]/40 hover:bg-theme-surface transition active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-[#FF4D1A]" />
                      <span className="font-alexandria">
                        {language === "ar" ? "ناقش الخطة مع مساعد حضور الذكي" : "Discuss with AI Assistant"}
                      </span>
                    </button>
                  </div>

                  <span className="text-[11px] text-theme-muted font-alexandria">
                    {language === "ar" ? "⚡ استجابة واستشارة مجانية فورية" : "⚡ Instant response & free consultation"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
