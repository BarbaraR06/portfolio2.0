"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importar los recursos directamente
import en from '../../public/locales/en.json';
import es from '../../public/locales/es.json';

const resources = {
  en,
  es
};

console.log('i18n resources:', resources);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'home',
    ns: ['home', 'footer', 'about-me', 'shutdown', 'login', 'music-player'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false 
    },
    debug: true
  });

// Para depuración
i18n.on('initialized', () => {
  console.log('i18n initialized with:', {
    language: i18n.language,
    languages: i18n.languages,
    namespaces: i18n.options.ns
  });
});

i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  console.log('Current translations:', i18n.getResourceBundle(lng, 'translation'));
});

export default i18n;




