"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEBO_WHATSAPP = "201211050297";
const MAX_USER_MESSAGES = 3;
const LOTTIE_URL = "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json";

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

type ApiResponse = {
  reply: string;
  showWhatsApp: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildWhatsAppLink(messages: Message[]): string {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m, i) => `${i + 1}. ${m.text}`)
    .join("\n");

  const text = `أهلاً ديبو 👋
كنت بتكلم مع Shift AI Agent وعندي استفسار عن خدمات SHIFT.

📋 ملخص المحادثة:
${userMessages}

أنا مهتم بالتعاون مع SHIFT، ممكن تكلمني؟`;

  return `https://wa.me/${DEBO_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Robot avatar (Lottie with graceful fallback) ─────────────────────────────
function RobotAvatar() {
  const [LottiePlayer, setLottiePlayer] = useState<React.ComponentType<{
    animationData: object;
    play: boolean;
    loop: boolean;
    className?: string;
  }> | null>(null);
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    let alive = true;

    // Dynamic import to avoid SSR issues
    void (async () => {
      try {
        const [mod, res] = await Promise.all([
          import("react-lottie-player") as Promise<{ default: React.ComponentType<{ animationData: object; play: boolean; loop: boolean; className?: string }> }>,
          fetch(LOTTIE_URL),
        ]);
        if (!alive) return;
        const json = (await res.json()) as object;
        setLottiePlayer(() => mod.default);
        setAnimData(json);
      } catch {
        // Silently fall through to the emoji fallback
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (LottiePlayer && animData) {
    return (
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-400/10">
        <LottiePlayer
          animationData={animData}
          play
          loop
          className="absolute -top-1 left-0 h-11 w-11 scale-125"
        />
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-base">
      🤖
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-2 w-2 rounded-full bg-emerald-400/70 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Single message bubble ────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-none bg-[#10b981] text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
            : "rounded-tl-none border border-white/10 bg-white/[0.06] text-zinc-200"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────
function WhatsAppCTA({ href }: { href: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-2"
    >
      <p className="text-center text-[11px] text-zinc-500">
        ديبو مستنيك على واتساب دلوقتي 👇
      </p>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-[0_4px_30px_rgba(37,211,102,0.45)] transition"
      >
        {/* Pulsing glow layer */}
        <motion.div
          className="absolute inset-0 bg-white/25"
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative z-10">ابعت لديبو على واتساب</span>
        <ArrowLeft size={18} className="relative z-10" />
      </motion.a>
    </motion.div>
  );
}

// ─── Chat window ──────────────────────────────────────────────────────────────
function ChatWindow({
  messages,
  isTyping,
  showWhatsApp,
  whatsAppLink,
  input,
  isInputDisabled,
  onInputChange,
  onSubmit,
  onClose,
}: {
  messages: Message[];
  isTyping: boolean;
  showWhatsApp: boolean;
  whatsAppLink: string;
  input: string;
  isInputDisabled: boolean;
  onInputChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showWhatsApp]);

  // Auto-focus input when visible
  useEffect(() => {
    if (!isInputDisabled) {
      inputRef.current?.focus();
    }
  }, [isInputDisabled]);

  return (
    <motion.section
      key="chat-window"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 18 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
      className="absolute bottom-[calc(100%+16px)] right-0 flex w-[93vw] max-w-sm origin-bottom-right flex-col rounded-2xl border border-white/12 bg-zinc-950/90 shadow-[0_20px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      dir="rtl"
      aria-label="Shift AI chat"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <RobotAvatar />
        <div className="flex-1">
          <p className="text-xs font-bold text-emerald-400">Shift AI Agent</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-zinc-400">أونلاين الآن</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:text-white"
          aria-label="إغلاق المحادثة"
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex h-64 flex-col gap-3 overflow-y-auto px-3 py-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </AnimatePresence>

        {isTyping && <TypingDots />}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-white/10 px-3 pb-3 pt-3">
        {showWhatsApp ? (
          <WhatsAppCTA href={whatsAppLink} />
        ) : (
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={isInputDisabled || isTyping}
              placeholder={
                isInputDisabled ? "جاري التوصيل بديبو..." : "اكتب رسالتك..."
              }
              className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-right text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping || isInputDisabled}
              className="flex shrink-0 items-center justify-center rounded-xl bg-[#10b981] p-2.5 text-black transition hover:bg-emerald-400 disabled:opacity-40"
              aria-label="إرسال"
            >
              <Send size={17} className="rotate-180" />
            </button>
          </form>
        )}

        {/* Message count indicator */}
        {!showWhatsApp && (
          <p className="mt-2 text-center text-[10px] text-zinc-600">
            {MAX_USER_MESSAGES - messages.filter((m) => m.role === "user").length > 0
              ? `${MAX_USER_MESSAGES - messages.filter((m) => m.role === "user").length} ${
                  MAX_USER_MESSAGES - messages.filter((m) => m.role === "user").length === 1
                    ? "سؤال متبقي"
                    : "أسئلة متبقية"
                }`
              : ""}
          </p>
        )}
      </div>
    </motion.section>
  );
}

// ─── Main exported FAB component ─────────────────────────────────────────────
export function ChatFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "bot",
      text: "أهلاً بيك في SHIFT! 👋 أنا Shift AI Agent، إزاي أقدر أساعدك في تطوير البيزنس بتاعك بالذكاء الاصطناعي والأمن السيبراني؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  // Count only actual user-sent messages (not the initial greeting)
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const isInputDisabled = userMessageCount >= MAX_USER_MESSAGES;

  // WhatsApp link is computed fresh whenever messages change
  const whatsAppLink = buildWhatsAppLink(messages);

  // Listen for custom event from other components (e.g., portfolio CTA)
  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("shift-open-chat", openChat);
    return () => window.removeEventListener("shift-open-chat", openChat);
  }, []);

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isTyping || isInputDisabled) return;

      // Optimistically add the user message
      const userMsg: Message = { id: uid(), role: "user", text: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        // Build history from current state (excluding the greeting bot message)
        const history = messages.map((m) => ({ role: m.role, text: m.text }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ history, message: trimmed }),
        });

        // Throw immediately on non-2xx so the catch block handles error responses
        if (!res.ok) {
          throw new Error(`API responded with ${res.status}: ${res.statusText}`);
        }

        const data = (await res.json()) as ApiResponse;

        // Guard against missing reply field (should never happen now)
        const replyText = data.reply?.trim() || "ابعتلي تفاصيل أكتر وهساعدك 💬";

        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "bot", text: replyText },
        ]);

        if (data.showWhatsApp) {
          setShowWhatsApp(true);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "bot",
            text: "عندي مشكلة تقنية بسيطة دلوقتي 😅 تقدر تكلم ديبو مباشرة على واتساب وهيساعدك فوراً.",
          },
        ]);
        setShowWhatsApp(true);
      } finally {
        setIsTyping(false);
      }
    },
    [input, isTyping, isInputDisabled, messages]
  );

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            showWhatsApp={showWhatsApp}
            whatsAppLink={whatsAppLink}
            input={input}
            isInputDisabled={isInputDisabled}
            onInputChange={setInput}
            onSubmit={handleSend}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB toggle button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-[#10b981] text-black shadow-[0_12px_35px_rgba(16,185,129,0.5)] transition"
        aria-label={isOpen ? "إغلاق المحادثة" : "فتح المحادثة مع AI"}
      >
        {/* Subtle ring animation when chat is closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
