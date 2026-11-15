import { useTranslation } from 'react-i18next';

const STYLES = {
  super: { emoji: '👑', className: 'bg-sunny-300 text-night-900 shadow-[0_3px_0_#D99A00]' },
  admin: { emoji: '🛡️', className: 'bg-skyblue-200 text-skyblue-700 shadow-[0_3px_0_#5EC4FF] dark:bg-skyblue-500/25 dark:text-skyblue-200 dark:shadow-none' },
};

export default function RoleBadge({ role, size = 'md' }) {
  const { t } = useTranslation();
  const style = STYLES[role] ?? STYLES.admin;
  const sizing = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1.5 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-black ${sizing} ${style.className}`}>
      <span aria-hidden="true">{style.emoji}</span>
      {t(`admin.roles.${role}`)}
    </span>
  );
}

export function StatusBadge({ status }) {
  const { t } = useTranslation();
  const active = status === 'active';
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-black ${
        active ? 'bg-mint-100 text-mint-700 dark:bg-mint-500/20 dark:text-mint-200' : 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-200'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${active ? 'bg-mint-500' : 'bg-coral-500'}`} aria-hidden="true" />
      {t(`admin.status.${status}`)}
    </span>
  );
}
