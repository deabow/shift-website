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

    // For now, redirect to WhatsApp with the form data
    const message =
      language === "ar"
        ? `أهلاً حضور!\n\nالاسم: ${formData.name}\nالإيميل: ${formData.email}\nالموبايل: ${formData.phone}\nالخدمة: ${formData.service}\n\nالرسالة:\n${formData.message}`
        : `Hello Hodour!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setFormState("success");

    // Reset after 3 seconds
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <main className="relative mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-4 pb-24 pt-12 md:px-8">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0B0B0C]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_5%,rgba(159,15,31,0.04),transparent_70%)]" />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9F0F1F]/[0.08] border border-[#9F0F1F]/20 text-[#9F0F1F] text-xs font-semibold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9F0F1F] animate-pulse" />
          <span className="font-changa">{t.contact.badge}</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#F2D3B1] md:text-5xl lg:text-6xl leading-[1.1] font-changa">
          {t.contact.title}
        </h1>
        <p className="mt-4 text-base text-[#F2D3B1]/50 md:text-lg max-w-2xl mx-auto font-tajawal">
          {t.contact.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-6 md:p-10 space-y-5"
          >
            {/* Name & Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold text-[#F2D3B1]/60 mb-2 uppercase tracking-wider font-changa"
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
                  className="w-full rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 px-4 py-3 text-sm text-[#F2D3B1] placeholder-[#F2D3B1]/25 outline-none transition focus:border-[#9F0F1F]/50 focus:ring-1 focus:ring-[#9F0F1F]/30 font-tajawal"
                  placeholder={
                    language === "ar" ? "محمد أحمد" : "John Doe"
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold text-[#F2D3B1]/60 mb-2 uppercase tracking-wider font-changa"
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
                  className="w-full rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 px-4 py-3 text-sm text-[#F2D3B1] placeholder-[#F2D3B1]/25 outline-none transition focus:border-[#9F0F1F]/50 focus:ring-1 focus:ring-[#9F0F1F]/30 font-tajawal"
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Phone & Service row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-bold text-[#F2D3B1]/60 mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 px-4 py-3 text-sm text-[#F2D3B1] placeholder-[#F2D3B1]/25 outline-none transition focus:border-[#9F0F1F]/50 focus:ring-1 focus:ring-[#9F0F1F]/30 font-tajawal"
                  placeholder="+20 1XX XXX XXXX"
                  dir="ltr"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-bold text-[#F2D3B1]/60 mb-2 uppercase tracking-wider font-changa"
                >
                  {t.contact.form.service}
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 px-4 py-3 text-sm text-[#F2D3B1] outline-none transition focus:border-[#9F0F1F]/50 focus:ring-1 focus:ring-[#9F0F1F]/30 font-tajawal appearance-none"
                >
                  <option value="" className="bg-[#0B0B0C]">
                    {t.contact.form.servicePlaceholder}
                  </option>
                  {serviceKeys.map((key) => (
                    <option key={key} value={t.services.items[key].title} className="bg-[#0B0B0C]">
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
                className="block text-xs font-bold text-[#F2D3B1]/60 mb-2 uppercase tracking-wider font-changa"
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
                className="w-full resize-none rounded-xl border border-[#F2D3B1]/10 bg-[#2E2A29]/40 px-4 py-3 text-sm text-[#F2D3B1] placeholder-[#F2D3B1]/25 outline-none transition focus:border-[#9F0F1F]/50 focus:ring-1 focus:ring-[#9F0F1F]/30 font-tajawal"
                placeholder={
                  language === "ar"
                    ? "اكتب رسالتك هنا..."
                    : "Write your message here..."
                }
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === "sending"}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#9F0F1F] py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-[#F2D3B1] transition-all duration-300 hover:shadow-[0_0_35px_rgba(159,15,31,0.4)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {formState === "sending" ? (
                <span>{t.contact.form.sending}</span>
              ) : (
                <>
                  <span>{t.contact.form.submit}</span>
                  <Send size={14} />
                </>
              )}
            </button>

            {/* Status messages */}
            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400"
              >
                <CheckCircle size={16} />
                <span className="font-tajawal">{t.contact.form.success}</span>
              </motion.div>
            )}
            {formState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle size={16} />
                <span className="font-tajawal">{t.contact.form.error}</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* ── Contact Info Sidebar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CEO_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-5 transition-all duration-300 hover:border-[#9F0F1F]/30 hover:shadow-[0_0_30px_rgba(159,15,31,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2D3B1]/50 uppercase tracking-wider font-changa">
                {t.contact.info.whatsapp}
              </p>
              <p className="text-sm text-[#F2D3B1] font-tajawal mt-0.5" dir="ltr">
                +2 012 1105 0297
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@hodour.com"
            className="group flex items-center gap-4 rounded-2xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-5 transition-all duration-300 hover:border-[#9F0F1F]/30 hover:shadow-[0_0_30px_rgba(159,15,31,0.08)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9F0F1F]/10 text-[#9F0F1F] shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2D3B1]/50 uppercase tracking-wider font-changa">
                {t.contact.info.email}
              </p>
              <p className="text-sm text-[#F2D3B1] font-tajawal mt-0.5" dir="ltr">
                info@hodour.com
              </p>
            </div>
          </a>

          {/* Location */}
          <div className="group flex items-center gap-4 rounded-2xl border border-[#F2D3B1]/[0.08] bg-[#0B0B0C] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF4D1A]/10 text-[#FF4D1A] shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#F2D3B1]/50 uppercase tracking-wider font-changa">
                {t.contact.info.location}
              </p>
              <p className="text-sm text-[#F2D3B1] font-tajawal mt-0.5">
                {language === "ar" ? "مصر" : "Egypt"}
              </p>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="rounded-2xl border border-[#9F0F1F]/20 bg-[#9F0F1F]/[0.04] p-6 text-center">
            <p className="text-sm font-bold text-[#F2D3B1] font-changa mb-2">
              {language === "ar"
                ? "محتاج رد سريع؟"
                : "Need a quick response?"}
            </p>
            <p className="text-xs text-[#F2D3B1]/50 font-tajawal mb-4">
              {language === "ar"
                ? "كلمنا مباشرة على واتساب وهنرد عليك في دقايق."
                : "Message us directly on WhatsApp and we'll respond in minutes."}
            </p>
            <a
              href={`https://wa.me/${CEO_WHATSAPP}?text=${encodeURIComponent(
                language === "ar"
                  ? "أهلاً حضور، محتاج أتكلم معاكم."
                  : "Hello Hodour, I need to talk."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:shadow-[0_0_25px_rgba(37,211,102,0.3)]"
            >
              <span>WhatsApp</span>
              <Phone size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
