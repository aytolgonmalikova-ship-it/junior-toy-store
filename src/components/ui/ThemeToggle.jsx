import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

function Sun() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <g stroke="#B36B00" strokeWidth="2" strokeLinecap="round">
        <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
      </g>
      <circle cx="12" cy="12" r="5" fill="#FFF3C4" stroke="#B36B00" strokeWidth="1.8" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="#FFE17A" stroke="#2D2250" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="10" cy="13" r="1.3" fill="#E5A800" />
      <circle cx="13.5" cy="17" r="0.9" fill="#E5A800" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? t('header.toLight') : t('header.toDark');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className="relative h-11 w-[4.6rem] shrink-0 overflow-hidden rounded-full border-2 border-skyblue-400 bg-skyblue-300 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15)] transition-colors duration-500 dark:border-grape-500 dark:bg-night-800"
    >
      {/* clouds (day) */}
      <span aria-hidden="true" className={`absolute right-2 top-2 h-2.5 w-5 rounded-full bg-white transition-all duration-500 ${isDark ? 'translate-y-6 opacity-0' : 'opacity-90'}`} />
      <span aria-hidden="true" className={`absolute bottom-2 right-4 h-2 w-4 rounded-full bg-white transition-all duration-500 ${isDark ? 'translate-y-6 opacity-0' : 'opacity-80'}`} />
      {/* stars (night) */}
      {[
        'left-3 top-2',
        'left-6 bottom-2.5',
        'left-2 bottom-4',
      ].map((pos, i) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} h-1 w-1 rounded-full bg-sunny-200 transition-opacity duration-500 ${isDark ? 'animate-twinkle opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      <span
        className={`absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark ? 'left-[calc(100%-2.3rem)] rotate-[360deg] bg-indigo-100' : 'left-1 rotate-0 bg-sunny-400 shadow-[0_0_14px_#FFC21A]'
        }`}
      >
        {isDark ? <Moon /> : <Sun />}
      </span>
    </button>
  );
}
