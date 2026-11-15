export const WHATSAPP_NUMBER = '996504889991';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = '+996 504 88 99 91';
export const PHONE_HREF = 'tel:+996504889991';

/** Direct WhatsApp link, optionally with a pre-filled message. */
export const buildWhatsAppLink = (text) =>
  text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;

export const LANGUAGES = [
  { code: 'ru', label: 'RU', htmlLang: 'ru' },
  { code: 'kg', label: 'KG', htmlLang: 'ky' },
  { code: 'en', label: 'EN', htmlLang: 'en' },
];

export const NAV_ITEMS = [
  { to: '/', key: 'home', emoji: '🏠', tint: 'bg-sunny-100 dark:bg-sunny-500/15' },
  { to: '/about', key: 'about', emoji: '🧸', tint: 'bg-coral-100 dark:bg-coral-500/15' },
  { to: '/services', key: 'services', emoji: '🎁', tint: 'bg-grape-100 dark:bg-grape-500/20' },
  { to: '/catalog', key: 'catalog', emoji: '🧩', tint: 'bg-skyblue-100 dark:bg-skyblue-500/15' },
  { to: '/delivery', key: 'delivery', emoji: '🚚', tint: 'bg-mint-100 dark:bg-mint-500/15' },
  { to: '/contacts', key: 'contacts', emoji: '💬', tint: 'bg-sunny-100 dark:bg-sunny-500/15' },
];

export const CATEGORIES = ['all', 'plush', 'educational', 'constructors', 'vehicles', 'active'];

/** Visual style for each catalog category (full class names so Tailwind can see them). */
export const CATEGORY_STYLES = {
  all: {
    emoji: '🌈',
    active: 'bg-grape-500 text-white [--edge:#6A3FD6]',
    stage: 'bg-grape-100 dark:bg-grape-500/20',
    chip: 'bg-grape-100 text-grape-700 dark:bg-grape-500/25 dark:text-grape-200',
  },
  plush: {
    emoji: '🧸',
    active: 'bg-coral-500 text-white [--edge:#C23A47]',
    stage: 'bg-coral-100 dark:bg-coral-500/20',
    chip: 'bg-coral-100 text-coral-700 dark:bg-coral-500/25 dark:text-coral-200',
  },
  educational: {
    emoji: '🧠',
    active: 'bg-mint-500 text-night-900 [--edge:#178A63]',
    stage: 'bg-mint-100 dark:bg-mint-500/20',
    chip: 'bg-mint-100 text-mint-700 dark:bg-mint-500/25 dark:text-mint-200',
  },
  constructors: {
    emoji: '🧱',
    active: 'bg-skyblue-500 text-white [--edge:#126BB0]',
    stage: 'bg-skyblue-100 dark:bg-skyblue-500/20',
    chip: 'bg-skyblue-100 text-skyblue-700 dark:bg-skyblue-500/25 dark:text-skyblue-200',
  },
  vehicles: {
    emoji: '🚂',
    active: 'bg-sunny-400 text-night-900 [--edge:#B88400]',
    stage: 'bg-sunny-100 dark:bg-sunny-500/20',
    chip: 'bg-sunny-100 text-sunny-700 dark:bg-sunny-500/25 dark:text-sunny-200',
  },
  active: {
    emoji: '⚽',
    active: 'bg-grape-400 text-night-900 [--edge:#5E35BF]',
    stage: 'bg-grape-50 dark:bg-grape-400/20',
    chip: 'bg-grape-100 text-grape-700 dark:bg-grape-400/25 dark:text-grape-200',
  },
};
