import { useTranslation } from 'react-i18next';
import { WHATSAPP_URL } from '../../config/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';

/** Fixed floating WhatsApp button with a soft pulse. */
export default function WhatsAppFab() {
  const { t } = useTranslation();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('fab.label')}
      className="group fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
      <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366] [animation-delay:1s]" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_6px_0_#128C7E,0_14px_24px_rgba(18,140,126,0.45)] transition-all duration-200 group-hover:-translate-y-1 group-hover:-rotate-12 group-active:translate-y-1 group-active:shadow-[0_2px_0_#128C7E]">
        <WhatsAppIcon className="h-9 w-9" />
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-4 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-night-900 opacity-0 shadow-toy transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:block dark:bg-night-800 dark:text-white">
        {t('fab.tooltip')}
      </span>
    </a>
  );
}
