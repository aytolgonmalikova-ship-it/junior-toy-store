import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/** Header switch between the shop front and the admin panel. */
export default function AdminToggle({ isAdmin, className = '' }) {
  const { t } = useTranslation();
  const label = isAdmin ? t('admin.toggle.toShop') : t('admin.toggle.toAdmin');
  return (
    <Link
      to={isAdmin ? '/' : '/admin'}
      title={label}
      aria-label={label}
      className={`h-11 shrink-0 items-center gap-2 rounded-2xl px-3 text-sm font-black transition active:translate-y-1 ${
        isAdmin
          ? 'bg-mint-400 text-night-900 shadow-[0_4px_0_#178A63] hover:bg-mint-300 active:shadow-[0_1px_0_#178A63]'
          : 'bg-night-800 text-white shadow-[0_4px_0_#0A0826] hover:bg-night-700 active:shadow-[0_1px_0_#0A0826] dark:bg-sunny-300 dark:text-night-900 dark:shadow-[0_4px_0_#D99A00]'
      } ${className}`}
    >
      <span aria-hidden="true" className="text-lg">{isAdmin ? '🏪' : '🛠️'}</span>
      <span className={isAdmin ? 'hidden whitespace-nowrap sm:inline' : 'hidden whitespace-nowrap sm:inline xl:hidden 2xl:inline'}>{label}</span>
    </Link>
  );
}
