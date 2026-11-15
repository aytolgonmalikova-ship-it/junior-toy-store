import { useTranslation } from 'react-i18next';

const FLOATERS = [
  { src: '/toys/kite.svg', className: 'left-[4%] top-[4%] w-[21%]', delay: '-2s' },
  { src: '/toys/rocket.svg', className: 'right-[3%] top-[2%] w-[24%]', delay: '0s' },
  { src: '/toys/ball.svg', className: 'bottom-[5%] left-[1%] w-[22%]', delay: '-1.2s' },
  { src: '/toys/blocks.svg', className: 'bottom-[1%] right-[3%] w-[25%]', delay: '-3.1s' },
  { src: '/toys/car.svg', className: 'left-[-2%] top-[40%] w-[18%]', delay: '-4s' },
];

const SPARKLES = [
  'left-[30%] top-[6%] h-5 w-5',
  'right-[28%] top-[20%] h-4 w-4',
  'bottom-[22%] left-[28%] h-6 w-6',
  'right-[6%] top-[48%] h-5 w-5',
];

function Sparkle({ className, delay }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute animate-twinkle ${className}`} style={{ animationDelay: delay }} aria-hidden="true">
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" fill="#FFC21A" />
    </svg>
  );
}

export default function HeroIllustration() {
  const { t } = useTranslation();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div aria-hidden="true" className="absolute inset-[9%] animate-blob bg-gradient-to-br from-sunny-300 via-coral-300 to-grape-300 shadow-[inset_0_-24px_0_rgba(45,34,80,0.08)] dark:from-grape-600 dark:via-night-600 dark:to-skyblue-600" />
      <div aria-hidden="true" className="absolute inset-[3%] animate-spin-slow rounded-full border-4 border-dashed border-white/80 dark:border-white/20" />

      <div className="absolute inset-0 grid place-items-center">
        <img src="/toys/teddy.svg" alt={t('hero.mascotAlt')} className="w-[52%] animate-float drop-shadow-[0_24px_24px_rgba(45,34,80,0.3)]" />
      </div>

      <div className="absolute left-1/2 top-[13%] -translate-x-1/2">
        <div className="relative -rotate-6 animate-pop-in whitespace-nowrap rounded-2xl border-2 border-night-900/10 bg-white px-4 py-2 text-sm font-black text-coral-500 shadow-toy [animation-delay:0.4s] sm:text-base dark:bg-night-800 dark:text-sunny-300">
          {t('hero.bubble')}
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white dark:bg-night-800" />
        </div>
      </div>

      {FLOATERS.map((f) => (
        <img key={f.src} src={f.src} alt="" aria-hidden="true" className={`absolute animate-float-slow drop-shadow-xl ${f.className}`} style={{ animationDelay: f.delay }} />
      ))}
      {SPARKLES.map((cls, i) => (
        <Sparkle key={cls} className={cls} delay={`${i * 0.7}s`} />
      ))}
    </div>
  );
}
