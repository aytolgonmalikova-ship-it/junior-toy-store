import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../../config/site';
import { useScrolled } from '../../hooks/useScrolled';
import Logo from '../ui/Logo';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeToggle from '../ui/ThemeToggle';
import AdminToggle from '../admin/AdminToggle';

function BurgerButton({ open, onClick, label }) {
  const bar = 'absolute left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-current transition-all duration-300';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="relative h-11 w-11 shrink-0 rounded-2xl bg-grape-500 text-white shadow-[0_4px_0_#5E35BF] transition active:translate-y-1 active:shadow-[0_1px_0_#5E35BF] xl:hidden"
    >
      <span className={`${bar} ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-3'}`} />
      <span className={`${bar} top-1/2 -translate-y-1/2 ${open ? 'scale-x-0 opacity-0' : ''}`} />
      <span className={`${bar} ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-3'}`} />
    </button>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const scrolled = useScrolled(12);
  const isAdmin = pathname.startsWith('/admin');
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-7xl rounded-3xl border-2 border-white/80 bg-white/85 backdrop-blur-md transition-shadow duration-300 dark:border-white/10 dark:bg-night-900/80 ${
          scrolled ? 'shadow-toy' : 'shadow-md'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5">
          <Logo />

          {isAdmin ? (
            <p className="hidden items-center gap-2 rounded-full bg-grape-100 px-4 py-2 font-black text-grape-700 md:flex dark:bg-grape-500/20 dark:text-grape-200">
              <span aria-hidden="true">🛠️</span> {t('admin.toggle.toAdmin')}
            </p>
          ) : (
          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map(({ to, key }) => (
              <NavLink
                key={key}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-2 text-[0.9rem] font-extrabold transition-all duration-200 2xl:px-4 2xl:text-base ${
                    isActive
                      ? 'bg-sunny-300 text-night-900 shadow-[0_3px_0_#D99A00] dark:bg-grape-500 dark:text-white dark:shadow-[0_3px_0_#5E35BF]'
                      : 'text-slate-700 hover:-translate-y-0.5 hover:bg-skyblue-100 hover:text-skyblue-700 dark:text-indigo-100 dark:hover:bg-white/10 dark:hover:text-sunny-200'
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>
          )}

          <div className="flex items-center gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <AdminToggle isAdmin={isAdmin} className={isAdmin ? 'inline-flex' : 'hidden sm:inline-flex'} />
            {!isAdmin && (
              <BurgerButton open={open} onClick={() => setOpen((v) => !v)} label={open ? t('header.closeMenu') : t('header.openMenu')} />
            )}
          </div>
        </div>

        {open && !isAdmin && (
          <div id="mobile-menu" className="max-h-[calc(100dvh-6rem)] animate-pop-in overflow-y-auto px-3 pb-4 xl:hidden">
            <nav aria-label="Mobile" className="grid gap-2 sm:grid-cols-2">
              {NAV_ITEMS.map(({ to, key, emoji, tint }, i) => (
                <NavLink
                  key={key}
                  to={to}
                  end={to === '/'}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={({ isActive }) =>
                    `flex animate-pop-in items-center gap-3 rounded-2xl px-4 py-3 text-lg font-extrabold transition ${tint} ${
                      isActive ? 'ring-4 ring-sunny-300 dark:ring-grape-500' : 'hover:translate-x-1'
                    }`
                  }
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl shadow-sm dark:bg-night-900">{emoji}</span>
                  {t(`nav.${key}`)}
                </NavLink>
              ))}
              <NavLink
                to="/admin"
                className="flex animate-pop-in items-center gap-3 rounded-2xl bg-night-800 px-4 py-3 text-lg font-extrabold text-white transition hover:translate-x-1 sm:hidden dark:bg-sunny-300 dark:text-night-900"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-xl">🛠️</span>
                {t('admin.toggle.toAdmin')}
              </NavLink>
            </nav>
            <LanguageSwitcher className="mx-auto mt-4 flex w-fit sm:hidden" />
          </div>
        )}
      </div>
    </header>
  );
}
