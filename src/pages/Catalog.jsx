import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../config/site';
import { useToys } from '../hooks/useToys';
import SectionTitle from '../components/ui/SectionTitle';
import CategoryFilter from '../components/catalog/CategoryFilter';
import ToyCollection from '../components/catalog/ToyCollection';

export default function Catalog() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const requested = params.get('category');
  const category = CATEGORIES.includes(requested) ? requested : 'all';

  const { status, data, error, retry, simulateError } = useToys({ category });

  const handleCategory = (next) => setParams(next === 'all' ? {} : { category: next }, { replace: true });

  return (
    <section className="section">
      <SectionTitle as="h1" eyebrow={t('catalog.eyebrow')} title={t('catalog.title')} subtitle={t('catalog.subtitle')} />

      <CategoryFilter value={category} onChange={handleCategory} />

      <div className="mb-8 mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="min-h-[1.75rem] text-lg font-extrabold text-grape-700 dark:text-sunny-200" aria-live="polite">
          {status === 'success' && t('catalog.found', { total: data.length })}
        </p>

        {/* Demo controls to showcase the Loading / Error states of the mock API */}
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-3xl border-2 border-dashed border-grape-300 bg-white/70 px-3 py-1.5 text-sm font-bold dark:border-grape-500/50 dark:bg-night-800/70">
          <span className="text-slate-500 dark:text-indigo-300">🧪 {t('catalog.demo.label')}</span>
          <button
            type="button"
            onClick={retry}
            disabled={status === 'loading'}
            className="rounded-full px-2.5 py-1 text-skyblue-700 transition hover:bg-skyblue-100 disabled:opacity-50 dark:text-skyblue-300 dark:hover:bg-white/10"
          >
            🔄 {t('catalog.demo.reload')}
          </button>
          <button
            type="button"
            onClick={simulateError}
            disabled={status === 'loading'}
            className="rounded-full px-2.5 py-1 text-coral-600 transition hover:bg-coral-100 disabled:opacity-50 dark:text-coral-300 dark:hover:bg-white/10"
          >
            💥 {t('catalog.demo.error')}
          </button>
        </div>
      </div>

      <ToyCollection status={status} data={data} error={error} onRetry={retry} />
    </section>
  );
}
