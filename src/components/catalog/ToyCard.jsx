import { useTranslation } from 'react-i18next';
import { CATEGORY_STYLES, buildWhatsAppLink } from '../../config/site';
import ToyButton from '../ui/ToyButton';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import ToyImage from './ToyImage';

export const formatPrice = (price, currency) => `${new Intl.NumberFormat('ru-RU').format(price)} ${currency}`;

export default function ToyCard({ toy }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage;
  const name = toy.name?.[lang] ?? toy.name?.ru ?? '';
  const style = CATEGORY_STYLES[toy.category] ?? CATEGORY_STYLES.all;
  const price = formatPrice(toy.price, t('catalog.currency'));
  const orderLink = buildWhatsAppLink(t('whatsapp.order', { name, price }));

  return (
    <article className="card-toy group flex h-full flex-col p-4 transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1">
      <div
        className={`relative aspect-square overflow-hidden rounded-[1.5rem] ring-1 ring-night-900/5 [transform:translateZ(0)] dark:ring-white/10 dark:brightness-[0.92] ${style.stage}`}
      >
        <ToyImage src={toy.image} fallback={toy.illustration} alt={name} emoji={style.emoji} />
        {/* soft inner shade so the badge stays readable on any photo */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-night-900/15 to-transparent" />
        <span
          title={t('catalog.age')}
          className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-xs font-black text-night-900 shadow-md backdrop-blur dark:bg-night-900/90 dark:text-white"
        >
          🎂 {toy.age}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <span className={`self-start rounded-full px-3 py-1 text-xs font-extrabold ${style.chip}`}>
          {style.emoji} {t(`catalog.categories.${toy.category}`)}
        </span>
        <h3 className="mt-2.5 text-lg font-black leading-snug text-night-900 dark:text-white">{name}</h3>
        <p className="mt-auto pt-3 text-2xl font-black text-coral-600 dark:text-sunny-300">{price}</p>
        <ToyButton href={orderLink} color="whatsapp" size="sm" className="mt-4 w-full" icon={<WhatsAppIcon className="h-5 w-5" />}>
          {t('catalog.order')}
        </ToyButton>
      </div>
    </article>
  );
}
