import { useTranslation } from 'react-i18next';
import { CATEGORIES, CATEGORY_STYLES } from '../../config/site';

export default function CategoryFilter({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div
      role="group"
      aria-label={t('catalog.filterLabel')}
      className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-3 pt-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
    >
      {CATEGORIES.map((cat) => {
        const style = CATEGORY_STYLES[cat];
        const active = value === cat;
        return (
          <button
            key={cat}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(cat)}
            className={`chip-toy ${
              active ? style.active : 'bg-white text-slate-700 hover:text-grape-600 dark:bg-night-800 dark:text-indigo-100 dark:hover:text-sunny-200'
            }`}
          >
            <span aria-hidden="true" className={active ? 'animate-wiggle' : ''}>
              {style.emoji}
            </span>
            {t(`catalog.categories.${cat}`)}
          </button>
        );
      })}
    </div>
  );
}
