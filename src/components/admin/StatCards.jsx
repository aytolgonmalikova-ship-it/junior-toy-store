const TONES = {
  coral: 'bg-coral-400 [--edge:#E84E5A]',
  mint: 'bg-mint-400 [--edge:#22B583]',
  sunny: 'bg-sunny-400 [--edge:#E5A800]',
  sky: 'bg-skyblue-400 [--edge:#1C8FE0]',
};

/** Dashboard stat tiles. `items`: [{ key, label, value, emoji, tone }] */
export default function StatCards({ items }) {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ key, label, value, emoji, tone }) => (
        <li
          key={key}
          className={`relative overflow-hidden rounded-3xl p-4 text-night-900 shadow-[0_6px_0_var(--edge)] sm:p-5 ${TONES[tone]}`}
        >
          <span aria-hidden="true" className="absolute -right-3 -top-3 text-6xl opacity-25 sm:text-7xl">
            {emoji}
          </span>
          <p className="relative text-xs font-black uppercase tracking-wide text-night-900/75 sm:text-sm">{label}</p>
          <p className="relative mt-1 text-2xl font-black sm:text-3xl">{value}</p>
        </li>
      ))}
    </ul>
  );
}
