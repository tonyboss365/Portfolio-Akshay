import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type ToastType = "success" | "error" | "info" | "copy";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — top-right */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.88 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`pointer-events-auto relative flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md text-sm font-sans min-w-[220px] max-w-xs cursor-pointer select-none overflow-hidden
                ${toast.type === "error"
                  ? "bg-red-50/95 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                  : toast.type === "copy"
                  ? "bg-emerald-50/95 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  : toast.type === "info"
                  ? "bg-blue-50/95 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                  : "bg-white/95 dark:bg-slate-900/90 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200"
                }`}
              onClick={() => dismiss(toast.id)}
            >
              <span className="flex-shrink-0 text-base font-bold">
                {toast.type === "error" ? "✕" : toast.type === "copy" ? "✓" : toast.type === "info" ? "ℹ" : "✓"}
              </span>
              <span className="flex-1 text-[13px] font-medium leading-snug">{toast.message}</span>
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] rounded-b-xl
                  ${toast.type === "error" ? "bg-red-400" : toast.type === "copy" ? "bg-emerald-400" : toast.type === "info" ? "bg-blue-400" : "bg-blue-500"}`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
