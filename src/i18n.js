import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';
import kg from './locales/kg.json';
import en from './locales/en.json';
import { LANGUAGES } from './config/site';

const STORAGE_KEY = 'junior-lang';
const supported = LANGUAGES.map((l) => l.code);

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return 'ru';
}

function syncHtmlLang(lng) {
  const lang = LANGUAGES.find((l) => l.code === lng);
  document.documentElement.lang = lang?.htmlLang ?? 'ru';
}

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    kg: { translation: kg },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'ru',
  supportedLngs: supported,
  interpolation: { escapeValue: false },
});

syncHtmlLang(i18n.language);
i18n.on('languageChanged', (lng) => {
  syncHtmlLang(lng);
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore */
  }
});

export default i18n;
