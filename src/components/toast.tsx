"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type ToastVariant = "success" | "error";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

let addToast: ((t: Omit<ToastItem, "id">) => void) | null = null;

export function toast(message: string, variant: ToastVariant = "success") {
  addToast?.({ message, variant });
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    addToast = ({ message, variant }) => {
      const id = Math.random().toString(36).slice(2, 10);
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => {
      addToast = null;
    };
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-2" dir="ltr">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl ${
              t.variant === "success"
                ? "border-violet-500/30 bg-violet-500/15"
                : "border-red-400/30 bg-red-500/15"
            }`}
          >
            {t.variant === "success" ? (
              <CheckCircle size={18} className="shrink-0 text-violet-400" />
            ) : (
              <XCircle size={18} className="shrink-0 text-red-400" />
            )}
            <p className="text-sm font-medium text-white">{t.message}</p>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="ml-2 shrink-0 text-zinc-500 transition hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
