import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { preload } from "react-dom";

i18n
  .use(HttpApi) // load translation using http backend
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    supportedLngs: ["en", "nl"], // languages to support
    fallbackLng: "nl", // default language
    lng: "nl", // language to use
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // path to your translation files
    },
    preload: ["en", "nl"], // preload languages
    react: {
      useSuspense: false,
    },
  });

export default i18n;
