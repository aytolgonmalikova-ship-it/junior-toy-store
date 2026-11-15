import { useTranslation } from 'react-i18next';
import Loader from '../ui/Loader';
import ErrorState from '../ui/ErrorState';
import Reveal from '../ui/Reveal';
import ToyCard from './ToyCard';

/** Renders the right UI for each request state: loading → error → empty → grid. */
export default function ToyCollection({ status, data, error, onRetry }) {
  const { t } = useTranslation();

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <ErrorState error={error} onRetry={onRetry} />;
  if (!data.length) {
    return (
      <div className="card-toy mx-auto max-w-md p-10 text-center">
        <img src="/toys/kite.svg" alt="" className="mx-auto w-28 animate-float" />
        <p className="mt-4 text-lg font-bold text-slate-600 dark:text-indigo-200">{t('catalog.empty')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 min-[460px]:grid-cols-2 md:gap-7 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((toy, i) => (
        <Reveal key={toy._id} delay={(i % 4) * 80} className="h-full">
          <ToyCard toy={toy} />
        </Reveal>
      ))}
    </div>
  );
}
