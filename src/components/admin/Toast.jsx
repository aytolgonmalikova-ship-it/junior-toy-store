import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Set());

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const notify = useCallback((message, tone = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    const timer = setTimeout(() => {
      setToasts((list) => list.filter((toast) => toast.id !== id));
      timers.current.delete(timer);
    }, 2800);
    timers.current.add(timer);
  }, []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-pop-in rounded-2xl px-5 py-3 text-center font-extrabold shadow-toy-lg ${
              toast.tone === 'info' ? 'bg-skyblue-500 text-white' : 'bg-night-900 text-white dark:bg-sunny-300 dark:text-night-900'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
