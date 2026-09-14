"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Star, CheckCircle, Quote, Building2 } from "lucide-react";

interface TestimonialItem {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  serviceAr: string;
  serviceEn: string;
  quoteAr: string;
  quoteEn: string;
  metricAr: string;
  metricEn: string;
  initials: string;
}

const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "kamal_law",
    nameAr: "المستشار كمال أبو علي",
    nameEn: "Counselor Kamal Abou Ali",
    roleAr: "المؤسس ورئيس مجلس الإدارة",
    roleEn: "Founder & Managing Director",
    companyAr: "مؤسسة كمال أبو علي القانونية — الشيخ زايد والسادات",
    companyEn: "Kamal Abou Ali Law Firm — Sheikh Zayed & Sadat",
    serviceAr: "الفيديو المؤسسي + المنصة الرقمية",
    serviceEn: "Corporate Brand Film + Web Platform",
    quoteAr:
      "شغل حضور في إنتاج الفيديو المؤسسي وتطوير موقعنا الإلكتروني كان نقلة نوعية حقيقية. نقلوا هيبة ومكانة المؤسسة لعملائنا في الشيخ زايد والسادات بدقة سينمائية وتجربة مستخدم لا مثيل لها.",
    quoteEn:
      "Hodour's work on our corporate film and digital platform was a true turning point. They elevated our firm's authority with cinematic precision and delivered an exceptional user experience.",
    metricAr: "+300% زيادة طلبات الاستشارات الرقمية",
    metricEn: "+300% Digital Booking Growth",
    initials: "كا",
  },
  {
    id: "khaleej_real_estate",
    nameAr: "المهندس حسام الشريف",
    nameEn: "Eng. Hossam El-Sherif",
    roleAr: "مدير إدارة التسويق والاستثمار العقاري",
    roleEn: "Head of Marketing & Real Estate Investment",
    companyAr: "شركة الخليج للتطوير العقاري",
    companyEn: "Al-Khaleej Real Estate Development",
    serviceAr: "التصوير الجوي بالدرون بدقة 4K + مونتاج سينمائي",
    serviceEn: "4K Drone Cinematography & Video Showcase",
    quoteAr:
      "التصوير الجوي بالدرون والمونتاج السينمائي لمولاتنا التجارية بالسادات قدّم مشروعاتنا للمستثمرين بأعلى مستوى من الاحترافية والجاذبية، وأصبح الفيلم الأداة البيعية الأولى لفريق التسويق.",
    quoteEn:
      "The 4K drone cinematography and promotional film for our commercial malls presented our projects to investors with prime professionalism, becoming our sales team's primary conversion asset.",
    metricAr: "تغطية 12+ موقع ومول تجاري استثماري",
    metricEn: "12+ Commercial Malls Documented",
    initials: "خل",
  },
  {
    id: "mp_campaign",
    nameAr: "د. ياسر فتحي",
    nameEn: "Dr. Yasser Fathy",
    roleAr: "المستشار الإعلامي ومسؤول التحول الرقمي",
    roleEn: "Media Advisor & Digital Lead",
    companyAr: "مكتب خدمة المواطنين — النائب أحمد أبو زيد",
    companyEn: "MP Ahmed Abou Zeid Office",
    serviceAr: "الفيلم الميداني + منصة إدارة الطلبات",
    serviceEn: "Documentary Film + Citizen Request Platform",
    quoteAr:
      "الفيديو الميداني نقل نبض العمل الطبيعي بمصداقية سينمائية حققت ملايين المشاهدات، والمنصة الرقمية التي صمموها لإدارة طلبات المواطنين أحدثت ثورة في سرعة الرد والمتابعة اللحظية.",
    quoteEn:
      "The field documentary captured genuine public trust with millions of views, while the digital constituent platform revolutionized our workflow with instant tracking and record speed.",
    metricAr: "+2 مليون مشاهدة وتفاعل ومتابعة فورية",
    metricEn: "+2M Views & Real-time Tracking",
    initials: "حم",
  },
];

export function Testimonials() {
  const { language } = useLanguage();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20" id="testimonials">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9F0F1F] dark:text-[#FF4D1A] mb-3 font-alexandria">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A] animate-pulse" />
          <span>{language === "ar" ? "آراء العملاء والشركاء" : "Client Testimonials"}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-theme-primary font-alexandria leading-tight">
          {language === "ar" ? (
            <>
              ثقة بنيناها <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">بنتائج فعلية</span>
            </>
          ) : (
            <>
              Trust Built on <span className="text-[#9F0F1F] dark:text-[#FF4D1A]">Real Results</span>
            </>
          )}
        </h2>
        <p className="mt-3 text-sm md:text-base text-theme-secondary/80 font-alexandria">
          {language === "ar"
            ? "شهادات وتجارب حقيقية من قيادات ومؤسسات شاركناهم رحلة صناعة الحضور الرقمي والسينمائي في مصر."
            : "Authentic feedback and tangible outcomes from institutional leaders and companies we partnered with."}
        </p>
      </motion.div>

      {/* Testimonial Cards Grid — Clean, static & high-trust */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLIENT_TESTIMONIALS.map((item, idx) => {
          const name = language === "ar" ? item.nameAr : item.nameEn;
          const role = language === "ar" ? item.roleAr : item.roleEn;
          const company = language === "ar" ? item.companyAr : item.companyEn;
          const service = language === "ar" ? item.serviceAr : item.serviceEn;
          const quote = language === "ar" ? item.quoteAr : item.quoteEn;
          const metric = language === "ar" ? item.metricAr : item.metricEn;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className="flex flex-col justify-between rounded-3xl border border-theme-border bg-theme-card p-6 md:p-7 shadow-sm hover:border-[#9F0F1F]/40 transition-colors duration-200 relative overflow-hidden"
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#9F0F1F]/40 to-transparent" />

              <div>
                {/* Header: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-theme-border">
                  <div className="flex items-center gap-1 text-[#FF4D1A]" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9F0F1F] dark:text-[#FF4D1A] bg-[#9F0F1F]/10 dark:bg-[#FF4D1A]/10 px-2.5 py-0.5 rounded-full font-alexandria">
                    <CheckCircle className="w-3 h-3 text-[#FF4D1A]" />
                    <span>{language === "ar" ? "عميل موثّق" : "Verified Client"}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-[#9F0F1F]/20 dark:text-[#FF4D1A]/20 absolute -top-1.5 start-0 -z-0 rtl:scale-x-[-1]" />
                  <blockquote className="relative z-10 text-sm md:text-base leading-relaxed text-theme-secondary/90 font-alexandria pt-3">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>

                {/* Achieved Metric Tag */}
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-theme-surface/70 px-3 py-1.5 text-xs font-bold text-theme-primary mb-6 border border-theme-border/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D1A]" />
                  <span className="font-alexandria">{metric}</span>
                </div>
              </div>

              {/* Client Profile */}
              <div className="pt-4 border-t border-theme-border flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9F0F1F] text-[#F2D3B1] font-bold font-alexandria text-sm shadow-sm">
                  {item.initials}
                </div>

                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm font-bold text-theme-primary font-alexandria truncate">
                    {name}
                  </h3>
                  <p className="text-xs text-[#9F0F1F] dark:text-[#FF4D1A] font-alexandria truncate font-semibold">
                    {role}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-theme-muted font-alexandria truncate mt-0.5">
                    <Building2 className="w-3 h-3 shrink-0 text-theme-muted" />
                    <span className="truncate">{company}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
