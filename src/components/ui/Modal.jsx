import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const SIZES = { sm: 'sm:max-w-md', md: 'sm:max-w-2xl', lg: 'sm:max-w-4xl' };

/** Accessible modal dialog: Escape / backdrop closes it, focus moves inside, page scroll is locked. */
export default function Modal({ open, title, onClose, size = 'md', children }) {
  const { t } = useTranslation();
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const onKey = (e) => e.key === 'Escape' && onCloseRef.current();
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panelRef.current?.querySelector('input, select, textarea, button:not([data-close])');
    (first ?? panelRef.current)?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="absolute inset-0 bg-night-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative max-h-[92dvh] w-full animate-pop-in overflow-y-auto rounded-t-[2rem] border-2 border-white/80 bg-white p-5 shadow-toy-lg outline-none sm:rounded-[2rem] sm:p-8 dark:border-white/10 dark:bg-night-800 ${SIZES[size] ?? SIZES.md}`}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-black text-grape-700 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label={t('admin.close')}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl font-black text-slate-600 transition hover:rotate-90 hover:bg-coral-100 hover:text-coral-600 dark:bg-night-900 dark:text-indigo-200"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
