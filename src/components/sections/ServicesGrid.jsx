import { useTranslation } from 'react-i18next';
import Reveal from '../ui/Reveal';

const SERVICES = [
  { key: 'personal', image: '/toys/teddy.svg', deco: 'bear', card: 'bg-coral-400 [--face:#FF8A8A] [--edge:#E84E5A]' },
  { key: 'educational', image: '/toys/pyramid.svg', deco: 'star', card: 'bg-mint-400 [--face:#6BE3B9] [--edge:#22B583]' },
  { key: 'constructors', image: '/toys/blocks.svg', deco: 'lego', card: 'bg-skyblue-400 [--face:#5EC4FF] [--edge:#1C8FE0]' },
  { key: 'events', image: '/toys/gift.svg', deco: 'bow', card: 'bg-sunny-400 [--face:#FFD23F] [--edge:#E5A800]' },
];

function Deco({ type }) {
  switch (type) {
    case 'bear':
      return ['left-5', 'right-5'].map((side) => (
        <span key={side} aria-hidden="true" className={`absolute -top-5 ${side} grid h-14 w-14 place-items-center rounded-full bg-[var(--face)]`}>
          <span className="h-6 w-6 rounded-full bg-white/50" />
        </span>
      ));
    case 'lego':
      return (
        <span aria-hidden="true" className="absolute -top-4 inset-x-6 flex justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-5 w-10 rounded-t-xl bg-[var(--face)] shadow-[inset_0_4px_0_rgba(255,255,255,0.45)]" />
          ))}
        </span>
      );
    case 'star':
      return ['-left-3 -top-3 h-12 w-12', '-right-2 top-10 h-8 w-8'].map((cls, i) => (
        <svg key={cls} viewBox="0 0 24 24" aria-hidden="true" className={`absolute ${cls} animate-wiggle [animation-duration:3s]`} style={{ animationDelay: `${i * 0.5}s` }}>
          <path d="M12 2.5l2.8 6 6.5.6-4.9 4.4 1.5 6.4L12 16.6 6.1 19.9l1.5-6.4L2.7 9.1l6.5-.6z" fill="#FFE17A" stroke="#2D2250" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ));
    case 'bow':
      return (
        <svg viewBox="0 0 64 40" aria-hidden="true" className="absolute -top-7 right-6 h-12 w-20 rotate-12">
          <g stroke="#2D2250" strokeWidth="3" strokeLinejoin="round">
            <ellipse cx="18" cy="18" rx="16" ry="10" fill="#FF6B6B" transform="rotate(-20 18 18)" />
            <ellipse cx="46" cy="18" rx="16" ry="10" fill="#FF6B6B" transform="rotate(20 46 18)" />
            <circle cx="32" cy="22" r="7" fill="#FF8A8A" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesGrid() {
  const { t } = useTranslation();
  return (
    <div className="grid gap-x-6 gap-y-12 pt-4 sm:grid-cols-2 xl:grid-cols-4">
      {SERVICES.map(({ key, image, deco, card }, i) => {
        const points = t(`services.items.${key}.points`, { returnObjects: true });
        return (
          <Reveal key={key} delay={i * 90} className="h-full">
            <article
              className={`group relative flex h-full flex-col rounded-[2rem] p-6 pt-9 text-night-900 shadow-[0_8px_0_var(--edge),0_24px_40px_-14px_rgba(45,34,80,0.45)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 ${card}`}
            >
              <Deco type={deco} />
              <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full border-4 border-white bg-white/90 shadow-lg dark:bg-night-900/85">
                <img src={image} alt="" className="h-24 w-24 transition-transform group-hover:animate-jelly" />
              </div>
              <h3 className="relative mt-5 text-center text-xl font-black leading-snug">{t(`services.items.${key}.title`)}</h3>
              <p className="relative mt-3 text-center font-semibold text-night-900/80">{t(`services.items.${key}.text`)}</p>
              {Array.isArray(points) && (
                <ul className="relative mt-auto flex flex-wrap justify-center gap-2 pt-5">
                  {points.map((p) => (
                    <li key={p} className="rounded-full bg-white/60 px-3 py-1 text-sm font-extrabold">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
