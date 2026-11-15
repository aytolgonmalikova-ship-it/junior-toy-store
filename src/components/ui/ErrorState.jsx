import { useTranslation } from 'react-i18next';
import errorBear from '../../assets/error-bear.svg';
import ToyButton from './ToyButton';

/** Friendly error message with a retry button. */
export default function ErrorState({ error, onRetry }) {
  const { t } = useTranslation();
  return (
    <div role="alert" className="card-toy mx-auto max-w-lg animate-pop-in p-8 text-center sm:p-10">
      <img src={errorBear} alt="" className="mx-auto w-44 origin-bottom animate-wiggle [animation-duration:2.4s] sm:w-52" />
      <h3 className="mt-5 text-2xl font-black text-coral-600 sm:text-3xl dark:text-coral-300">{t('error.title')}</h3>
      <p className="mt-3 font-semibold text-slate-600 dark:text-indigo-200">{t('error.text')}</p>
      {error?.status && (
        <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-indigo-300/70">
          {t('error.code', { code: error.status })}
        </p>
      )}
      <ToyButton onClick={onRetry} variant="star" color="grape" className="mt-7">
        {t('error.retry')}
      </ToyButton>
    </div>
  );
}
