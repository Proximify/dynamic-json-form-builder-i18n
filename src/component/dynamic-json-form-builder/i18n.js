import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

//import Backend from 'i18next-http-backend';
import Backend from "i18next-locize-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import Editor from "locize-editor";

const locizeOptions = {
    projectId: 'a14220c9-76bc-4f52-88fb-3d1d65c39bcc',
    referenceLng: 'en',
    apiKey: 'fbbc3c16-1512-4480-a1d5-f5cc5e3ba4e6',
    lng: 'en'
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        saveMissing: true,
        backend: locizeOptions,
        ns: ['Form'],
        defaultNS: 'Form',
        lng: 'en',
        // keySeparator: false,
        react: {
            wait: true,
            withRef: false,
            bindStore: false,
            bindI18n: 'languageChanged',
            nsMode: 'default',
        },
        interpolation: {
            escapeValue: false
        }


    });

// i18n.addResourceBundle('en', 'translations', fetchData);

export default i18n;