import { useTranslation } from 'react-i18next';

/** Bouncing ball loading indicator. */
export default function Loader({ label, className = '' }) {
  const { t } = useTranslation();
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="relative h-36 w-20">
        <div className="loader-ball absolute left-1/2 top-0 -ml-8 h-16 w-16 rounded-full" />
        <div className="loader-shadow absolute bottom-0 left-1/2 -ml-8 h-3 w-16 rounded-full bg-night-900/20 dark:bg-black/50" />
      </div>
      <p className="mt-5 flex items-end gap-1 text-lg font-extrabold text-grape-600 dark:text-sunny-200">
        {label ?? t('loading.text')}
        <span className="mb-1.5 inline-flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      </p>
    </div>
  );
}
