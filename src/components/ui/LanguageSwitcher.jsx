import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../config/site';

export default function LanguageSwitcher({ className = '' }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      role="group"
      aria-label={t('header.language')}
      className={`items-center gap-1 rounded-full border-2 border-sunny-200 bg-sunny-50 p-1 dark:border-night-600 dark:bg-night-800 ${className}`}
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = current === code;
        return (
          <button
            key={code}
            type="button"
            lang={code === 'kg' ? 'ky' : code}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(code)}
            className={`min-w-[2.6rem] rounded-full px-2.5 py-1.5 text-sm font-black transition-all duration-200 ${
              active
                ? '-translate-y-0.5 bg-coral-500 text-white shadow-[0_3px_0_#C23A47]'
                : 'text-slate-600 hover:bg-white hover:text-coral-500 dark:text-indigo-200 dark:hover:bg-white/10 dark:hover:text-sunny-300'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
