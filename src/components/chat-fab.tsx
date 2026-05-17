"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import Lottie from "react-lottie-player";
import { useEffect, useState, useRef } from "react";

const CYBER_ROBOT_JSON_URL =
  "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json";

type Message = {
  role: "user" | "bot";
  text: string;
};

export function ChatFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [robotAnimation, setRobotAnimation] = useState<object | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "أهلاً بيك في SHIFT! أنا المساعد الذكي، إزاي أقدر أساعدك في تطوير البيزنس بتاعك بالذكاء الاصطناعي والأمن السيبراني؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showWhatsApp]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("shift-open-chat", openChat);
    return () => {
      window.removeEventListener("shift-open-chat", openChat);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadRobotAnimation = async () => {
      try {
        const response = await fetch(CYBER_ROBOT_JSON_URL);
        if (!response.ok) return;
        const data = (await response.json()) as object;
        if (isMounted) {
          setRobotAnimation(data);
        }
      } catch {
        // Fallback UI if animation fails
      }
    };
    void loadRobotAnimation();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const currentMessages = [...messages, { role: "user" as const, text: userText }];
    setMessages(currentMessages);
    setInput("");

    setIsTyping(true);
    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: userText }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API failed");
      }
      
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      if (data.showWhatsApp) {
        setShowWhatsApp(true);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي. يمكنك التواصل معنا مباشرة على واتساب الآن." }
      ]);
      setShowWhatsApp(true);
    } finally {
      setIsTyping(false);
    }
  };

  const getWhatsAppLink = () => {
    const userInputs = messages
      .filter((m) => m.role === "user")
      .map((m) => `- ${m.text}`)
      .join("\n");
    const summary = `أهلاً ديبو،\nكنت بتكلم مع المساعد الذكي وحابب أعرف تفاصيل أكتر عن خدمات SHIFT.\n\nملخص المحادثة:\n${userInputs}`;
    return `https://wa.me/201211050297?text=${encodeURIComponent(summary)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-[calc(100%+16px)] right-0 flex w-[92vw] max-w-sm origin-bottom-right flex-col rounded-2xl border border-white/15 bg-[#111114]/95 p-4 shadow-[0_18px_65px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-white/15 bg-black/30 p-1.5 text-zinc-300 transition hover:text-white"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
              <div className="flex w-full items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-400/10">
                  {robotAnimation && (
                    <Lottie
                      animationData={robotAnimation}
                      play
                      loop
                      className="absolute -top-1 left-0 h-10 w-10 scale-[1.3]"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#C4B5FD]">Shift AI Agent</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-zinc-400">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="mt-3 flex h-64 flex-col gap-3 overflow-y-auto px-1 py-2 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-none bg-[#8B5CF6] text-white shadow-[0_4px_15px_rgba(139,92,246,0.2)]"
                        : "rounded-tl-none border border-white/10 bg-white/5 text-zinc-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="mt-3 pt-3 border-t border-white/10 relative">
              {!showWhatsApp ? (
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-right text-sm text-white outline-none transition focus:border-[#8B5CF6]/50 disabled:opacity-50"
                    placeholder="اكتب رسالتك..."
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="flex shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6] p-2.5 text-white transition hover:bg-[#7C3AED] disabled:opacity-50"
                  >
                    <Send size={18} className="rotate-180" />
                  </button>
                </form>
              ) : (
                <motion.a
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-[0_4px_30px_rgba(37,211,102,0.4)] transition hover:bg-[#1DA851] hover:shadow-[0_6px_35px_rgba(37,211,102,0.5)]"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <span className="relative z-10">Contact Debo on WhatsApp</span>
                  <ArrowRight size={18} className="relative z-10 rotate-180" />
                </motion.a>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#8B5CF6] text-white shadow-[0_12px_35px_rgba(139,92,246,0.55)] transition hover:bg-[#7C3AED]"
        aria-label={isOpen ? "Close assistant chat" : "Open assistant chat"}
      >
        <MessageCircle size={22} />
      </motion.button>
    </div>
  );
}
