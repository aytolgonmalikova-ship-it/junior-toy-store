import { useTranslation } from 'react-i18next';
import ToyButton from '../ui/ToyButton';
import HeroIllustration from './HeroIllustration';

const PERKS = [
  { key: 'safe', emoji: '🛡️', tint: 'bg-mint-100 text-mint-700 dark:bg-mint-500/20 dark:text-mint-200' },
  { key: 'help', emoji: '💡', tint: 'bg-sunny-100 text-sunny-700 dark:bg-sunny-500/20 dark:text-sunny-200' },
  { key: 'delivery', emoji: '🚚', tint: 'bg-skyblue-100 text-skyblue-700 dark:bg-skyblue-500/20 dark:text-skyblue-200' },
];

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="section grid items-center gap-12 pt-10 md:pt-14 lg:grid-cols-2 lg:gap-8">
      <div className="animate-pop-in text-center lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-coral-200 bg-white/80 px-4 py-2 text-sm font-extrabold text-coral-600 shadow-sm dark:border-grape-500/40 dark:bg-night-800/80 dark:text-coral-300">
          <span className="animate-wiggle">🎈</span> {t('hero.badge')}
        </span>

        <h1 className="mt-6 text-4xl font-black leading-[1.1] text-night-900 sm:text-5xl xl:text-6xl dark:text-white">
          {t('hero.titleStart')}
          <span className="mt-3 block bg-gradient-to-r from-coral-500 via-sunny-500 to-grape-500 bg-clip-text pb-2 font-display text-transparent dark:from-sunny-300 dark:via-coral-300 dark:to-skyblue-300">
            {t('hero.titleAccent')}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-slate-600 sm:text-xl lg:mx-0 dark:text-indigo-200">{t('hero.subtitle')}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
          <ToyButton to="/catalog" variant="rocket" color="coral" size="lg">
            {t('hero.ctaChoose')}
          </ToyButton>
          <ToyButton to="/services" variant="bear" color="yellow" size="lg">
            🎁 {t('hero.ctaGift')}
          </ToyButton>
        </div>

        <ul className="mt-9 flex flex-wrap justify-center gap-2.5 lg:justify-start">
          {PERKS.map(({ key, emoji, tint }) => (
            <li key={key} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-extrabold ${tint}`}>
              <span aria-hidden="true">{emoji}</span>
              {t(`hero.perks.${key}`)}
            </li>
          ))}
        </ul>
      </div>

      <HeroIllustration />
    </section>
  );
}
