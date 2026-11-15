import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../../config/site';
import Logo from '../ui/Logo';
import ToyButton from '../ui/ToyButton';
import WhatsAppIcon from '../ui/WhatsAppIcon';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 px-3 pb-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white/90 shadow-toy-lg dark:bg-night-900/90">
        {/* scalloped top edge */}
        <div aria-hidden="true" className="h-3 bg-[radial-gradient(circle_at_12px_0,transparent_12px,#FFD23F_13px)] bg-[length:24px_12px] dark:bg-[radial-gradient(circle_at_12px_0,transparent_12px,#9B6BFF_13px)]" />
        <div className="grid gap-10 px-6 py-10 sm:px-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-semibold text-slate-600 dark:text-indigo-200">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-lg font-black text-grape-700 dark:text-sunny-200">{t('footer.navTitle')}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_ITEMS.map(({ to, key, emoji }) => (
                <li key={key}>
                  <Link to={to} className="inline-flex items-center gap-1.5 font-bold text-slate-600 transition hover:translate-x-1 hover:text-coral-500 dark:text-indigo-200 dark:hover:text-sunny-300">
                    <span aria-hidden="true">{emoji}</span>
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black text-grape-700 dark:text-sunny-200">{t('footer.contactTitle')}</h3>
            <a href={PHONE_HREF} className="mt-4 block text-2xl font-black text-night-900 transition hover:text-coral-500 dark:text-white dark:hover:text-sunny-300">
              {PHONE_DISPLAY}
            </a>
            <ToyButton href={WHATSAPP_URL} color="whatsapp" size="sm" className="mt-4" icon={<WhatsAppIcon className="h-5 w-5" />}>
              WhatsApp
            </ToyButton>
          </div>
        </div>
        <div className="border-t-2 border-dashed border-sunny-200 px-6 py-5 text-center text-sm font-bold text-slate-500 dark:border-night-700 dark:text-indigo-300">
          © {year} Junior. {t('footer.rights')} 💛
        </div>
      </div>
    </footer>
  );
}
