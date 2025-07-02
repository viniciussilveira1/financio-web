import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastIcons: Record<ToastType, JSX.Element> = {
  success: <AiOutlineCheckCircle className='text-green-500' size={24} />,
  error: <AiOutlineCloseCircle className='text-red-500' size={24} />,
  warning: <AiOutlineWarning className='text-yellow-500' size={24} />,
  info: <AiOutlineInfoCircle className='text-blue-500' size={24} />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className='fixed top-6 right-6 z-50 space-y-3 flex flex-col items-end'>
        <AnimatePresence>
          {toasts.map(({ id, message, type = "success" }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-center gap-3 min-w-[260px] max-w-xs px-5 py-3 rounded-lg shadow-lg border-l-4 ${getToastStyles(
                type
              )} bg-white`}
              style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
            >
              <span>{toastIcons[type]}</span>
              <span className='flex-1 text-gray-800 font-medium'>
                {message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case "error":
      return "border-red-500";
    case "warning":
      return "border-yellow-400";
    case "info":
      return "border-blue-400";
    default:
      return "border-green-500";
  }
};
