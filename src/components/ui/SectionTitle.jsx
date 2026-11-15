import Squiggle from './Squiggle';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', as: Heading = 'h2' }) {
  const centered = align === 'center';
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="inline-flex -rotate-2 items-center gap-2 rounded-full bg-sunny-300 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-night-900 shadow-[0_3px_0_#D99A00] sm:text-sm dark:bg-grape-500 dark:text-white dark:shadow-[0_3px_0_#5E35BF]">
          ⭐ {eyebrow}
        </span>
      )}
      <Heading className="mt-5 font-display text-3xl leading-tight text-grape-700 sm:text-4xl md:text-5xl dark:text-white">
        {title}
      </Heading>
      <Squiggle className={`mt-3 h-4 w-36 text-coral-400 dark:text-sunny-300 ${centered ? 'mx-auto' : ''}`} />
      {subtitle && <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-indigo-200">{subtitle}</p>}
    </div>
  );
}
