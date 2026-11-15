import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import CtaBanner from '../components/sections/CtaBanner';

const VALUES = [
  { key: 'safe', emoji: '🛡️', bubble: 'bg-mint-300', card: 'bg-mint-50 dark:bg-mint-500/10' },
  { key: 'joy', emoji: '😄', bubble: 'bg-sunny-300', card: 'bg-sunny-50 dark:bg-sunny-500/10' },
  { key: 'help', emoji: '🤝', bubble: 'bg-skyblue-300', card: 'bg-skyblue-50 dark:bg-skyblue-500/10' },
  { key: 'care', emoji: '💝', bubble: 'bg-coral-300', card: 'bg-coral-50 dark:bg-coral-500/10' },
];

const POLAROIDS = [
  { src: '/toys/bunny.svg', className: 'left-0 top-4 -rotate-6 bg-coral-100', delay: '0s' },
  { src: '/toys/train.svg', className: 'right-0 top-0 rotate-6 bg-skyblue-100', delay: '-1.5s' },
  { src: '/toys/xylophone.svg', className: 'bottom-0 left-1/2 -translate-x-1/2 rotate-3 bg-sunny-100', delay: '-3s' },
];

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <section className="section">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle as="h1" align="left" eyebrow={t('about.eyebrow')} title={t('about.title')} />
            <div className="-mt-4 space-y-4 text-lg font-semibold leading-relaxed text-slate-700 dark:text-indigo-100">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
              <p>{t('about.story3')}</p>
            </div>
            <p className="mt-6 inline-block -rotate-2 rounded-2xl bg-white px-5 py-3 text-lg font-black text-grape-600 shadow-toy dark:bg-night-800 dark:text-sunny-200">
              {t('about.signature')}
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
            <div className="absolute inset-[12%] animate-blob bg-gradient-to-br from-mint-300 via-skyblue-300 to-grape-300 dark:from-grape-600 dark:to-night-600" />
            {POLAROIDS.map((p) => (
              <div key={p.src} className={`absolute w-[46%] rounded-3xl border-[6px] border-white p-3 shadow-toy-lg dark:border-night-800 ${p.className}`}>
                <img src={p.src} alt="" className="aspect-square w-full animate-float-slow" style={{ animationDelay: p.delay }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0 md:pt-0">
        <h2 className="mb-10 text-center font-display text-3xl text-grape-700 sm:text-4xl dark:text-white">{t('about.valuesTitle')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ key, emoji, bubble, card }, i) => (
            <Reveal key={key} delay={i * 90} className="h-full">
              <article className={`card-toy group h-full p-6 text-center transition-transform duration-300 hover:-translate-y-2 ${card}`}>
                <span className={`mx-auto grid h-20 w-20 place-items-center rounded-full text-4xl shadow-[0_5px_0_rgba(45,34,80,0.15)] transition-transform group-hover:animate-jelly ${bubble}`}>
                  {emoji}
                </span>
                <h3 className="mt-5 text-xl font-black text-night-900 dark:text-white">{t(`about.values.${key}.title`)}</h3>
                <p className="mt-2 font-semibold text-slate-600 dark:text-indigo-200">{t(`about.values.${key}.text`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
