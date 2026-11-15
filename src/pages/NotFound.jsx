import { useTranslation } from 'react-i18next';
import ToyButton from '../components/ui/ToyButton';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <img src="/toys/ball.svg" alt="" className="w-36 animate-float" />
      <p className="mt-4 font-display text-7xl text-coral-500 dark:text-sunny-300">404</p>
      <h1 className="mt-3 text-3xl font-black text-night-900 dark:text-white">{t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-lg font-semibold text-slate-600 dark:text-indigo-200">{t('notFound.text')}</p>
      <ToyButton to="/" variant="star" color="grape" size="lg" className="mt-8">
        {t('notFound.back')}
      </ToyButton>
    </section>
  );
}
