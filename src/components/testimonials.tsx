"use client";

/**
 * Testimonials — Legacy component, currently not used in Hodour pages.
 * Kept for potential future use.
 */

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "صاحب عيادة أسنان",
    content: "حضور غيّرت شكل البراند بتاعي تمامًا. من أول ما بدأنا الحملة الإعلانية، الحجوزات زادت ٣ أضعاف.",
  },
  {
    name: "سارة حسن",
    role: "مصممة لاندسكيب",
    content: "شغلهم في السوشيال ميديا والتصوير كان على مستوى عالي جدًا. أخيرًا لقيت حد يفهم اللي أنا عايزاه.",
  },
  {
    name: "محمود علي",
    role: "مؤسس شركة عقارات",
    content: "الموقع الإلكتروني اللي عملوهولنا كان نقلة نوعية. احترافي وسريع ومتوافق مع الموبايل بشكل ممتاز.",
  },
];

export function Testimonials() {
  const { language } = useLanguage();

  const xTransform = language === "ar" ? ["0%", "50%"] : ["0%", "-50%"];

  return (
    <section className="w-full py-24 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(159,15,31,0.06),transparent_70%)] pointer-events-none" />

      <div className="text-center mb-16 px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-changa">
          <span className="text-[#9F0F1F]">
            {language === "ar" ? "آراء عملائنا" : "Client Testimonials"}
          </span>
        </h2>
        <p className="text-[#F2D3B1]/50 max-w-xl mx-auto font-tajawal">
          {language === "ar"
            ? "شهادات حقيقية من عملاء اشتغلنا معاهم وحققنا نتائج ملموسة."
            : "Real testimonials from clients we've worked with and achieved tangible results."}
        </p>
      </div>

      <div className="flex w-full overflow-hidden relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0B0C] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0B0C] to-transparent z-20 pointer-events-none" />

        <motion.div
          animate={{ x: xTransform }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex gap-6 px-4 w-max"
        >
          {[...testimonials, ...testimonials].map((tItem, idx) => (
            <div
              key={idx}
              className="w-[85vw] sm:w-[350px] md:w-[450px] bg-[#2E2A29]/30 backdrop-blur-md border border-[#F2D3B1]/10 rounded-2xl p-6 sm:p-8 hover:border-[#9F0F1F]/30 transition-colors shrink-0 flex flex-col items-center text-center"
            >
              <div className="flex justify-center text-[#FF4D1A] mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#F2D3B1]/70 text-lg mb-6 leading-relaxed text-center font-tajawal">
                &quot;{tItem.content}&quot;
              </p>
              <div className="text-center">
                <h4 className="text-[#F2D3B1] font-bold font-changa">{tItem.name}</h4>
                <p className="text-[#9F0F1F] text-sm font-tajawal">{tItem.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
