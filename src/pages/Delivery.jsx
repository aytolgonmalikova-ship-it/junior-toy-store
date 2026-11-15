import { useTranslation } from 'react-i18next';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import ToyButton from '../components/ui/ToyButton';

const METHODS = [
  { key: 'courier', emoji: '🚚', card: 'bg-skyblue-400 [--edge:#1C8FE0]', anim: 'group-hover:translate-x-3' },
  { key: 'pickup', emoji: '📦', card: 'bg-sunny-400 [--edge:#E5A800]', anim: 'group-hover:-translate-y-2 group-hover:rotate-6' },
];

const STEPS = [
  { key: 'choose', emoji: '🧸', color: 'bg-coral-400' },
  { key: 'message', emoji: '💬', color: 'bg-mint-400' },
  { key: 'receive', emoji: '🎉', color: 'bg-grape-400' },
];

function Heading({ children }) {
  return <h2 className="mb-6 text-2xl font-black text-grape-700 sm:text-3xl dark:text-sunny-200">{children}</h2>;
}

export default function Delivery() {
  const { t } = useTranslation();
  const cashPoints = t('delivery.cash.points', { returnObjects: true });

  return (
    <section className="section">
      <SectionTitle as="h1" eyebrow={t('delivery.eyebrow')} title={t('delivery.title')} subtitle={t('delivery.subtitle')} />

      <Heading>{t('delivery.methodsTitle')}</Heading>
      <div className="grid gap-6 md:grid-cols-2">
        {METHODS.map(({ key, emoji, card, anim }, i) => (
          <Reveal key={key} delay={i * 100} className="h-full">
            <article className={`group flex h-full items-start gap-5 rounded-[2rem] p-6 text-night-900 shadow-[0_8px_0_var(--edge),0_24px_40px_-14px_rgba(45,34,80,0.4)] transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${card}`}>
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-white text-5xl shadow-md dark:bg-night-900">
                <span className={`transition-transform duration-500 ${anim}`}>{emoji}</span>
              </span>
              <div>
                <h3 className="text-2xl font-black">{t(`delivery.${key}.title`)}</h3>
                <p className="mt-2 text-lg font-semibold text-night-900/80">{t(`delivery.${key}.text`)}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Heading>{t('delivery.paymentTitle')}</Heading>
        <Reveal>
          <article className="relative overflow-hidden rounded-[2rem] bg-mint-400 p-6 text-night-900 shadow-[0_8px_0_#22B583,0_24px_40px_-14px_rgba(45,34,80,0.4)] sm:p-8">
            <span aria-hidden="true" className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/25" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-white text-5xl shadow-md dark:bg-night-900">💵</span>
              <div className="flex-1">
                <h3 className="text-2xl font-black">{t('delivery.cash.title')}</h3>
                <p className="mt-2 text-lg font-semibold text-night-900/80">{t('delivery.cash.text')}</p>
                {Array.isArray(cashPoints) && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cashPoints.map((p) => (
                      <li key={p} className="rounded-full bg-white/70 px-4 py-1.5 font-extrabold">
                        ✅ {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <div className="mt-16">
        <Heading>{t('delivery.stepsTitle')}</Heading>
        <ol className="relative grid gap-8 md:grid-cols-3">
          <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-10 hidden border-t-4 border-dashed border-grape-300 md:block dark:border-grape-500/50" />
          {STEPS.map(({ key, emoji, color }, i) => (
            <Reveal as="li" key={key} delay={i * 120} className="relative text-center">
              <span className={`relative mx-auto grid h-20 w-20 place-items-center rounded-full text-4xl shadow-[0_6px_0_rgba(45,34,80,0.2)] ${color}`}>
                {emoji}
                <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-night-900 text-sm font-black text-white dark:bg-white dark:text-night-900">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-4 text-xl font-black text-night-900 dark:text-white">{t(`delivery.steps.${key}.title`)}</h3>
              <p className="mx-auto mt-2 max-w-xs font-semibold text-slate-600 dark:text-indigo-200">{t(`delivery.steps.${key}.text`)}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <ToyButton to="/catalog" variant="rocket" color="coral" size="lg">
            {t('hero.ctaChoose')}
          </ToyButton>
        </div>
      </div>
    </section>
  );
}
