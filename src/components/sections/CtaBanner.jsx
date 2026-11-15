import { useTranslation } from 'react-i18next';
import { buildWhatsAppLink } from '../../config/site';
import ToyButton from '../ui/ToyButton';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import Reveal from '../ui/Reveal';

/** Colorful "write to us" banner. `message` picks the pre-filled WhatsApp text. */
export default function CtaBanner({ message = 'general' }) {
  const { t } = useTranslation();
  return (
    <section className="section pt-0 md:pt-0">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-grape-500 via-coral-400 to-sunny-400 p-8 text-white shadow-toy-lg sm:p-12 dark:from-grape-700 dark:via-night-600 dark:to-skyblue-600">
          <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15" />
          <div aria-hidden="true" className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/10" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl leading-tight text-shadow-toy sm:text-4xl">{t('cta.title')}</h2>
              <p className="mt-4 max-w-xl text-lg font-bold text-white/90">{t('cta.text')}</p>
              <ToyButton
                href={buildWhatsAppLink(t(`whatsapp.${message}`))}
                color="whatsapp"
                size="lg"
                className="mt-8"
                icon={<WhatsAppIcon className="h-6 w-6" />}
              >
                {t('cta.button')}
              </ToyButton>
            </div>
            <img src="/toys/gift.svg" alt="" className="mx-auto hidden w-48 animate-float drop-shadow-2xl md:block lg:w-56" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
