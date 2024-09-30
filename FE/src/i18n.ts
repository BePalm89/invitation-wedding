import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";

const getCurrentHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://invitation-wedding-sigma.vercel.app";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    lng: "es",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

export default i18n;
