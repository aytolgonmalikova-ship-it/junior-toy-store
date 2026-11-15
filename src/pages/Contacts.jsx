import { useTranslation } from 'react-i18next';
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../config/site';
import SectionTitle from '../components/ui/SectionTitle';
import ToyButton from '../components/ui/ToyButton';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';

export default function Contacts() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <SectionTitle as="h1" eyebrow={t('contacts.eyebrow')} title={t('contacts.title')} subtitle={t('contacts.subtitle')} />

      <div className="card-toy relative mx-auto mt-20 max-w-3xl px-6 pb-10 pt-20 text-center sm:px-12">
        <img src="/toys/teddy.svg" alt="" className="absolute -top-16 left-1/2 w-32 -translate-x-1/2 animate-float drop-shadow-xl" />
        <span aria-hidden="true" className="absolute right-[18%] top-2 animate-twinkle text-3xl">💬</span>
        <span aria-hidden="true" className="absolute left-[18%] top-6 animate-twinkle text-2xl [animation-delay:1s]">💛</span>

        <h2 className="text-2xl font-black text-night-900 sm:text-3xl dark:text-white">{t('contacts.cardTitle')}</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg font-semibold text-slate-600 dark:text-indigo-200">{t('contacts.cardText')}</p>

        <ToyButton href={WHATSAPP_URL} color="whatsapp" size="xl" className="mt-9" icon={<WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />}>
          {t('contacts.whatsapp')}
        </ToyButton>

        <div className="mt-10">
          <p className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-indigo-300">{t('contacts.phoneLabel')}</p>
          <a href={PHONE_HREF} className="mt-1 inline-block text-3xl font-black text-grape-700 transition hover:scale-105 hover:text-coral-500 sm:text-4xl dark:text-sunny-200 dark:hover:text-coral-300">
            {PHONE_DISPLAY}
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          <li className="rounded-full bg-mint-100 px-4 py-2 font-extrabold text-mint-700 dark:bg-mint-500/20 dark:text-mint-200">⚡ {t('contacts.noteFast')}</li>
          <li className="rounded-full bg-sunny-100 px-4 py-2 font-extrabold text-sunny-700 dark:bg-sunny-500/20 dark:text-sunny-200">📦 {t('contacts.notePickup')}</li>
        </ul>
      </div>
    </section>
  );
}
