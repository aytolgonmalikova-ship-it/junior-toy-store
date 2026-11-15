import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LETTERS = [
  ['J', 'text-coral-500'],
  ['u', 'text-sunny-500'],
  ['n', 'text-mint-500'],
  ['i', 'text-skyblue-500'],
  ['o', 'text-grape-500'],
  ['r', 'text-coral-400'],
];

export default function Logo({ className = '' }) {
  const { t } = useTranslation();
  return (
    <Link to="/" aria-label={t('header.home')} className={`group flex shrink-0 items-center gap-2 ${className}`}>
      <span className="grid h-11 w-11 -rotate-12 place-items-center rounded-2xl bg-sunny-300 shadow-[0_4px_0_#D99A00] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 dark:bg-sunny-400">
        <img src="/favicon.svg" alt="" className="h-8 w-8" />
      </span>
      <span className="font-display text-3xl leading-none drop-shadow-[0_3px_0_rgba(45,34,80,0.25)] sm:text-[2.1rem]">
        {LETTERS.map(([letter, color], i) => (
          <span
            key={i}
            className={`inline-block ${color} transition-transform duration-300 group-hover:-translate-y-1.5`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </Link>
  );
}
