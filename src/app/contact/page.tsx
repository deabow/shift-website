"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const CEO_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "201211050297";

const serviceKeys = [
  "mediaProduction",
  "graphicDesign",
  "digitalMarketing",
  "webDevelopment",
  "socialMediaManagement",
] as const;

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const message =
      language === "ar"
        ? `أهلاً حضور!\n\nالاسم: ${formData.name}\nالإيميل: ${formData.email}\nالموبايل: ${formData.phone}\nالخدمة: ${formData.service}\n\nالرسالة:\n${formData.message}`
        : `Hello Hodour!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setFormState("success");

    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8 bg-theme-bg transition-colors duration-300">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-theme-bg" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.05),transparent_70%)]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.contact.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-primary leading-[1.15] font-changa">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-base text-theme-secondary/80 md:text-lg max-w-2xl mx-auto font-tajawal">
          {t.contact.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-theme-border bg-theme-card p-6 md:p-10 space-y-5 shadow-lg"
          >
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold text-theme-secondary mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[46px] rounded-xl border border-theme-border bg-theme-surface/70 px-4 py-3 text-sm text-theme-primary placeholder-theme-muted/60 outline-none transition focus-visible:ring-2 focus-visible:ring-[#9F0F1F] font-tajawal"
                  placeholder={
                    language === "ar" ? "محمد أحمد" : "John Doe"
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold text-theme-secondary mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[46px] rounded-xl border border-theme-border bg-theme-surface/70 px-4 py-3 text-sm text-theme-primary placeholder-theme-muted/60 outline-none transition focus-visible:ring-2 focus-visible:ring-[#9F0F1F] font-tajawal"
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Phone & Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-bold text-theme-secondary mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full min-h-[46px] rounded-xl border border-theme-border bg-theme-surface/70 px-4 py-3 text-sm text-theme-primary placeholder-theme-muted/60 outline-none transition focus-visible:ring-2 focus-visible:ring-[#9F0F1F] font-tajawal"
                  placeholder="+20 1XX XXX XXXX"
                  dir="ltr"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-bold text-theme-secondary mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.service}
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full min-h-[46px] rounded-xl border border-theme-border bg-theme-surface/70 px-4 py-3 text-sm text-theme-primary outline-none transition focus-visible:ring-2 focus-visible:ring-[#9F0F1F] font-tajawal appearance-none"
                >
                  <option value="" className="bg-theme-card text-theme-primary">
                    {t.contact.form.servicePlaceholder}
                  </option>
                  {serviceKeys.map((key) => (
                    <option key={key} value={t.services.items[key].title} className="bg-theme-card text-theme-primary">
                      {t.services.items[key].title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-bold text-theme-secondary mb-2 uppercase tracking-wider font-changa"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-theme-border bg-theme-surface/70 px-4 py-3 text-sm text-theme-primary placeholder-theme-muted/60 outline-none transition focus-visible:ring-2 focus-visible:ring-[#9F0F1F] font-tajawal"
                placeholder={
                  language === "ar"
                    ? "اكتب تفاصيل مشروعك أو استفسارك هنا..."
                    : "Write your message or project details here..."
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === "sending"}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#9F0F1F] py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-[#F2D3B1] shadow-[0_0_25px_rgba(159,15,31,0.35)] transition-all duration-300 hover:bg-[#B91C28] hover:shadow-[0_0_35px_rgba(159,15,31,0.5)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D1A]"
            >
              {formState === "sending" ? (
                <span className="font-changa">{t.contact.form.sending}</span>
              ) : (
                <>
                  <span className="font-changa">{t.contact.form.submit}</span>
                  <Send size={15} />
                </>
              )}
            </button>

            {/* Status messages */}
            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm text-green-600 dark:text-green-400"
              >
                <CheckCircle size={16} />
                <span className="font-tajawal">{t.contact.form.success}</span>
              </motion.div>
            )}
            {formState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle size={16} />
                <span className="font-tajawal">{t.contact.form.error}</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${CEO_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-theme-border bg-theme-card p-5 transition-all duration-300 hover:border-[#9F0F1F]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-muted uppercase tracking-wider font-changa">
                {t.contact.info.whatsapp}
              </p>
              <p className="text-sm font-semibold text-theme-primary font-tajawal mt-0.5" dir="ltr">
                +2 012 1105 0297
              </p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:info@hodour.com"
            className="group flex items-center gap-4 rounded-2xl border border-theme-border bg-theme-card p-5 transition-all duration-300 hover:border-[#9F0F1F]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F0F1F]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9F0F1F]/15 text-[#9F0F1F] shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-muted uppercase tracking-wider font-changa">
                {t.contact.info.email}
              </p>
              <p className="text-sm font-semibold text-theme-primary font-tajawal mt-0.5" dir="ltr">
                info@hodour.com
              </p>
            </div>
          </a>

          {/* Location Card */}
          <div className="group flex items-center gap-4 rounded-2xl border border-theme-border bg-theme-card p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF4D1A]/15 text-[#FF4D1A] shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-theme-muted uppercase tracking-wider font-changa">
                {t.contact.info.location}
              </p>
              <p className="text-sm font-semibold text-theme-primary font-tajawal mt-0.5">
                {language === "ar" ? "مصر — الشيخ زايد ومدينة السادات" : "Egypt — Sheikh Zayed & Sadat City"}
              </p>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="rounded-2xl border border-[#9F0F1F]/25 bg-theme-card p-6 text-center shadow-sm">
            <p className="text-base font-extrabold text-theme-primary font-changa mb-2">
              {language === "ar"
                ? "محتاج استشارة عاجلة؟"
                : "Need an immediate consult?"}
            </p>
            <p className="text-xs text-theme-secondary/80 font-tajawal mb-5">
              {language === "ar"
                ? "تواصل مع فريقنا مباشرة على واتساب وسنرد عليك في غضون دقائق."
                : "Message our team directly on WhatsApp and we will respond within minutes."}
            </p>
            <a
              href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
                language === "ar"
                  ? "أهلاً حضور، محتاج أتكلم معاكم بخصوص مشروع جديد."
                  : "Hello Hodour, I'd like to talk about a new project."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{language === "ar" ? "محادثة فورية على واتساب" : "Chat on WhatsApp"}</span>
              <MessageSquare size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
